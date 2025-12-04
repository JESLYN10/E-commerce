const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();
const products = [
    {
        id: 1,
        name: "Custom Mugs",
        price: 800,
        img: "https://i.pinimg.com/736x/9e/da/e7/9edae7ed55390b429f5c34314dd81134.jpg",
        des: "Personalize your mugs with names, quotes, or images. Perfect for gifts, corporate branding, or a unique touch to your daily coffee! ☕🎨",
        category: "Drinkware",
        occasions: "Corporate Gifts",
    },
    {
        id: 2,
        name: "Custom Chains",
        price: 650,
        img: "https://i.pinimg.com/736x/b3/a5/67/b3a567ff481f1d7fa939f2c51d558249.jpg",
        des: "Elevate your style with personalized chains! Engrave names, initials, or symbols for a unique touch. Perfect for gifting 🎁 or making a statement. 💖",
        category: "Accessories",
        occasions: "Personal Gifts",
    },
    {
        id: 3,
        name: "Tropical Jewelry",
        price: 550,
        img: "https://i.pinimg.com/736x/ab/f6/c4/abf6c4a72756c691d6d12c906a381ebc.jpg",
        des: "Embrace island vibes with vibrant, nature-inspired accessories! Featuring seashells 🐚, beads, and floral 🌺 designs, these pieces add a fresh, beachy charm to any outfit.",
        category: "Jewelry",
        occasions: "Beach Parties",
    },
    {
        id: 4,
        name: "Acrylic Jewelry",
        price: 700,
        img: "https://i.pinimg.com/736x/7d/02/8e/7d028ed1c77c6728ebf003e89293e02a.jpg",
        des: "Lightweight, colorful, and stylish! These trendy accessories feature bold designs, vibrant hues 🎨, and a modern touch.",
        category: "Jewelry",
        occasions: "Casual Outings",
    },
    {
        id: 5,
        name: "Handmade Ceramics",
        price: 700,
        img: "https://i.pinimg.com/736x/b6/cb/fa/b6cbfa7a45f423752ed8cfc51d857d79.jpg",
        des: "Crafted with love and care, these unique pieces bring warmth and charm to your space.",
        category: "Home Decor",
        occasions: "Housewarming Gifts",
    },
    {
        id: 6,
        name: "Mini Message Bottles",
        price: 850,
        img: "https://i.pinimg.com/736x/a4/36/ef/a436ef4b9385c9960217a04caaf7006a.jpg",
        des: "Tiny bottles filled with heartfelt messages, perfect for gifts or keepsakes!",
        category: "Keepsakes",
        occasions: "Romantic Gifts",
    },
    {
        id: 7,
        name: "Custom Notebook",
        price: 600,
        img: "https://i.pinimg.com/736x/1a/d6/63/1ad6634f0b4ede01b5f60c7a21ebd9fe.jpg",
        des: "Personalized notebooks to capture your thoughts, doodles, and dreams! Perfect for journaling, planning, or gifting.",
        category: "Stationery",
        occasions: "Back to School",
    },
    {
        id: 8,
        name: "Embroider Bags",
        price: 650,
        img: "https://i.pinimg.com/736x/cf/d3/3d/cfd33d565f278916d776a7fa3d1bdb40.jpg",
        des: "Stylish and handcrafted bags with intricate embroidery.",
        category: "Bags",
        occasions: "Festivals",
    },
    {
        id: 9,
        name: "Personalized Pencils",
        price: 120,
        img: "https://i.pinimg.com/736x/ab/94/ba/ab94ba27c26e232fda405509c3619965.jpg",
        des: "Add a personal touch to your stationery with custom-engraved pencils!",
        category: "Stationery",
        occasions: "Corporate Gifts",
    },
    {
        id: 10,
        name: "Customized Keychain",
        price: 100,
        img: "https://i.pinimg.com/736x/c8/a3/0a/c8a30af1665822638fe14b68a81dd8e2.jpg",
        des: "Carry a piece of your personality wherever you go! Personalized with names, initials, or special designs.",
        category: "Accessories",
        occasions: "Personal Gifts",
    },
    {
        id: 11,
        name: "Wedding Thank You Gifts",
        price: 700,
        img: "https://i.pinimg.com/736x/6d/1d/62/6d1d62217a72d824d6fb8017af56a5a0.jpg",
        des: "Express gratitude with elegant, heartfelt gifts for your guests!",
        category: "Keepsakes",
        occasions: "Wedding",
    },
    {
        id: 12,
        name: "Resin Arts",
        price: 2050,
        img: "https://i.pinimg.com/736x/79/e1/aa/79e1aa698ca043a03dad3b8d58d53602.jpg",
        des: "Unique, glossy, and vibrant creations made from resin! Each piece is handcrafted with love.",
        category: "Home Decor",
        occasions: "Art Enthusiasts",
    },
    {
        id: 13,
        name: "Scented Candles",
        price: 1050,
        img: "https://i.pinimg.com/736x/25/9f/15/259f152f878efb19c8ccc983a45b4a8a.jpg",
        des: "Transform your space with delightful fragrances!",
        category: "Home Decor",
        occasions: "Self-Care",
    },
    {
        id: 14,
        name: "Personalized Song Keychain",
        price: 1020,
        img: "https://i.pinimg.com/736x/8c/94/22/8c9422083623eb8b0b52d03838a9e13a.jpg",
        des: "Scan to play your favorite song anytime! Perfect for gifts 🎁 or keepsakes ❤️.",
        category: "Accessories",
        occasions: "Romantic Gifts",
    },
    {
        id: 15,
        name: "Personalized Desk Photo Calendar",
        price: 1020,
        img: "https://lemonadeindia.com/cdn/shop/files/personalized-desk-photo-calendar-2025-with-wooden-basestationerylemonade-387857_352x480.jpg?v=1736939846",
        des: "Showcase your favorite memories all year! Perfect gift for any occasion 🎁💕.",
        category: "Stationery",
        occasions: "Personal Gifts",
    },
];
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Seeded sample products.");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  });
