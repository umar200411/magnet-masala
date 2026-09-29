export type Product = {id:string;slug:string;name:string;category:string;image:string;weight:string;price:number|null;tags:string[];featured:boolean;shortDescription:string;recommendedFor:string[];mediaScale:number;gallery?:{src:string;alt:string}[];ingredients?:string;directions?:string;storageInformation?:string};
export const categories=["Recipe Blends","Everyday Spices","Quick Seasonings"];
export const products:Product[]=// Sample prices in PKR; edit each product price before launch.
[
  {
    "id": "biryani-masala",
    "slug": "biryani-masala",
    "name": "Biryani Masala",
    "category": "Recipe Blends",
    "image": "/products/biryani-masala.jpg",
    "weight": "125 g",
    "price": 350,
    "tags": [
      "Rice",
      "biryani",
      "weekend cooking"
    ],
    "featured": true,
    "shortDescription": "For the dishes you love coming home to.",
    "recommendedFor": [
      "Rice",
      "biryani",
      "weekend cooking"
    ],
    "mediaScale": 1
  },
  {
    "id": "chicken-tikka-masala",
    "slug": "chicken-tikka-masala",
    "name": "Chicken Tikka Masala",
    "category": "Recipe Blends",
    "image": "/products/chicken-tikka-masala.jpg",
    "weight": "125 g",
    "price": 350,
    "tags": [
      "BBQ",
      "chicken",
      "tikka"
    ],
    "featured": true,
    "shortDescription": "For the dishes you love coming home to.",
    "recommendedFor": [
      "BBQ",
      "chicken",
      "tikka"
    ],
    "mediaScale": 1
  },
  {
    "id": "seekh-kabab-masala",
    "slug": "seekh-kabab-masala",
    "name": "Seekh Kabab Masala",
    "category": "Recipe Blends",
    "image": "/products/seekh-kabab-masala.jpg",
    "weight": "125 g",
    "price": 350,
    "tags": [
      "BBQ",
      "kabab"
    ],
    "featured": true,
    "shortDescription": "For the dishes you love coming home to.",
    "recommendedFor": [
      "BBQ",
      "kabab"
    ],
    "mediaScale": 1
  },
  {
    "id": "garam-masala",
    "slug": "garam-masala",
    "name": "Garam Masala",
    "category": "Recipe Blends",
    "image": "/products/garam-masala.jpg",
    "weight": "125 g",
    "price": 450,
    "tags": [
      "Curry",
      "everyday cooking"
    ],
    "featured": true,
    "shortDescription": "For the dishes you love coming home to.",
    "recommendedFor": [
      "Curry",
      "everyday cooking"
    ],
    "mediaScale": 1.25
  },
  {
    "id": "fish-masala",
    "slug": "fish-masala",
    "name": "Fish Masala",
    "category": "Recipe Blends",
    "image": "/products/fish-masala.jpg",
    "weight": "125 g",
    "price": 350,
    "tags": [
      "Fish",
      "seafood"
    ],
    "featured": false,
    "shortDescription": "For the dishes you love coming home to.",
    "recommendedFor": [
      "Fish",
      "seafood"
    ],
    "mediaScale": 1.25
  },
  {
    "id": "salan-masala",
    "slug": "salan-masala",
    "name": "Salan Masala",
    "category": "Recipe Blends",
    "image": "/products/salan-masala.jpg",
    "weight": "125 g",
    "price": 300,
    "tags": [
      "Curry",
      "salan"
    ],
    "featured": false,
    "shortDescription": "For the dishes you love coming home to.",
    "recommendedFor": [
      "Curry",
      "salan"
    ],
    "mediaScale": 1.25
  },
  {
    "id": "coriander-powder",
    "slug": "coriander-powder",
    "name": "Coriander Powder",
    "category": "Everyday Spices",
    "image": "/products/coriander-powder.jpg",
    "weight": "125 g",
    "price": 250,
    "tags": [
      "Kitchen essentials",
      "dhania"
    ],
    "featured": false,
    "shortDescription": "A familiar essential for your kitchen shelf.",
    "recommendedFor": [
      "Kitchen essentials",
      "dhania"
    ],
    "mediaScale": 1
  },
  {
    "id": "cumin-powder",
    "slug": "cumin-powder",
    "name": "Cumin Powder",
    "category": "Everyday Spices",
    "image": "/products/cumin-powder.jpg",
    "weight": "125 g",
    "price": 450,
    "tags": [
      "Kitchen essentials",
      "zeera"
    ],
    "featured": false,
    "shortDescription": "A familiar essential for your kitchen shelf.",
    "recommendedFor": [
      "Kitchen essentials",
      "zeera"
    ],
    "mediaScale": 1
  },
  {
    "id": "turmeric-powder",
    "slug": "turmeric-powder",
    "name": "Turmeric Powder",
    "category": "Everyday Spices",
    "image": "/products/turmeric-powder.jpg",
    "weight": "125 g",
    "price": 250,
    "tags": [
      "Kitchen essentials",
      "haldi"
    ],
    "featured": false,
    "shortDescription": "A familiar essential for your kitchen shelf.",
    "recommendedFor": [
      "Kitchen essentials",
      "haldi"
    ],
    "mediaScale": 1
  },
  {
    "id": "black-pepper-powder",
    "slug": "black-pepper-powder",
    "name": "Black Pepper Powder",
    "category": "Everyday Spices",
    "image": "/products/black-pepper-powder.jpg",
    "weight": "125 g",
    "price": 650,
    "tags": [
      "Kitchen essentials",
      "kali mirch"
    ],
    "featured": false,
    "shortDescription": "A familiar essential for your kitchen shelf.",
    "recommendedFor": [
      "Kitchen essentials",
      "kali mirch"
    ],
    "mediaScale": 1
  },
  {
    "id": "garlic-powder",
    "slug": "garlic-powder",
    "name": "Garlic Powder",
    "category": "Everyday Spices",
    "image": "/products/garlic-powder.jpg",
    "weight": "125 g",
    "price": 400,
    "tags": [
      "Kitchen essentials",
      "lehsan"
    ],
    "featured": false,
    "shortDescription": "A familiar essential for your kitchen shelf.",
    "recommendedFor": [
      "Kitchen essentials",
      "lehsan"
    ],
    "mediaScale": 1
  },
  {
    "id": "ginger-powder",
    "slug": "ginger-powder",
    "name": "Ginger Powder",
    "category": "Everyday Spices",
    "image": "/products/ginger-powder.jpg",
    "weight": "125 g",
    "price": 400,
    "tags": [
      "Kitchen essentials",
      "adrak"
    ],
    "featured": false,
    "shortDescription": "A familiar essential for your kitchen shelf.",
    "recommendedFor": [
      "Kitchen essentials",
      "adrak"
    ],
    "mediaScale": 1
  },
  {
    "id": "macaroni-masala-powder",
    "slug": "macaroni-masala-powder",
    "name": "Macaroni Masala Powder",
    "category": "Quick Seasonings",
    "image": "/products/macaroni-masala-powder.jpg",
    "weight": "125 g",
    "price": 300,
    "tags": [
      "Pasta",
      "macaroni",
      "snacks"
    ],
    "featured": false,
    "shortDescription": "For snack breaks with a little more flavour.",
    "recommendedFor": [
      "Pasta",
      "macaroni",
      "snacks"
    ],
    "mediaScale": 1
  },
  {
    "id": "fries-masala",
    "slug": "fries-masala",
    "name": "Fries Masala",
    "category": "Quick Seasonings",
    "image": "/products/fries-masala.jpg",
    "weight": "125 g",
    "price": 250,
    "tags": [
      "Fries",
      "potatoes",
      "snacks"
    ],
    "featured": false,
    "shortDescription": "For snack breaks with a little more flavour.",
    "recommendedFor": [
      "Fries",
      "potatoes",
      "snacks"
    ],
    "mediaScale": 1
  }
];
export const priceLabel=(p:Product)=>p.price===null?"Price on request":`Rs. ${p.price.toLocaleString("en-PK")}`;