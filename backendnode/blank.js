// const Users = require("./models/users");
// let user = {
//   username: "pranavtelangade",
//   email: "pranavstelangade@gmail.com",
//   password: "admin",
//   phone: "9867900425",
//   role: "admin",
// };

// async function addadmin(user) {
//   const { username, email, password, phone, role } = user;
//   // Create a new user
//   const newUser = new Users({ username, email, password, phone, role });
//   await newUser.save();
//   console.log("Admin User Added!!", newUser);
// }

// addadmin(user);

// const Product = require("./models/products");

// async function addproducts(data) {
//   const { Name, Description, Price, Category, StockQuantity, ImageUrl } = data;

//   const newproduct = new Product({
//     Name,
//     Description,
//     Price,
//     Category,
//     StockQuantity,
//     ImageUrl,
//   });
//   await newproduct.save();
//   console.log("Product Added!!", newproduct);
// }

// let data = [
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac16.jpg",
//     Name: "Google Pixel 6",
//     Description: 'Flagship smartphone with 6.4" OLED display',
//     Price: 799,
//     Category: "Phone",
//     StockQuantity: 100,
//     createdAt: "2024-03-30T06:36:04.637Z",
//     updatedAt: "2024-03-30T06:36:04.637Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac19.jpg",
//     Name: "Motorola Edge 20",
//     Description: "5G-enabled smartphone with Snapdragon 778G",
//     Price: 499,
//     Category: "Phone",
//     StockQuantity: 80,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac1a.jpg",
//     Name: "Apple AirPods Pro",
//     Description: "High-quality noise-cancelling earphones",
//     Price: 249,
//     Category: "Earphones",
//     StockQuantity: 200,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac1b.jpg",
//     Name: "Sony WH-1000XM4",
//     Description:
//       "Wireless over-ear headphones with industry-leading noise cancellation",
//     Price: 349,
//     Category: "Headphones",
//     StockQuantity: 150,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac1c.jpg",
//     Name: "Samsung Galaxy Buds Pro",
//     Description:
//       "True wireless earbuds with intelligent active noise cancellation",
//     Price: 199,
//     Category: "Earphones",
//     StockQuantity: 180,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac1d.jpg",
//     Name: "Google Pixelbook Go",
//     Description: "Ultra-thin Chromebook with up to 12 hours of battery life",
//     Price: 649,
//     Category: "Laptop",
//     StockQuantity: 100,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac1e.jpg",
//     Name: 'Apple MacBook Pro 13"',
//     Description: "Powerful laptop with M1 chip and Retina display",
//     Price: 1299,
//     Category: "Laptop",
//     StockQuantity: 120,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac18.jpg",
//     Name: "Samsung Galaxy S21",
//     Description: "Ultra-fast 5G smartphone with 120Hz display",
//     Price: 899,
//     Category: "Phone",
//     StockQuantity: 120,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac22.jpg",
//     Name: "Samsung Odyssey G9",
//     Description: '49" curved gaming monitor with 240Hz refresh rate',
//     Price: 1499,
//     Category: "Monitor",
//     StockQuantity: 70,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac17.jpg",
//     Name: "Apple iPhone 13",
//     Description: "Powerful smartphone with A15 Bionic chip",
//     Price: 999,
//     Category: "Phone",
//     StockQuantity: 150,
//     createdAt: "2024-03-30T06:36:04.637Z",
//     updatedAt: "2024-03-30T06:36:04.637Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac21.jpg",
//     Name: "Apple iPad Air",
//     Description: '10.9" tablet with A14 Bionic chip and True Tone display',
//     Price: 599,
//     Category: "Tablet",
//     StockQuantity: 150,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac25.jpg",
//     Name: "Apple Watch Series 7",
//     Description: "Advanced smartwatch with always-on Retina display",
//     Price: 399,
//     Category: "Smartwatch",
//     StockQuantity: 120,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac24.jpg",
//     Name: "Razer Blade 15",
//     Description: "Powerful gaming laptop with NVIDIA GeForce RTX 3080 GPU",
//     Price: 2499,
//     Category: "Laptop",
//     StockQuantity: 50,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac23.jpg",
//     Name: "LG UltraGear 27GN950-B",
//     Description: '27" 4K UHD Nano IPS gaming monitor with G-Sync compatibility',
//     Price: 799,
//     Category: "Monitor",
//     StockQuantity: 100,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac28.jpg",
//     Name: "Apple HomePod Mini",
//     Description: "Compact smart speaker with Siri voice control",
//     Price: 99,
//     Category: "Smart Home",
//     StockQuantity: 200,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac27.jpg",
//     Name: "Google Nest Hub Max",
//     Description:
//       'Smart display with 10" HD screen and built-in Google Assistant',
//     Price: 229,
//     Category: "Smart Home",
//     StockQuantity: 150,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac26.jpg",
//     Name: "Samsung Galaxy Watch 4",
//     Description: "Health and fitness smartwatch with built-in GPS",
//     Price: 249,
//     Category: "Smartwatch",
//     StockQuantity: 180,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac29.jpg",
//     Name: "Samsung SmartThings Hub V3",
//     Description:
//       "Connectivity hub for smart home devices with Zigbee and Z-Wave support",
//     Price: 69,
//     Category: "Smart Home",
//     StockQuantity: 100,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac20.jpg",
//     Name: "Microsoft Surface Pro 8",
//     Description: "Versatile 2-in-1 laptop with Intel Core i7 processor",
//     Price: 1299,
//     Category: "Laptop",
//     StockQuantity: 100,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
//   {
//     ImageUrl:
//       "https://e-commerce-hkzp.onrender.com/api/images/viewimage/6607b2d4bb5333493572ac1f.jpg",
//     Name: "Samsung Galaxy Tab S7+",
//     Description: 'Premium Android tablet with 12.4" Super AMOLED display',
//     Price: 849,
//     Category: "Tablet",
//     StockQuantity: 80,
//     createdAt: "2024-03-30T06:36:04.638Z",
//     updatedAt: "2024-03-30T06:36:04.638Z",
//     __v: 0,
//   },
// ];
// data.forEach((e) => {
//   addproducts(e);
// });
