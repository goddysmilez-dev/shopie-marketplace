(() => {
  "use strict";

  const money = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  });

  const categories = [
    {
      name: "Phones & Tablets", image: "photo-1511707171634-5f897ff02aa9",
      items: ["Android Smartphone 128GB", "Everyday Wireless Earbuds", "Fast Charge Power Bank 20,000mAh", "USB-C Fast Charger", "Shockproof Phone Case", "4G Android Tablet 10-inch", "Smart Watch with Heart Monitor", "Bluetooth Earphones with Mic", "Tempered Glass Screen Guard", "Dual USB Car Charger", "Phone Tripod with Remote", "Portable Bluetooth Speaker", "Wireless Charging Pad", "Adjustable Phone Stand"],
      range: [4500, 485000]
    },
    {
      name: "Fashion", image: "photo-1483985988355-763728e1935b",
      items: ["Everyday Ankara Midi Dress", "Classic Leather Crossbody Bag", "Unisex Canvas Trainers", "Linen Two-Piece Set", "Gold-Tone Everyday Earrings", "Tailored Men's Senator Set", "Soft Knit Everyday Cardigan", "Woven Raffia Tote Bag", "Women's Block Heel Sandals", "Classic Polarised Sunglasses", "Cotton Graphic T-Shirt", "Handmade Beaded Bracelet", "Pleated Everyday Skirt", "Premium Leather Belt"],
      range: [6500, 78000]
    },
    {
      name: "Beauty", image: "photo-1598440947619-2c35fc9aa908",
      items: ["Glow Daily Face Serum", "Moisture Rich Shea Body Butter", "Gentle Foaming Face Cleanser", "Everyday Matte Lip Set", "African Black Soap Bar", "SPF 50 Daily Sunscreen", "Hydrating Hair Leave-In Cream", "Vitamin C Brightening Toner", "Long-Wear Brow Pencil", "Nourishing Cuticle Oil", "Natural Hair Growth Oil", "Velvet Finish Pressed Powder", "Soft Skin Body Lotion", "Essential Brush Set"],
      range: [2200, 31500]
    },
    {
      name: "Home & Living", image: "photo-1616486338812-3dadae4b4ace",
      items: ["Woven Cotton Cushion Cover Set", "Minimal Table Lamp", "Ceramic Dinner Plate Set of 4", "Everyday Cotton Bedsheet Set", "Handwoven Storage Basket", "Modern Wall Clock", "Non-Slip Bath Mat", "Set of Two Glass Vases", "Velvet Throw Pillow", "Three-Piece Kitchen Storage Jars", "Soft Microfibre Duvet", "Wooden Serving Tray", "Indoor Potted Plant Pot", "Bathroom Towel Set"],
      range: [3500, 69000]
    },
    {
      name: "Electronics", image: "photo-1498049794561-7780e7231661",
      items: ["Portable Mini Bluetooth Speaker", "Over-Ear Wireless Headphones", "Smart LED TV 43-inch", "USB Rechargeable Desk Lamp", "Compact Wi-Fi Router", "Wireless Gaming Controller", "HD Webcam with Microphone", "Surge Protector Extension Box", "Bluetooth Keyboard and Mouse", "Portable SSD 512GB", "USB-C Multiport Adapter", "Digital Kitchen Scale", "Noise Cancelling Earbuds", "4K HDMI Streaming Stick"],
      range: [5500, 780000]
    },
    {
      name: "Groceries", image: "photo-1542838132-92c53300491e",
      items: ["Premium Ofada Rice 5kg", "Pure Groundnut Oil 2L", "Honey Beans 2kg", "Golden Sella Basmati Rice 5kg", "Local Palm Oil 1L", "Tomato Paste Family Pack", "Premium Garri Ijebu 2kg", "Smoked Catfish Family Pack", "Natural Nigerian Honey 500ml", "Ground Crayfish 250g", "Yellow Garri 4kg", "Spicy Suya Pepper Blend", "Stockfish Cuts 500g", "Family Breakfast Cereal Twin Pack"],
      range: [1200, 28000]
    },
    {
      name: "Appliances", image: "photo-1556911220-bff31c812dba",
      items: ["Electric Kettle 1.7L", "Compact Blender with Mill", "Standing Fan 18-inch", "Single Hotplate Cooker", "Digital Air Fryer 4L", "Steam Iron with Spray", "Mini Refrigerator 90L", "Rechargeable Table Fan", "Pressure Cooker 6L", "Sandwich Maker with Grill", "Microwave Oven 20L", "Stainless Steel Rice Cooker", "Washing Machine 7kg", "Portable Power Station 500W"],
      range: [14500, 620000]
    },
    {
      name: "Sports & Outdoors", image: "photo-1517836357463-d25dfeac3438",
      items: ["Non-Slip Yoga Mat", "Adjustable Jump Rope", "Insulated Sports Water Bottle", "Resistance Band Set", "Lightweight Football Boots", "Everyday Running Trainers", "Adjustable Dumbbell Pair", "Quick-Dry Sports Towel", "Outdoor Camping Lantern", "Fitness Stretch Band", "Compact Gym Duffel Bag", "Professional Football Size 5", "Cycling Safety Helmet", "Home Workout Push-Up Bars"],
      range: [3000, 82000]
    },
    {
      name: "Baby & Kids", image: "photo-1515488042361-ee00e0ddd4e4",
      items: ["Cotton Baby Sleepsuit Set", "Soft Plush Teddy Bear", "Stacking Building Blocks", "Adjustable Baby Carrier", "Gentle Baby Bath Set", "Toddler Colouring Book Bundle", "Infant Feeding Bottle Set", "Kids' Colourful School Backpack", "Baby Cotton Muslin Wrap", "Wooden Shape Sorter Toy", "Children's Raincoat and Boots", "Soft Baby Play Mat", "Kids' Water Bottle", "Toddler Ankara Sunday Outfit"],
      range: [2500, 58000]
    },
    {
      name: "Books & Stationery", image: "photo-1455390582262-044cdead277a",
      items: ["Premium Hardcover Journal", "Daily Planner and Pen Set", "Coloured Pencil Set of 24", "A5 Lined Notebook Pack", "Children's Storybook Collection", "Gel Pen Set of 12", "Watercolour Painting Starter Kit", "Reusable Study Flash Cards", "Executive Fountain Pen", "Weekly Desk Planner Pad", "Calligraphy Brush Pen Set", "Classic Wooden Chess Set", "School Exercise Book Bundle", "Reusable Shopping List Notepad"],
      range: [900, 26000]
    },
    {
      name: "Automotive", image: "photo-1492144534655-ae79c964c9d7",
      items: ["Dual-Port Car Phone Charger", "Magnetic Dashboard Phone Mount", "Universal Car Seat Cover Set", "Rechargeable Emergency Torch", "Microfibre Car Cleaning Cloth Set", "Portable Tyre Air Compressor", "Heavy-Duty Car Floor Mats", "12V Car Battery Jump Starter", "Compact Car Tool Kit", "Reflective Safety Triangle Set", "Car Steering Wheel Cover", "Universal Sunshade for Car", "Car USB FM Transmitter", "Digital Tyre Pressure Gauge"],
      range: [3000, 105000]
    },
    {
      name: "Health & Wellness", image: "photo-1505751172876-fa1923c5c528",
      items: ["Digital Blood Pressure Monitor", "Stainless Steel Thermal Flask", "Daily Vitamin C Tablets", "Reusable Hot and Cold Pack", "Compact First Aid Kit", "Digital Body Weight Scale", "Natural Shea Hand Cream", "Adjustable Back Support Cushion", "Insulated Lunch Container", "Daily Multivitamin Tablets", "Posture Support Brace", "Herbal Ginger and Hibiscus Tea", "Reusable Cotton Face Towels", "Waterproof Digital Thermometer"],
      range: [1800, 54000]
    },
    {
      name: "Food & Drinks", image: "photo-1504674900247-0877df9cc836",
      items: ["Small-Batch Zobo Drink 6-Pack", "Classic Chin Chin Family Jar", "Nigerian Kuli Kuli Snack Pack", "Freshly Roasted Groundnut Jar", "Premium Date and Nut Mix", "Homemade Pepper Sauce Trio", "Crispy Plantain Chips Bundle", "Natural Tigernut Drink 6-Pack", "Nigerian Spice Gift Set", "Chocolate Coconut Snack Bites", "Gourmet Ofada Sauce Jar", "Premium Nigerian Coffee Beans", "Coconut Candy Treat Box", "Locally Made Granola Pouch"],
      range: [1400, 19000]
    },
    {
      name: "Crafts & Gifts", image: "photo-1490312278390-ab64016e0aa9",
      items: ["Handcrafted Ankara Gift Pouch", "Nigerian Bead Necklace Set", "Locally Poured Scented Candle", "Handwoven Mini Market Basket", "Personalised Celebration Gift Box", "Handmade Leather Card Holder", "Adire Print Wall Art", "Locally Crafted Wooden Coasters", "Nigerian Spice Lover Gift Hamper", "Handmade Ceramic Mug", "Beaded Keyring and Charm Set", "Small Artisan Soap Gift Set", "Adire Fabric Gift Wrap Set", "Hand-painted A6 Greeting Card"],
      range: [1800, 46000]
    }
  ];

  const categoryImages = Object.fromEntries(categories.map(category => [category.name, category.image]));
  const productImageSets = {
    "Phones & Tablets": [
      "photo-1511707171634-5f897ff02aa9", "photo-1592750475338-74b7b21085ab", "photo-1598327105666-5b89351aff97",
      "photo-1592899677977-9c10ca588bbd", "photo-1605236453806-6ff36851218e", "photo-1512499617640-c74ae3a79d37",
      "photo-1598327105666-5b89351aff97", "photo-1592750475338-74b7b21085ab", "photo-1511707171634-5f897ff02aa9",
      "photo-1592899677977-9c10ca588bbd", "photo-1605236453806-6ff36851218e", "photo-1512499617640-c74ae3a79d37",
      "photo-1592750475338-74b7b21085ab", "photo-1598327105666-5b89351aff97"
    ],
    "Fashion": [
      "photo-1483985988355-763728e1935b", "photo-1490481651871-ab68de25d43d", "photo-1529139574466-a303027c1d8b",
      "photo-1525507119028-ed4c629a60a3", "photo-1496747611176-843222e1e57c", "photo-1539109136881-3be0616acf4b",
      "photo-1509631179647-0177331693ae", "photo-1483985988355-763728e1935b", "photo-1490481651871-ab68de25d43d",
      "photo-1529139574466-a303027c1d8b", "photo-1525507119028-ed4c629a60a3", "photo-1496747611176-843222e1e57c",
      "photo-1539109136881-3be0616acf4b", "photo-1509631179647-0177331693ae"
    ],
    "Beauty": [
      "photo-1598440947619-2c35fc9aa908", "photo-1608248543803-ba4f8c70ae0b", "photo-1601049541289-9b1b7bbbfe19",
      "photo-1596462502278-27bfdc403348", "photo-1608571423902-eed4a5ad8108", "photo-1608248543803-ba4f8c70ae0b",
      "photo-1598440947619-2c35fc9aa908", "photo-1601049541289-9b1b7bbbfe19", "photo-1596462502278-27bfdc403348",
      "photo-1608571423902-eed4a5ad8108", "photo-1608248543803-ba4f8c70ae0b", "photo-1598440947619-2c35fc9aa908",
      "photo-1601049541289-9b1b7bbbfe19", "photo-1596462502278-27bfdc403348"
    ],
    "Home & Living": [
      "photo-1616486338812-3dadae4b4ace", "photo-1600210492486-724fe5c67fb0", "photo-1616486029423-aaa4789e8c9a",
      "photo-1618221195710-dd6b41faaea6", "photo-1615874694520-474822394e73", "photo-1600607687939-ce8a6c25118c",
      "photo-1616486338812-3dadae4b4ace", "photo-1600210492486-724fe5c67fb0", "photo-1616486029423-aaa4789e8c9a",
      "photo-1618221195710-dd6b41faaea6", "photo-1615874694520-474822394e73", "photo-1600607687939-ce8a6c25118c",
      "photo-1616486338812-3dadae4b4ace", "photo-1600210492486-724fe5c67fb0"
    ],
    "Electronics": [
      "photo-1498049794561-7780e7231661", "photo-1505740420928-5e560c06d30e", "photo-1546435770-a3e426bf472b",
      "photo-1583394838336-acd977736f90", "photo-1593359677879-a4bb92f829d1", "photo-1523275335684-37898b6baf30",
      "photo-1498049794561-7780e7231661", "photo-1505740420928-5e560c06d30e", "photo-1546435770-a3e426bf472b",
      "photo-1583394838336-acd977736f90", "photo-1593359677879-a4bb92f829d1", "photo-1523275335684-37898b6baf30",
      "photo-1498049794561-7780e7231661", "photo-1505740420928-5e560c06d30e"
    ],
    "Groceries": [
      "photo-1542838132-92c53300491e", "photo-1540420773420-3366772f4999", "photo-1547592180-85f173990554",
      "photo-1567306226416-28f0efdc88ce", "photo-1518843875459-f738682238a6", "photo-1550583724-b2692b85b150",
      "photo-1542838132-92c53300491e", "photo-1540420773420-3366772f4999", "photo-1547592180-85f173990554",
      "photo-1567306226416-28f0efdc88ce", "photo-1518843875459-f738682238a6", "photo-1550583724-b2692b85b150",
      "photo-1542838132-92c53300491e", "photo-1540420773420-3366772f4999"
    ],
    "Appliances": [
      "photo-1556911220-bff31c812dba", "photo-1556912172-45b7abe8b7e1", "photo-1556911220-bff31c812dba",
      "photo-1584622650111-993a426fbf0a", "photo-1586201375761-83865001e31c", "photo-1556911220-bff31c812dba",
      "photo-1556912172-45b7abe8b7e1", "photo-1556911220-bff31c812dba", "photo-1584622650111-993a426fbf0a",
      "photo-1586201375761-83865001e31c", "photo-1556911220-bff31c812dba", "photo-1556912172-45b7abe8b7e1",
      "photo-1556911220-bff31c812dba", "photo-1584622650111-993a426fbf0a"
    ],
    "Sports & Outdoors": [
      "photo-1517836357463-d25dfeac3438", "photo-1534438327276-14e5300c3a48", "photo-1518611012118-696072aa579a",
      "photo-1571019613454-1cb2f99b2d8b", "photo-1517649763962-0c623066013b", "photo-1534438327276-14e5300c3a48",
      "photo-1518611012118-696072aa579a", "photo-1571019613454-1cb2f99b2d8b", "photo-1517649763962-0c623066013b",
      "photo-1517836357463-d25dfeac3438", "photo-1534438327276-14e5300c3a48", "photo-1518611012118-696072aa579a",
      "photo-1571019613454-1cb2f99b2d8b", "photo-1517649763962-0c623066013b"
    ],
    "Baby & Kids": [
      "photo-1515488042361-ee00e0ddd4e4", "photo-1516627145497-ae6968895b74", "photo-1503919005314-30d93d07d823",
      "photo-1566004100631-35d015d6a491", "photo-1596461404969-9ae70f2830c1", "photo-1515488042361-ee00e0ddd4e4",
      "photo-1516627145497-ae6968895b74", "photo-1503919005314-30d93d07d823", "photo-1566004100631-35d015d6a491",
      "photo-1596461404969-9ae70f2830c1", "photo-1515488042361-ee00e0ddd4e4", "photo-1516627145497-ae6968895b74",
      "photo-1503919005314-30d93d07d823", "photo-1566004100631-35d015d6a491"
    ],
    "Books & Stationery": [
      "photo-1455390582262-044cdead277a", "photo-1456324504439-367cee3b3c32", "photo-1519682337058-a94d519337bc",
      "photo-1513475382585-d06e58bcb0e0", "photo-1455390582262-044cdead277a", "photo-1456324504439-367cee3b3c32",
      "photo-1519682337058-a94d519337bc", "photo-1513475382585-d06e58bcb0e0", "photo-1455390582262-044cdead277a",
      "photo-1456324504439-367cee3b3c32", "photo-1519682337058-a94d519337bc", "photo-1513475382585-d06e58bcb0e0",
      "photo-1455390582262-044cdead277a", "photo-1456324504439-367cee3b3c32"
    ],
    "Automotive": [
      "photo-1492144534655-ae79c964c9d7", "photo-1503376780353-7e6692767b70", "photo-1486262715619-67b85e0b08d3",
      "photo-1486006920555-c77dcf18193c", "photo-1492144534655-ae79c964c9d7", "photo-1503376780353-7e6692767b70",
      "photo-1486262715619-67b85e0b08d3", "photo-1486006920555-c77dcf18193c", "photo-1492144534655-ae79c964c9d7",
      "photo-1503376780353-7e6692767b70", "photo-1486262715619-67b85e0b08d3", "photo-1486006920555-c77dcf18193c",
      "photo-1492144534655-ae79c964c9d7", "photo-1503376780353-7e6692767b70"
    ],
    "Health & Wellness": [
      "photo-1505751172876-fa1923c5c528", "photo-1506126613408-eca07ce68773", "photo-1544367567-0f2fcb009e0b",
      "photo-1518611012118-696072aa579a", "photo-1505751172876-fa1923c5c528", "photo-1506126613408-eca07ce68773",
      "photo-1544367567-0f2fcb009e0b", "photo-1518611012118-696072aa579a", "photo-1505751172876-fa1923c5c528",
      "photo-1506126613408-eca07ce68773", "photo-1544367567-0f2fcb009e0b", "photo-1518611012118-696072aa579a",
      "photo-1505751172876-fa1923c5c528", "photo-1506126613408-eca07ce68773"
    ],
    "Food & Drinks": [
      "photo-1504674900247-0877df9cc836", "photo-1540189549336-e6e99c3679fe", "photo-1565299624946-b28f40a0ae38",
      "photo-1473093295043-cdd812d0e601", "photo-1504674900247-0877df9cc836", "photo-1540189549336-e6e99c3679fe",
      "photo-1565299624946-b28f40a0ae38", "photo-1473093295043-cdd812d0e601", "photo-1504674900247-0877df9cc836",
      "photo-1540189549336-e6e99c3679fe", "photo-1565299624946-b28f40a0ae38", "photo-1473093295043-cdd812d0e601",
      "photo-1504674900247-0877df9cc836", "photo-1540189549336-e6e99c3679fe"
    ],
    "Crafts & Gifts": [
      "photo-1490312278390-ab64016e0aa9", "photo-1452860606245-08befc0ff44b", "photo-1513519245088-0e12902e5a38",
      "photo-1455390582262-044cdead277a", "photo-1490312278390-ab64016e0aa9", "photo-1452860606245-08befc0ff44b",
      "photo-1513519245088-0e12902e5a38", "photo-1455390582262-044cdead277a", "photo-1490312278390-ab64016e0aa9",
      "photo-1452860606245-08befc0ff44b", "photo-1513519245088-0e12902e5a38", "photo-1455390582262-044cdead277a",
      "photo-1490312278390-ab64016e0aa9", "photo-1452860606245-08befc0ff44b"
    ]
  };
  const relatedImageCategories = {
    "Phones & Tablets": ["Electronics", "Appliances"],
    "Fashion": ["Crafts & Gifts", "Baby & Kids"],
    "Beauty": ["Health & Wellness", "Fashion"],
    "Home & Living": ["Crafts & Gifts", "Appliances"],
    "Electronics": ["Phones & Tablets", "Appliances"],
    "Groceries": ["Food & Drinks", "Health & Wellness"],
    "Appliances": ["Electronics", "Home & Living"],
    "Sports & Outdoors": ["Health & Wellness", "Fashion"],
    "Baby & Kids": ["Crafts & Gifts", "Fashion"],
    "Books & Stationery": ["Crafts & Gifts", "Home & Living"],
    "Automotive": ["Electronics", "Appliances"],
    "Health & Wellness": ["Beauty", "Sports & Outdoors"],
    "Food & Drinks": ["Groceries", "Health & Wellness"],
    "Crafts & Gifts": ["Fashion", "Home & Living"]
  };
  const productImagesByCategory = Object.fromEntries(categories.map(category => {
    const relatedImages = (relatedImageCategories[category.name] || [])
      .flatMap(relatedCategory => productImageSets[relatedCategory]);
    return [category.name, [...new Set([...productImageSets[category.name], ...relatedImages])].slice(0, category.items.length)];
  }));
  const productImageRules = [
    { pattern: /\b(earbuds|earphones|headphones)\b/i, images: ["photo-1505740420928-5e560c06d30e", "photo-1546435770-a3e426bf472b", "photo-1583394838336-acd977736f90"] },
    { pattern: /\b(bluetooth speaker|mini speaker)\b/i, images: ["photo-1546435770-a3e426bf472b", "photo-1583394838336-acd977736f90", "photo-1498049794561-7780e7231661"] },
    { pattern: /\b(smart ?watch|digital watch)\b/i, images: ["photo-1523275335684-37898b6baf30", "photo-1498049794561-7780e7231661"] },
    { pattern: /\b(smartphone|android phone|phone case|screen guard|screen protector|phone tripod|phone stand|phone mount|tablet)\b/i, images: ["photo-1511707171634-5f897ff02aa9", "photo-1592750475338-74b7b21085ab", "photo-1598327105666-5b89351aff97", "photo-1592899677977-9c10ca588bbd", "photo-1605236453806-6ff36851218e"] },
    { pattern: /\b(power bank|charger|charging pad|usb-c adapter|multiport adapter|extension box|surge protector)\b/i, images: ["photo-1498049794561-7780e7231661", "photo-1598327105666-5b89351aff97", "photo-1605236453806-6ff36851218e", "photo-1546435770-a3e426bf472b"] },
    { pattern: /\b(camera|webcam|ssd|keyboard|mouse|gaming controller|router|streaming stick)\b/i, images: ["photo-1498049794561-7780e7231661", "photo-1526170375885-4d8ecf77b99f", "photo-1523275335684-37898b6baf30"] },
    { pattern: /\b(rice|beans|garri|crayfish|catfish|stockfish|suya pepper|palm oil|groundnut oil|tomato paste|cereal|granola|coffee beans|hibiscus tea|zobo|tigernut|ginger)\b/i, images: ["photo-1542838132-92c53300491e", "photo-1540420773420-3366772f4999", "photo-1547592180-85f173990554", "photo-1518843875459-f738682238a6", "photo-1550583724-b2692b85b150"] },
    { pattern: /\b(chin chin|kuli kuli|groundnut|date and nut|pepper sauce|plantain chips|snack|coconut candy|chocolate|food|ofada sauce)\b/i, images: ["photo-1504674900247-0877df9cc836", "photo-1540189549336-e6e99c3679fe", "photo-1565299624946-b28f40a0ae38", "photo-1473093295043-cdd812d0e601"] },
    { pattern: /\b(face serum|body butter|face cleanser|lip set|black soap|sunscreen|hair cream|toner|brow pencil|cuticle oil|hair oil|pressed powder|body lotion|brush set|hand cream|soap)\b/i, images: ["photo-1598440947619-2c35fc9aa908", "photo-1608248543803-ba4f8c70ae0b", "photo-1601049541289-9b1b7bbbfe19", "photo-1596462502278-27bfdc403348", "photo-1608571423902-eed4a5ad8108"] },
    { pattern: /\b(dress|crossbody bag|canvas trainers|two-piece|earrings|senator|cardigan|raffia tote|sandals|sunglasses|t-shirt|beaded bracelet|skirt|leather belt|running trainers|gym duffel|raincoat|ankara)\b/i, images: ["photo-1483985988355-763728e1935b", "photo-1490481651871-ab68de25d43d", "photo-1529139574466-a303027c1d8b", "photo-1525507119028-ed4c629a60a3", "photo-1496747611176-843222e1e57c", "photo-1539109136881-3be0616acf4b", "photo-1509631179647-0177331693ae"] },
    { pattern: /\b(cushion|lamp|plate|bedsheet|basket|wall clock|bath mat|vase|pillow|storage jars|duvet|serving tray|plant pot|towel|kitchen|kettle|blender|fan|hotplate|air fryer|iron|refrigerator|cooker|microwave|washing machine)\b/i, images: ["photo-1616486338812-3dadae4b4ace", "photo-1600210492486-724fe5c67fb0", "photo-1616486029423-aaa4789e8c9a", "photo-1618221195710-dd6b41faaea6", "photo-1615874694520-474822394e73", "photo-1600607687939-ce8a6c25118c", "photo-1556911220-bff31c812dba", "photo-1556912172-45b7abe8b7e1"] },
    { pattern: /\b(yoga mat|jump rope|resistance band|football boots|dumbbell|camping lantern|football size|cycling helmet|push-up bars|workout|sports water bottle)\b/i, images: ["photo-1517836357463-d25dfeac3438", "photo-1534438327276-14e5300c3a48", "photo-1518611012118-696072aa579a", "photo-1571019613454-1cb2f99b2d8b", "photo-1517649763962-0c623066013b"] },
    { pattern: /\b(baby|teddy bear|building blocks|baby carrier|toddler|infant|kids|children|storybook|shape sorter|plush)\b/i, images: ["photo-1515488042361-ee00e0ddd4e4", "photo-1516627145497-ae6968895b74", "photo-1503919005314-30d93d07d823", "photo-1566004100631-35d015d6a491", "photo-1596461404969-9ae70f2830c1"] },
    { pattern: /\b(journal|planner|pencil|notebook|storybook|gel pen|painting|flash cards|fountain pen|calligraphy|chess|exercise book|notepad)\b/i, images: ["photo-1455390582262-044cdead277a", "photo-1456324504439-367cee3b3c32", "photo-1519682337058-a94d519337bc", "photo-1513475382585-d06e58bcb0e0"] },
    { pattern: /\b(car|tyre|steering wheel|seat cover|floor mats|jump starter|tool kit|safety triangle)\b/i, images: ["photo-1492144534655-ae79c964c9d7", "photo-1503376780353-7e6692767b70", "photo-1486262715619-67b85e0b08d3", "photo-1486006920555-c77dcf18193c"] },
    { pattern: /\b(blood pressure|first aid|vitamin|hot and cold pack|weight scale|back support|lunch container|posture support|thermometer|wellness)\b/i, images: ["photo-1505751172876-fa1923c5c528", "photo-1506126613408-eca07ce68773", "photo-1544367567-0f2fcb009e0b", "photo-1518611012118-696072aa579a"] },
    { pattern: /\b(ankara|bead|candle|market basket|gift box|leather card holder|wall art|coaster|gift hamper|ceramic mug|keyring|greeting card)\b/i, images: ["photo-1490312278390-ab64016e0aa9", "photo-1452860606245-08befc0ff44b", "photo-1513519245088-0e12902e5a38", "photo-1455390582262-044cdead277a"] }
  ];

  const productImagesByName = Object.create(null);
  categories.forEach(category => {
    const usedImages = new Set();
    category.items.forEach((name, itemIndex) => {
      const matchingRule = productImageRules.find(rule => rule.pattern.test(name));
      const preferredImage = matchingRule && matchingRule.images.find(image => !usedImages.has(image));
      const categoryImages = productImagesByCategory[category.name];
      const fallbackImage = categoryImages.find(image => !usedImages.has(image));
      const image = preferredImage || fallbackImage || categoryImages[itemIndex];
      productImagesByName[name] = image;
      usedImages.add(image);
    });
  });

  function imageForProduct(name, category, itemIndex) {
    return productImagesByName[name] || productImagesByCategory[category][itemIndex];
  }

  const storage = {
    read(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch (error) {
        console.warn(`Shopie could not read local setting "${key}".`, error);
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.warn(`Shopie could not save local setting "${key}".`, error);
        toast("Your browser could not save this change. Check your storage settings.", true);
        return false;
      }
    }
  };

  let products = buildProducts();
  let cart = storage.read("shopie-cart", []);
  if (!Array.isArray(cart)) cart = [];
  let favorites = new Set(storage.read("shopie-favorites", []));
  let activeCategory = "All finds";
  let visibleCount = 20;
  let searchTerm = "";
  let currentUser = storage.read("shopie-user", null);
  let toastTimer;
  let lastFocus = null;

  const productGrid = document.getElementById("product-grid");
  const categoryGrid = document.getElementById("category-grid");
  const filterRow = document.getElementById("filter-row");
  const overlay = document.getElementById("overlay");
  const dialogContent = document.getElementById("dialog-content");

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function imageUrl(id, width = 540) {
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=78`;
  }

  function buildProducts() {
    let index = 0;
    return categories.flatMap(category => category.items.map((name, itemIndex) => {
      const seed = (index * 7919 + 4817) % 997;
      const [minimum, maximum] = category.range;
      const price = Math.round((minimum + ((seed * 67) % (maximum - minimum))) / 100) * 100;
      const oldPrice = itemIndex % 5 === 0 ? Math.round(price * 1.24 / 100) * 100 : null;
      const product = {
        id: `shopie-${String(index + 1).padStart(3, "0")}`,
        name,
        category: category.name,
        price: Math.max(price, minimum),
        oldPrice,
        rating: Number((4.1 + ((seed % 9) / 10)).toFixed(1)),
        reviews: 9 + ((seed * 13) % 485),
        badge: itemIndex % 5 === 0 ? "GOOD DEAL" : (itemIndex === 1 ? "LOCAL FAVE" : ""),
        image: imageForProduct(name, category.name, itemIndex),
        newest: index
      };
      index += 1;
      return product;
    }));
  }

  function toast(message, isError = false) {
    const region = document.getElementById("toast-region");
    const item = document.createElement("div");
    item.className = `toast${isError ? " error" : ""}`;
    item.setAttribute("role", isError ? "alert" : "status");
    item.textContent = message;
    region.append(item);
    window.setTimeout(() => item.remove(), 3800);
  }

  function getProductImage(product) {
    if (product.imageUrl) return product.imageUrl;
    return imageUrl(product.image || categoryImages[product.category] || "photo-1490481651871-ab68de25d43d");
  }

  function renderCategories() {
    categoryGrid.innerHTML = categories.map(category => `
      <button class="category-tile" type="button" data-category="${escapeHtml(category.name)}">
        <span class="category-image"><img src="${imageUrl(category.image, 300)}" alt="" loading="lazy"></span>
        <strong>${escapeHtml(category.name)}</strong>
      </button>`).join("");
  }

  function renderFilters() {
    const names = ["All finds", ...categories.map(category => category.name)];
    filterRow.innerHTML = names.map(name => `
      <button class="filter-chip${name === activeCategory ? " active" : ""}" type="button" data-filter="${escapeHtml(name)}" aria-pressed="${name === activeCategory}">
        ${escapeHtml(name)}
      </button>`).join("");
  }

  function normalizeProductSearch(value) {
    return value.normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("en")
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function filteredProducts() {
    const categoryMatches = products.filter(product => activeCategory === "All finds" || product.category === activeCategory);
    const query = normalizeProductSearch(searchTerm);
    let matches = categoryMatches;
    if (query) {
      const exactMatches = categoryMatches.filter(product => normalizeProductSearch(product.name) === query);
      matches = exactMatches.length
        ? exactMatches
        : categoryMatches.filter(product => normalizeProductSearch(product.name).includes(query));
    }
    const sort = document.getElementById("sort-select").value;
    if (sort === "price-asc") matches.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") matches.sort((a, b) => b.price - a.price);
    if (sort === "rating") matches.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    if (sort === "newest") matches.sort((a, b) => b.newest - a.newest);
    return matches;
  }

  function renderProducts() {
    const matches = filteredProducts();
    const shown = matches.slice(0, visibleCount);
    document.getElementById("results-caption").textContent = `${matches.length} ${matches.length === 1 ? "good find" : "good finds"}${searchTerm ? ` for “${searchTerm}”` : ""}`;
    document.getElementById("products-title").innerHTML = searchTerm
      ? `Search results<span class="heading-dot">.</span>`
      : activeCategory === "All finds"
        ? `Finds you’ll love<span class="heading-dot">.</span>`
        : `${escapeHtml(activeCategory)}<span class="heading-dot">.</span>`;
    productGrid.innerHTML = shown.length ? shown.map(product => `
      <article class="product-card">
        <div class="product-picture">
          <img src="${getProductImage(product)}" alt="${escapeHtml(product.name)}" loading="lazy">
          ${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ""}
          <button class="favorite-button${favorites.has(product.id) ? " is-favorite" : ""}" type="button" data-favorite="${escapeHtml(product.id)}" aria-label="${favorites.has(product.id) ? "Remove from" : "Add to"} favourites" aria-pressed="${favorites.has(product.id)}">♡</button>
          <button class="quick-add" type="button" data-add="${escapeHtml(product.id)}">Add to bag <span aria-hidden="true">+</span></button>
        </div>
        <div class="product-info">
          <span class="product-category">${escapeHtml(product.category)}</span>
          <p class="product-name">${escapeHtml(product.name)}</p>
          <div class="product-price-row"><span class="product-price">${money.format(product.price)}</span>${product.oldPrice ? `<span class="product-old-price">${money.format(product.oldPrice)}</span>` : ""}</div>
          <div class="product-rating" aria-label="${product.rating} out of 5 stars">★ <span>${product.rating} (${product.reviews})</span></div>
        </div>
      </article>`).join("") : `      <div class="empty-state">${searchTerm ? `No product found for “${escapeHtml(searchTerm)}”.` : "Nothing in this edit just yet."}<br>Try another search or pick a different category.</div>`;
    const moreButton = document.getElementById("load-more");
    moreButton.hidden = shown.length >= matches.length || matches.length === 0;
    document.getElementById("load-caption").textContent = matches.length ? `Showing ${shown.length} of ${matches.length}` : "";
  }

  function setCategory(category) {
    activeCategory = categories.some(item => item.name === category) ? category : "All finds";
    visibleCount = 20;
    renderFilters();
    renderProducts();
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveCart() {
    storage.write("shopie-cart", cart);
    renderCartCount();
  }

  function renderCartCount() {
    const count = cart.reduce((sum, line) => sum + line.quantity, 0);
    document.getElementById("cart-count").textContent = String(count);
    document.getElementById("cart-button").setAttribute("aria-label", `Cart, ${count} ${count === 1 ? "item" : "items"}`);
  }

  function addToCart(productId) {
    if (!products.some(product => product.id === productId)) return;
    const existing = cart.find(line => line.productId === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ productId, quantity: 1 });
    saveCart();
    toast("Added to your bag. Nice choice!");
  }

  function showDialog(markup, title, widthClass = "") {
    lastFocus = document.activeElement;
    dialogContent.innerHTML = markup;
    const heading = dialogContent.querySelector("h2");
    if (heading) {
      heading.id = "dialog-title";
      heading.setAttribute("aria-label", title);
    }
    dialogContent.closest(".dialog").className = `dialog${widthClass ? ` ${widthClass}` : ""}`;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    const focusable = overlay.querySelector("input, select, textarea, button:not(.dialog-close)");
    if (focusable) focusable.focus();
  }

  function closeDialog() {
    overlay.hidden = true;
    dialogContent.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function formError(form, message) {
    let output = form.querySelector(".form-error");
    if (!output) {
      output = document.createElement("p");
      output.className = "form-error";
      output.setAttribute("role", "alert");
      form.prepend(output);
    }
    output.textContent = message;
  }

  async function requestJson(path, options = {}) {
    let response;
    try {
      response = await fetch(path, {
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options
      });
    } catch (error) {
      const unavailable = new Error("We couldn’t reach Shopie’s server. Check your connection and try again.");
      unavailable.kind = "network";
      throw unavailable;
    }
    const contentType = response.headers.get("content-type") || "";
    const isJsonResponse = contentType.includes("application/json") || contentType.includes("+json");
    let responseText = "";
    let payload = {};
    try {
      responseText = await response.text();
      if (responseText) payload = JSON.parse(responseText);
    } catch (error) {
      if (response.ok) throw new Error("Shopie’s server returned an unexpected response. Please try again.");
    }
    if (!response.ok) {
      const requestError = new Error(payload.message || payload.error || `The request could not be completed (${response.status}).`);
      requestError.status = response.status;
      const isHtmlResponse = contentType.includes("text/html") || /^\s*<!doctype html|^\s*<html/i.test(responseText);
      if (response.status === 403 && !isJsonResponse && isHtmlResponse) requestError.kind = "static-host-forbidden";
      if (payload.code === "API_UNAVAILABLE" || payload.code === "ROUTE_NOT_FOUND") requestError.kind = "api-unavailable";
      throw requestError;
    }
    return payload;
  }

  function encodeBytes(bytes) {
    return btoa(String.fromCharCode(...bytes));
  }

  function decodeBytes(value) {
    return Uint8Array.from(atob(value), character => character.charCodeAt(0));
  }

  async function hashDemoPassword(password, salt) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("Browser-only demo sign-in requires a secure browser context. Open the site using localhost or set up the Shopie server.");
    }
    const key = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await window.crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations: 210000, hash: "SHA-256" },
      key,
      256
    );
    return new Uint8Array(bits);
  }

  function bytesMatch(left, right) {
    if (left.length !== right.length) return false;
    let difference = 0;
    for (let index = 0; index < left.length; index += 1) difference |= left[index] ^ right[index];
    return difference === 0;
  }

  function canUseBrowserDemo(error) {
    return error.status === 404
      || error.kind === "static-host-forbidden"
      || error.kind === "api-unavailable"
      || (location.protocol === "file:" && error.kind === "network");
  }

  async function browserDemoAuth(mode, data, role) {
    const users = storage.read("shopie-demo-users", []);
    if (!Array.isArray(users)) throw new Error("Demo account storage is invalid. Clear this site’s stored data and try again.");
    const email = String(data.email || "").trim().toLocaleLowerCase("en");
    const user = users.find(entry => entry.email === email);

    if (mode === "signup") {
      if (user) throw new Error("An account with this email already exists in this browser. Sign in instead.");
      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const passwordHash = await hashDemoPassword(data.password, salt);
      const createdUser = {
        id: `demo-${window.crypto.randomUUID()}`,
        name: String(data.name || "").trim(),
        email,
        role
      };
      users.push({
        ...createdUser,
        salt: encodeBytes(salt),
        passwordHash: encodeBytes(passwordHash)
      });
      if (!storage.write("shopie-demo-users", users)) {
        throw new Error("This browser could not save your demo account. Check storage settings and try again.");
      }
      return createdUser;
    }

    if (!user || !user.salt || !user.passwordHash) {
      throw new Error("No matching account was found in this browser. Create an account first.");
    }
    if (user.role !== role) {
      throw new Error(user.role === "merchant"
        ? "This is a seller account. Choose seller sign in to continue."
        : "This is a customer account. Sign in from the customer account screen.");
    }
    const passwordHash = await hashDemoPassword(data.password, decodeBytes(user.salt));
    if (!bytesMatch(passwordHash, decodeBytes(user.passwordHash))) {
      throw new Error("That email and password do not match this browser account.");
    }
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  function signInUser(user, isDemoAccount) {
    currentUser = { id: user.id, name: user.name, email: user.email, role: user.role, demo: isDemoAccount };
    storage.write("shopie-user", currentUser);
    document.getElementById("account-label").textContent = `Hi, ${currentUser.name.split(/\s+/)[0] || "there"}`;
  }

  async function signOutUser() {
    if (!currentUser) return;
    if (!currentUser.demo) {
      try {
        await requestJson("/api/auth/logout", { method: "POST", body: JSON.stringify({}) });
      } catch (error) {
        toast(`Could not sign out: ${error.message}`, true);
        return;
      }
    }
    currentUser = null;
    try {
      localStorage.removeItem("shopie-user");
    } catch (error) {
      console.warn("Shopie could not clear the saved demo session.", error);
    }
    document.getElementById("account-label").textContent = "Hi, sign in";
    closeDialog();
    toast("You’ve signed out.");
  }

  function authDialog(mode = "login", role = "customer") {
    if (currentUser) {
      showDialog(`
        <span class="dialog-kicker">${currentUser.role === "merchant" ? "YOUR SHOPIE SHOP" : "YOUR SHOPIE ACCOUNT"}</span>
        <h2 id="dialog-title">Hi, ${escapeHtml(currentUser.name.split(/\s+/)[0])}<span class="heading-dot">.</span></h2>
        <p class="dialog-intro">${escapeHtml(currentUser.email)}<br>${currentUser.role === "merchant" ? "Seller account" : "Customer account"}</p>
        ${currentUser.role === "merchant" ? `<button class="button button-dark" type="button" data-open-seller-shop>Open your shop <span aria-hidden="true">→</span></button>` : ""}
        <p class="dialog-switch"><button type="button" data-signout>Sign out</button></p>
        <p class="demo-note">${currentUser.demo ? "Browser demo accounts only work in this browser on this device. Add a secure Shopie backend before accepting real customers." : "Your account is managed by the Shopie server. Keep your password private."}</p>
      `, "Your Shopie account");
      return;
    }
    const isSignup = mode === "signup";
    const isMerchant = role === "merchant";
    const title = isMerchant ? (isSignup ? "Start your Shopie shop" : "Merchant sign in") : (isSignup ? "Make yourself at home" : "Welcome back");
    const action = isSignup ? "signup" : "login";
    showDialog(`
      <span class="dialog-kicker">${isMerchant ? "YOUR BUSINESS, MEET YOUR PEOPLE" : "A GOOD PLACE TO BE"}</span>
      <h2 id="dialog-title">${title}</h2>
      <p class="dialog-intro">${isMerchant ? "Create a seller account to start listing the good stuff you make or sell." : "Sign in or create your Shopie account to shop, save your favourites and keep track of orders."}</p>
      <form class="dialog-form" data-form="${action}" data-role="${isMerchant ? "merchant" : "customer"}">
        ${isSignup ? `<label class="form-field">${isMerchant ? "Business name" : "Your name"}<input name="name" type="text" autocomplete="name" required minlength="2" maxlength="100" placeholder="${isMerchant ? "Your shop or business name" : "What should we call you?"}"></label>` : ""}
        <label class="form-field">Email address<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"></label>
        <label class="form-field">Password<input name="password" type="password" autocomplete="${isSignup ? "new-password" : "current-password"}" required minlength="8" maxlength="128" placeholder="At least 8 characters"></label>
        <button class="button button-dark" type="submit">${isSignup ? (isMerchant ? "Create seller account" : "Create account") : (isMerchant ? "Sign in to your shop" : "Sign in")} <span aria-hidden="true">→</span></button>
      </form>
      <p class="dialog-switch">${isSignup ? "Already with us?" : "New around here?"} <button type="button" data-auth-switch="${isSignup ? "login" : "signup"}" data-role="${isMerchant ? "merchant" : "customer"}">${isSignup ? "Sign in" : "Create an account"}</button></p>
      <p class="demo-note">If the Shopie account server is not configured, accounts are saved as password hashes in this browser only. Browser demo accounts are not secure production accounts and won’t sync to another device.</p>
    `, title);
  }

  function renderCartDialog() {
    cart = cart.filter(line => products.some(product => product.id === line.productId) && Number.isInteger(line.quantity) && line.quantity > 0);
    saveCart();
    const lines = cart.map(line => ({ ...line, product: products.find(product => product.id === line.productId) }));
    const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
    const markup = lines.length ? `
      <span class="dialog-kicker">IT’S ALL COMING TOGETHER</span><h2 id="dialog-title">Your bag<span class="heading-dot">.</span></h2>
      <div class="cart-list">${lines.map(line => `
        <div class="cart-line">
          <img src="${getProductImage(line.product)}" alt="" loading="lazy">
          <div><div class="cart-line-name">${escapeHtml(line.product.name)}</div><div class="cart-line-price">${money.format(line.product.price)}</div>
            <div class="quantity-control"><button type="button" data-quantity="${escapeHtml(line.productId)}" data-change="-1" aria-label="Decrease quantity">−</button><span>${line.quantity}</span><button type="button" data-quantity="${escapeHtml(line.productId)}" data-change="1" aria-label="Increase quantity">+</button></div>
          </div>
          <button class="remove-item" type="button" data-remove="${escapeHtml(line.productId)}">Remove</button>
        </div>`).join("")}</div>
      <div class="cart-total"><span>Subtotal</span><span>${money.format(total)}</span></div>
      <p class="cart-footnote">Delivery is calculated at checkout. Payments are processed securely by our payment provider.</p>
      <button class="button button-dark" type="button" data-checkout>Continue to checkout <span aria-hidden="true">→</span></button>
    ` : `<span class="dialog-kicker">A LITTLE SPACE FOR SOMETHING GOOD</span><h2 id="dialog-title">Your bag is empty.</h2><div class="cart-empty">Your next favourite thing is out there.<br>Let’s go find it.</div><button class="button button-dark" type="button" data-close-continue>Explore good finds <span aria-hidden="true">→</span></button>`;
    showDialog(markup, "Your bag");
  }

  function checkoutDialog() {
    if (!cart.length) return renderCartDialog();
    const total = cart.reduce((sum, line) => {
      const product = products.find(item => item.id === line.productId);
      return sum + (product ? product.price * line.quantity : 0);
    }, 0);
    showDialog(`
      <span class="dialog-kicker">THE LAST LITTLE STEP</span><h2 id="dialog-title">Where should it go?</h2>
      <p class="dialog-intro">Add your delivery details and we’ll take you to secure payment. The Shopie server can send your order email after payment is verified.</p>
      <div class="cart-total"><span>Order subtotal</span><span>${money.format(total)}</span></div>
      <form class="dialog-form" data-form="checkout">
        <label class="form-field">Full name<input name="name" autocomplete="name" required maxlength="100" placeholder="Name for delivery"></label>
        <label class="form-field">Email for order updates<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com"></label>
        <label class="form-field">Phone number<input name="phone" type="tel" autocomplete="tel" required minlength="7" maxlength="20" placeholder="+234 800 000 0000"></label>
        <label class="form-field">Delivery address<textarea name="address" autocomplete="street-address" required minlength="8" maxlength="500" placeholder="Street, neighbourhood, city and state"></textarea></label>
        <label class="form-field">State
          <select name="state" required>
            <option value="">Choose your state</option>
            <option>Abia</option><option>Adamawa</option><option>Akwa Ibom</option><option>Anambra</option><option>Bauchi</option><option>Bayelsa</option><option>Benue</option><option>Borno</option><option>Cross River</option><option>Delta</option><option>Ebonyi</option><option>Edo</option><option>Ekiti</option><option>Enugu</option><option>FCT</option><option>Gombe</option><option>Imo</option><option>Jigawa</option><option>Kaduna</option><option>Kano</option><option>Katsina</option><option>Kebbi</option><option>Kogi</option><option>Kwara</option><option>Lagos</option><option>Nasarawa</option><option>Niger</option><option>Ogun</option><option>Ondo</option><option>Osun</option><option>Oyo</option><option>Plateau</option><option>Rivers</option><option>Sokoto</option><option>Taraba</option><option>Yobe</option><option>Zamfara</option>
          </select>
        </label>
        <button class="button button-dark" type="submit">Continue to secure payment <span aria-hidden="true">→</span></button>
      </form>
      <p class="demo-note">Your payment details are entered with our payment provider and are never stored by Shopie.</p>
    `, "Delivery details");
  }

  function merchantProductDialog() {
    if (!currentUser || currentUser.role !== "merchant") {
      authDialog("signup", "merchant");
      toast(currentUser ? "Sign in with a seller account to open your shop." : "Create a seller account to start your shop.");
      return;
    }
    showDialog(`
      <span class="dialog-kicker">LET’S PUT YOUR GOOD STUFF OUT THERE</span><h2 id="dialog-title">List a product<span class="heading-dot">.</span></h2>
      <p class="dialog-intro">A seller account is required. Your listing is submitted to the Shopie server for review and publishing.</p>
      <p class="dialog-switch">New to Shopie? <button type="button" data-merchant-auth="signup">Create a seller account</button> &middot; <button type="button" data-merchant-auth="login">Seller sign in</button></p>
      <form class="dialog-form" data-form="product">
        <label class="form-field">Product name<input name="name" required minlength="3" maxlength="120" placeholder="What are you selling?"></label>
        <label class="form-field">Category<select name="category" required><option value="">Choose a category</option>${categories.map(category => `<option value="${escapeHtml(category.name)}">${escapeHtml(category.name)}</option>`).join("")}</select></label>
        <label class="form-field">Price in naira<input name="price" type="number" min="100" max="100000000" step="100" required placeholder="e.g. 15000"></label>
        <label class="form-field">Product photo URL<input name="imageUrl" type="url" maxlength="1000" placeholder="https://... (optional)"></label>
        <label class="form-field">A little description<textarea name="description" required minlength="10" maxlength="1500" placeholder="What makes it worth finding?"></textarea></label>
        <button class="button button-dark" type="submit">Submit your listing <span aria-hidden="true">→</span></button>
      </form>
    `, "List a product");
  }

  async function loadOrders() {
    showDialog(`<span class="dialog-kicker">YOUR GOOD STUFF, IN ONE PLACE</span><h2 id="dialog-title">Your orders<span class="heading-dot">.</span></h2><p class="dialog-intro" data-orders-status>Loading your orders…</p>`, "Your orders");
    try {
      const result = await requestJson("/api/orders/me", { method: "GET", headers: {} });
      const orders = Array.isArray(result.orders) ? result.orders : [];
      dialogContent.innerHTML = `
        <span class="dialog-kicker">YOUR GOOD STUFF, IN ONE PLACE</span><h2 id="dialog-title">Your orders<span class="heading-dot">.</span></h2>
        ${orders.length ? `<div class="cart-list">${orders.map(order => `<div class="demo-note"><strong>Order ${escapeHtml(order.reference || order.id || "")}</strong><br>${escapeHtml(order.status || "Processing")} &middot; ${escapeHtml(order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-NG") : "")}</div>`).join("")}</div>` : `<p class="dialog-intro">No orders just yet. Your next good find is waiting.</p>`}`;
    } catch (error) {
      const status = dialogContent.querySelector("[data-orders-status]");
      if (status) status.textContent = error.message;
    }
  }

  function toggleFavorite(productId) {
    if (favorites.has(productId)) favorites.delete(productId);
    else favorites.add(productId);
    storage.write("shopie-favorites", [...favorites]);
    renderProducts();
  }

  document.getElementById("search-form").addEventListener("submit", event => {
    event.preventDefault();
    searchTerm = document.getElementById("search-input").value.trim();
    activeCategory = "All finds";
    visibleCount = 20;
    renderFilters();
    renderProducts();
    document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("search-input").addEventListener("input", event => {
    if (event.target.value.trim() === "") {
      searchTerm = "";
      visibleCount = 20;
      renderProducts();
    }
  });

  document.getElementById("sort-select").addEventListener("change", () => {
    visibleCount = 20;
    renderProducts();
  });

  filterRow.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (button) setCategory(button.dataset.filter);
  });

  categoryGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (button) setCategory(button.dataset.category);
  });

  document.querySelectorAll("[data-category-link]").forEach(link => link.addEventListener("click", () => {
    searchTerm = "";
    document.getElementById("search-input").value = "";
    setCategory(link.dataset.categoryLink);
  }));

  document.getElementById("departments-button").addEventListener("click", () => {
    searchTerm = "";
    document.getElementById("search-input").value = "";
    setCategory("All finds");
  });

  productGrid.addEventListener("click", event => {
    const favorite = event.target.closest("[data-favorite]");
    const add = event.target.closest("[data-add]");
    if (favorite) toggleFavorite(favorite.dataset.favorite);
    if (add) addToCart(add.dataset.add);
  });

  document.getElementById("load-more").addEventListener("click", () => {
    visibleCount += 20;
    renderProducts();
  });

  document.getElementById("cart-button").addEventListener("click", renderCartDialog);
  document.getElementById("account-button").addEventListener("click", () => authDialog());
  document.getElementById("footer-account").addEventListener("click", () => authDialog());
  document.getElementById("orders-button").addEventListener("click", loadOrders);
  document.getElementById("merchant-button").addEventListener("click", merchantProductDialog);
  document.getElementById("merchant-login-button").addEventListener("click", () => authDialog("login", "merchant"));
  document.getElementById("dialog-close").addEventListener("click", closeDialog);
  overlay.addEventListener("click", event => {
    if (event.target === overlay) closeDialog();
  });

  dialogContent.addEventListener("click", event => {
    const switchButton = event.target.closest("[data-auth-switch]");
    const merchantAuthButton = event.target.closest("[data-merchant-auth]");
    const quantityButton = event.target.closest("[data-quantity]");
    const removeButton = event.target.closest("[data-remove]");
    if (switchButton) authDialog(switchButton.dataset.authSwitch, switchButton.dataset.role);
    if (event.target.closest("[data-signout]")) signOutUser();
    if (event.target.closest("[data-open-seller-shop]")) merchantProductDialog();
    if (merchantAuthButton) authDialog(merchantAuthButton.dataset.merchantAuth, "merchant");
    if (quantityButton) {
      const line = cart.find(item => item.productId === quantityButton.dataset.quantity);
      if (line) line.quantity += Number(quantityButton.dataset.change);
      cart = cart.filter(item => item.quantity > 0);
      saveCart();
      renderCartDialog();
    }
    if (removeButton) {
      cart = cart.filter(item => item.productId !== removeButton.dataset.remove);
      saveCart();
      renderCartDialog();
    }
    if (event.target.closest("[data-checkout]")) checkoutDialog();
    if (event.target.closest("[data-close-continue]")) closeDialog();
  });

  dialogContent.addEventListener("submit", async event => {
    const form = event.target.closest("form[data-form]");
    if (!form) return;
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "One moment…";
    try {
      if (form.dataset.form === "login" || form.dataset.form === "signup") {
        const role = form.dataset.role;
        let user;
        let isDemoAccount = false;
        try {
          const result = await requestJson(`/api/auth/${form.dataset.form}`, {
            method: "POST",
            body: JSON.stringify({ ...data, role })
          });
          if (!result.user) throw new Error("Shopie’s account server did not confirm your account. Please try again.");
          user = {
            id: result.user.id || result.user.uid || `server-${String(data.email).trim().toLowerCase()}`,
            name: result.user.name || data.name || String(data.email).split("@")[0],
            email: result.user.email || String(data.email).trim().toLowerCase(),
            role: result.user.role || role
          };
        } catch (error) {
          if (!canUseBrowserDemo(error)) throw error;
          user = await browserDemoAuth(form.dataset.form, data, role);
          isDemoAccount = true;
        }
        signInUser(user, isDemoAccount);
        closeDialog();
        toast(isDemoAccount
          ? `${form.dataset.form === "signup" ? "Account created" : "Signed in"} in browser demo mode. This account only works on this device.`
          : form.dataset.form === "signup" ? "Your Shopie account is ready." : "You’re signed in. Welcome back!");
        if (user.role === "merchant") authDialog();
      }
      if (form.dataset.form === "checkout") {
        const result = await requestJson("/api/orders", {
          method: "POST",
          body: JSON.stringify({
            customer: { name: data.name, email: data.email, phone: data.phone },
            delivery: { address: data.address, state: data.state },
            items: cart.map(line => ({ productId: line.productId, quantity: line.quantity }))
          })
        });
        if (!result.checkoutUrl || !/^https:\/\//i.test(result.checkoutUrl)) {
          throw new Error("The payment service didn’t return a secure checkout link. Your bag is unchanged; please try again.");
        }
        window.location.assign(result.checkoutUrl);
      }
      if (form.dataset.form === "product") {
        const result = await requestJson("/api/products", {
          method: "POST",
          body: JSON.stringify({
            name: data.name,
            category: data.category,
            price: Number(data.price),
            imageUrl: data.imageUrl || undefined,
            description: data.description
          })
        });
        const product = result.product;
        if (product && product.id && product.name && product.category && Number.isFinite(Number(product.price))) {
          products.unshift({
            id: String(product.id),
            name: String(product.name),
            category: String(product.category),
            price: Number(product.price),
            oldPrice: null,
            rating: 5,
            reviews: 0,
            badge: "NEW",
            image: product.imageUrl ? null : categoryImages[product.category],
            imageUrl: product.imageUrl || null,
            newest: products.length + 1
          });
        }
        closeDialog();
        renderProducts();
        toast("Your listing was submitted successfully.");
      }
    } catch (error) {
      formError(form, error.message);
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !overlay.hidden) closeDialog();
    if (event.key !== "Tab" || overlay.hidden) return;
    const focusable = [...overlay.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]')];
    if (!focusable.length) return;
    if (event.shiftKey && document.activeElement === focusable[0]) {
      event.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
      event.preventDefault();
      focusable[0].focus();
    }
  });

  document.getElementById("year").textContent = String(new Date().getFullYear());
  if (currentUser && currentUser.name) {
    document.getElementById("account-label").textContent = `Hi, ${currentUser.name.split(/\s+/)[0] || "there"}`;
  } else {
    currentUser = null;
  }
  renderCategories();
  renderFilters();
  renderProducts();
  renderCartCount();
})();
