# Shopie

Shopie is a responsive, framework-free Nigerian marketplace storefront. The catalogue, category browsing, product search and sorting, favourites, and persistent shopping bag work as a static site.

## Preview and deploy

Serve this folder with any static web host or local HTTP server. Publish `index.html`, `shop.css`, and `script.js` together; no build step or package installation is required. The product photos and web fonts load from Unsplash and Google Fonts, so those assets require an internet connection.

Sample catalogue photos are selected by product name and type, with varied images within each category. They are illustrative stock photos, not verified photos of a particular brand, model, colour, or seller's item. For accurate live listings, merchants should provide a real product photo; seller listings can include an `imageUrl`.

The storefront can be deployed independently. Customer and seller sign-up/sign-in fall back to browser-only demo accounts when the auth endpoint is missing (HTTP 404), a static host returns an HTML 403 for the unconfigured API route, or when opened directly as a local file. JSON authentication errors (including rejected credentials) are not treated as a missing endpoint. Demo passwords are stored as salted PBKDF2 hashes, and the account works only in that browser profile on that device; this is for previewing the account flow, not production authentication. When the backend auth endpoint exists, Shopie uses it instead and does not fall back on rejected credentials or server errors. Seller product publishing, order history, payment processing, and order emails still require the same-origin backend; they are not simulated by demo sign-in.

## Backend endpoints

The browser expects these JSON endpoints on the same origin:

| Method and path | Request | Successful response |
| --- | --- | --- |
| `POST /api/auth/signup` | `{ "name": "…", "email": "…", "password": "…", "role": "customer" }` (role can also be `"merchant"`) | A securely established session and `{ "user": { "name": "…" } }` |
| `POST /api/auth/login` | `{ "email": "…", "password": "…", "role": "customer" }` (role can also be `"merchant"`) | A securely established session and `{ "user": { "name": "…" } }` |
| `POST /api/auth/logout` | Authenticated session | `{ "success": true }` and session invalidated |
| `POST /api/products` | Authenticated seller listing: `{ "name": "…", "category": "…", "price": 15000, "imageUrl": "…", "description": "…" }` | `{ "product": { "id": "…", "name": "…", "category": "…", "price": 15000, "imageUrl": "…" } }` |
| `POST /api/orders` | `{ "customer": { "name": "…", "email": "…", "phone": "…" }, "delivery": { "address": "…", "state": "…" }, "items": [{ "productId": "…", "quantity": 1 }] }` | `{ "checkoutUrl": "https://…" }` |
| `GET /api/orders/me` | Authenticated customer session | `{ "orders": [{ "reference": "…", "status": "…", "createdAt": "…" }] }` |

Return a non-2xx JSON response such as `{ "message": "Please sign in to continue." }` for errors. The server must validate all input, authenticate and authorize requests, calculate prices from trusted product records (never browser-submitted prices), and set secure session cookies.

For live payments, create the payment session on the server using a payment provider's secret key and return its HTTPS-hosted checkout URL. Verify payment with the provider's signed webhook before marking an order paid, reducing stock, or sending an order confirmation. Send email from the server using a transactional email provider. Keep payment and email secrets in the deployment platform's environment settings; never add them to this static site or browser JavaScript.

## Admin dashboard

`admin.html` is the separate staff entry point. Admin identity, authorisation, sessions, and every dashboard read/write must be enforced by the backend; hiding the page or button is not access control. The admin UI calls these additional same-origin endpoints:

| Method and path | Request | Successful response |
| --- | --- | --- |
| `POST /api/admin/auth/login` | `{ "email": "…", "password": "…" }` | `{ "admin": { "name": "…", "email": "…" } }` and a secure admin session cookie |
| `GET /api/admin/session` | Secure admin session cookie | `{ "admin": { "name": "…", "email": "…" } }` |
| `POST /api/admin/auth/logout` | Secure admin session cookie | `{ "success": true }` and session invalidated |
| `GET /api/admin/dashboard` | Secure admin session cookie | `{ "admin": { "name": "…", "email": "…" }, "metrics": { "grossSales": 0, "orders": 0, "customers": 0, "sellers": 0, "pendingProducts": 0, "pendingSellers": 0, "fulfilmentOrders": 0 }, "recentOrders": [], "orders": [], "products": [], "sellers": [] }` |
| `PATCH /api/admin/orders/{id}` | `{ "status": "processing" }` (or another permitted order status) | `{ "order": { "id": "…", "status": "processing" } }` |
| `PATCH /api/admin/products/{id}` | `{ "action": "approve" }` or `{ "action": "reject" }` | `{ "product": { "id": "…", "status": "approved" } }` |
| `PATCH /api/admin/sellers/{id}` | `{ "action": "approve" }` or `{ "action": "suspend" }` | `{ "seller": { "id": "…", "status": "approved" } }` |

Dashboard orders need `id`, `reference`, `customerName` (or `customer.name`), `customerEmail` (or `customer.email`), `createdAt`, `total`, and `status`. Products need `id`, `name`, `sellerName` (or `seller.name`), `category`, `price`, and `status`. Sellers need `id`, `businessName` (or `name`), `contactName`, `email`, `createdAt`, `productCount`, and `status`. All list fields can be empty arrays. Use `grossSales` in naira and return only data the signed-in admin is authorised to see.

Protect every `/api/admin/*` endpoint with server-side admin role checks, secure `HttpOnly`, `Secure`, `SameSite` session cookies, CSRF protection on mutations, request validation, audit logging, and rate limiting on login. Do not promote a customer or merchant to admin based on a browser-submitted role or trust client-side permissions. Until these admin endpoints and an authorised admin account are configured, the dashboard intentionally displays the server error instead of sample metrics or a fake login.
