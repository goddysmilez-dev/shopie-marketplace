(() => {
  "use strict";

  const loginShell = document.getElementById("admin-login");
  const app = document.getElementById("admin-app");
  const loginForm = document.getElementById("admin-login-form");
  const loginError = document.getElementById("admin-login-error");
  const dashboardError = document.getElementById("admin-dashboard-error");
  const state = {
    admin: null,
    dashboard: null,
    activeSection: "overview",
    search: { orders: "", products: "", sellers: "" }
  };
  const currency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  });

  const sectionCopy = {
    overview: ["Overview", "Here’s what’s happening on Shopie today."],
    orders: ["Orders", "Review orders and manage fulfilment across Shopie."],
    products: ["Products", "Review and manage marketplace product listings."],
    sellers: ["Sellers", "Review seller applications and shop access."]
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function displayDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  }

  function displayMoney(value) {
    const amount = Number(value);
    return Number.isFinite(amount) ? currency.format(amount) : "—";
  }

  async function api(path, options = {}) {
    let response;
    try {
      response = await fetch(path, {
        credentials: "same-origin",
        ...options,
        headers: { "Content-Type": "application/json", ...(options.headers || {}) }
      });
    } catch (error) {
      throw new Error("Could not reach the Shopie server. Check your connection and try again.");
    }

    let result = {};
    try {
      result = await response.json();
    } catch (error) {
      if (response.ok) throw new Error("The Shopie server returned an unexpected response.");
    }
    if (!response.ok) {
      throw new Error(result.message || result.error || `The request could not be completed (${response.status}).`);
    }
    return result;
  }

  function setLoginError(message) {
    loginError.textContent = message;
    loginError.hidden = !message;
  }

  function setDashboardError(message) {
    dashboardError.textContent = message;
    dashboardError.hidden = !message;
  }

  function setBusy(button, busy, label) {
    if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.innerHTML;
    button.disabled = busy;
    button.innerHTML = busy ? label : button.dataset.defaultLabel;
  }

  function showToast(message, isError = false) {
    const toast = document.getElementById("admin-toast");
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 4200);
  }

  function activateAdmin(admin) {
    state.admin = admin;
    loginShell.hidden = true;
    app.hidden = false;
    const displayName = admin.name || admin.email || "Administrator";
    document.querySelectorAll("[data-admin-name]").forEach(node => { node.textContent = displayName; });
    document.querySelectorAll("[data-admin-email]").forEach(node => { node.textContent = admin.email || "Admin"; });
    document.querySelectorAll("[data-admin-initials]").forEach(node => {
      node.textContent = displayName.split(/\s+/).slice(0, 2).map(part => part.charAt(0).toUpperCase()).join("") || "SA";
    });
  }

  function setMetric(name, value, formatter) {
    const target = document.querySelector(`[data-metric="${name}"]`);
    if (!target) return;
    const amount = Number(value);
    target.textContent = value === null || value === undefined || !Number.isFinite(amount)
      ? "—"
      : formatter ? formatter(amount) : new Intl.NumberFormat("en-NG").format(amount);
  }

  function statusClass(status) {
    const normalized = String(status || "unknown").toLowerCase().replace(/[^a-z0-9-]/g, "-");
    return `admin-status admin-status-${normalized}`;
  }

  function statusLabel(status) {
    return escapeHtml(String(status || "Unknown").replace(/[-_]/g, " "));
  }

  function renderOverview(dashboard) {
    const metrics = dashboard.metrics || {};
    setMetric("grossSales", metrics.grossSales, displayMoney);
    setMetric("orders", metrics.orders);
    setMetric("customers", metrics.customers);
    setMetric("sellers", metrics.sellers);
    document.querySelector("[data-pending-count]").textContent = Number.isFinite(Number(metrics.fulfilmentOrders)) ? String(metrics.fulfilmentOrders) : "—";

    const pendingProducts = Number(metrics.pendingProducts) || 0;
    const pendingSellers = Number(metrics.pendingSellers) || 0;
    const fulfilmentOrders = Number(metrics.fulfilmentOrders) || 0;
    document.querySelector("[data-review-products]").textContent = `${pendingProducts} waiting for approval`;
    document.querySelector("[data-review-sellers]").textContent = `${pendingSellers} waiting for review`;
    document.querySelector("[data-review-orders]").textContent = `${fulfilmentOrders} need fulfilment`;
    document.querySelector("[data-review-total]").textContent = String(pendingProducts + pendingSellers + fulfilmentOrders);

    const orders = Array.isArray(dashboard.recentOrders) ? dashboard.recentOrders.slice(0, 6) : [];
    document.getElementById("overview-orders").innerHTML = orders.length ? orders.map(order => `
      <tr><td><strong class="admin-order-ref">${escapeHtml(order.reference || order.id || "—")}</strong><small>${escapeHtml(displayDate(order.createdAt))}</small></td>
      <td>${escapeHtml(order.customerName || order.customer?.name || "—")}</td>
      <td>${escapeHtml(displayMoney(order.total))}</td>
      <td><span class="${statusClass(order.status)}">${statusLabel(order.status)}</span></td></tr>`).join("") : `<tr><td colspan="4" class="admin-empty-cell">No recent orders to show.</td></tr>`;
  }

  function filtered(rows, type, fields) {
    const query = state.search[type].trim().toLocaleLowerCase("en");
    if (!query) return rows;
    return rows.filter(row => fields.some(field => String(field.split(".").reduce((value, key) => value && value[key], row) || "").toLocaleLowerCase("en").includes(query)));
  }

  function renderOrders(orders) {
    const rows = filtered(orders, "orders", ["reference", "id", "customerName", "customer.name", "customerEmail", "status"]);
    document.getElementById("orders-table").innerHTML = rows.map(order => {
      const id = escapeHtml(order.id);
      const status = String(order.status || "").toLowerCase();
      const choices = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
      return `<tr>
        <td><strong class="admin-order-ref">${escapeHtml(order.reference || order.id || "—")}</strong></td>
        <td><strong>${escapeHtml(order.customerName || order.customer?.name || "—")}</strong><small>${escapeHtml(order.customerEmail || order.customer?.email || "")}</small></td>
        <td>${escapeHtml(displayDate(order.createdAt))}</td>
        <td>${escapeHtml(displayMoney(order.total))}</td>
        <td><span class="${statusClass(status)}">${statusLabel(status)}</span></td>
        <td><select class="admin-row-select" data-order-status="${id}" aria-label="Update order status for ${escapeHtml(order.reference || order.id || "order")}">${choices.map(choice => `<option value="${choice}"${choice === status ? " selected" : ""}>${choice.charAt(0).toUpperCase() + choice.slice(1)}</option>`).join("")}</select></td>
      </tr>`;
    }).join("");
    document.querySelector('[data-empty="orders"]').hidden = rows.length > 0;
  }

  function renderProducts(products) {
    const rows = filtered(products, "products", ["name", "sellerName", "seller.name", "category", "status"]);
    document.getElementById("products-table").innerHTML = rows.map(product => {
      const id = escapeHtml(product.id);
      const status = String(product.status || "pending").toLowerCase();
      const isPending = status === "pending" || status === "review";
      return `<tr>
        <td><strong>${escapeHtml(product.name || "Untitled product")}</strong><small>${escapeHtml(product.sku || product.id || "")}</small></td>
        <td>${escapeHtml(product.sellerName || product.seller?.name || "—")}</td>
        <td>${escapeHtml(product.category || "—")}</td>
        <td>${escapeHtml(displayMoney(product.price))}</td>
        <td><span class="${statusClass(status)}">${statusLabel(status)}</span></td>
        <td>${isPending ? `<div class="admin-row-actions"><button class="admin-approve-button" type="button" data-product-action="approve" data-id="${id}">Approve</button><button class="admin-reject-button" type="button" data-product-action="reject" data-id="${id}">Reject</button></div>` : `<span class="admin-muted">${status === "approved" ? "Live" : "Reviewed"}</span>`}</td>
      </tr>`;
    }).join("");
    document.querySelector('[data-empty="products"]').hidden = rows.length > 0;
  }

  function renderSellers(sellers) {
    const rows = filtered(sellers, "sellers", ["businessName", "name", "email", "status"]);
    document.getElementById("sellers-table").innerHTML = rows.map(seller => {
      const id = escapeHtml(seller.id);
      const status = String(seller.status || "pending").toLowerCase();
      const isPending = status === "pending" || status === "review";
      const isApproved = status === "approved" || status === "active";
      const action = isApproved ? "suspend" : "approve";
      const label = isApproved ? "Suspend" : "Approve";
      return `<tr>
        <td><strong>${escapeHtml(seller.businessName || seller.name || "Unnamed shop")}</strong><small>${escapeHtml(seller.city || seller.state || "")}</small></td>
        <td><strong>${escapeHtml(seller.contactName || seller.name || "—")}</strong><small>${escapeHtml(seller.email || "")}</small></td>
        <td>${escapeHtml(displayDate(seller.createdAt))}</td>
        <td>${Number.isFinite(Number(seller.productCount)) ? escapeHtml(seller.productCount) : "—"}</td>
        <td><span class="${statusClass(status)}">${statusLabel(status)}</span></td>
        <td><button class="${isPending ? "admin-approve-button" : "admin-secondary-button"}" type="button" data-seller-action="${action}" data-id="${id}">${label}</button></td>
      </tr>`;
    }).join("");
    document.querySelector('[data-empty="sellers"]').hidden = rows.length > 0;
  }

  function renderDashboard(dashboard) {
    if (!dashboard || typeof dashboard !== "object" || !dashboard.metrics) {
      throw new Error("The admin dashboard response is incomplete. Please contact your administrator.");
    }
    state.dashboard = dashboard;
    renderOverview(dashboard);
    renderOrders(Array.isArray(dashboard.orders) ? dashboard.orders : []);
    renderProducts(Array.isArray(dashboard.products) ? dashboard.products : []);
    renderSellers(Array.isArray(dashboard.sellers) ? dashboard.sellers : []);
    setDashboardError("");
  }

  async function refreshDashboard() {
    const button = document.getElementById("admin-refresh");
    setBusy(button, true, "Loading…");
    try {
      const result = await api("/api/admin/dashboard", { method: "GET" });
      renderDashboard(result);
    } catch (error) {
      setDashboardError(error.message);
    } finally {
      setBusy(button, false);
    }
  }

  function navigate(section) {
    if (!sectionCopy[section]) return;
    state.activeSection = section;
    document.querySelectorAll(".admin-nav-item").forEach(button => {
      const active = button.dataset.section === section;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    document.querySelectorAll(".admin-section-view").forEach(view => {
      const active = view.dataset.view === section;
      view.hidden = !active;
      view.classList.toggle("active", active);
    });
    document.getElementById("admin-breadcrumb-current").textContent = sectionCopy[section][0];
    document.getElementById("admin-page-description").textContent = sectionCopy[section][1];
    document.querySelector(".admin-content").scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("admin-sidebar").classList.remove("open");
    document.getElementById("admin-menu-toggle").setAttribute("aria-expanded", "false");
  }

  async function updateRecord(endpoint, id, action) {
    if (!id) {
      showToast("This record is missing its server ID; no change was made.", true);
      return;
    }
    const button = document.activeElement;
    if (button instanceof HTMLButtonElement) setBusy(button, true, "Saving…");
    try {
      await api(`${endpoint}/${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ action })
      });
      showToast("Marketplace record updated.");
      await refreshDashboard();
    } catch (error) {
      showToast(error.message, true);
      if (button instanceof HTMLButtonElement && button.isConnected) setBusy(button, false);
    }
  }

  loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    setLoginError("");
    const submit = document.getElementById("admin-login-submit");
    const data = Object.fromEntries(new FormData(loginForm).entries());
    setBusy(submit, true, "Signing in…");
    try {
      const result = await api("/api/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password })
      });
      if (!result.admin || !result.admin.email) {
        throw new Error("The server did not return an authorised admin account.");
      }
      activateAdmin(result.admin);
      await refreshDashboard();
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setBusy(submit, false);
    }
  });

  document.querySelectorAll(".admin-nav-item").forEach(button => {
    button.addEventListener("click", () => navigate(button.dataset.section));
  });

  document.querySelectorAll("[data-open-section]").forEach(button => {
    button.addEventListener("click", () => navigate(button.dataset.openSection));
  });

  document.querySelectorAll("[data-table-search]").forEach(input => {
    input.addEventListener("input", () => {
      state.search[input.dataset.tableSearch] = input.value;
      if (!state.dashboard) return;
      renderOrders(Array.isArray(state.dashboard.orders) ? state.dashboard.orders : []);
      renderProducts(Array.isArray(state.dashboard.products) ? state.dashboard.products : []);
      renderSellers(Array.isArray(state.dashboard.sellers) ? state.dashboard.sellers : []);
    });
  });

  document.getElementById("orders-table").addEventListener("change", async event => {
    const select = event.target.closest("[data-order-status]");
    if (select) {
      select.disabled = true;
      try {
        await api(`/api/admin/orders/${encodeURIComponent(select.dataset.orderStatus)}`, {
          method: "PATCH",
          body: JSON.stringify({ status: select.value })
        });
        showToast("Order status updated.");
        await refreshDashboard();
      } catch (error) {
        showToast(error.message, true);
        select.disabled = false;
      }
    }
  });

  document.getElementById("products-table").addEventListener("click", event => {
    const button = event.target.closest("[data-product-action]");
    if (button) updateRecord("/api/admin/products", button.dataset.id, button.dataset.productAction);
  });

  document.getElementById("sellers-table").addEventListener("click", event => {
    const button = event.target.closest("[data-seller-action]");
    if (button) updateRecord("/api/admin/sellers", button.dataset.id, button.dataset.sellerAction);
  });

  document.getElementById("admin-refresh").addEventListener("click", refreshDashboard);
  document.getElementById("admin-menu-toggle").addEventListener("click", event => {
    const sidebar = document.getElementById("admin-sidebar");
    const isOpen = sidebar.classList.toggle("open");
    event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("[data-admin-logout]").forEach(button => {
    button.addEventListener("click", async () => {
      setBusy(button, true, "Signing out…");
      try {
        await api("/api/admin/auth/logout", { method: "POST", body: JSON.stringify({}) });
        state.admin = null;
        state.dashboard = null;
        app.hidden = true;
        loginShell.hidden = false;
        loginForm.reset();
        setLoginError("");
      } catch (error) {
        showToast(error.message, true);
        setBusy(button, false);
      }
    });
  });

  async function restoreSession() {
    try {
      const result = await api("/api/admin/session", { method: "GET" });
      if (!result.admin || !result.admin.email) return;
      activateAdmin(result.admin);
      await refreshDashboard();
    } catch (error) {
      if (!["401", "403"].some(status => error.message.includes(status))) {
        setLoginError(`${error.message} Sign in when the admin server is available.`);
      }
    }
  }

  restoreSession();
})();
