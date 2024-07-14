let ArrProducts = [
  {
    id: 1,
    name: "HTML",
    image: "../img/Img1.png",
    price: "1000",
    rating: "5"
  }
]



const { doc } = require("firebase/firestore");
const { imageConfigDefault } = require("next/dist/shared/lib/image-config");

const body = document.querySelector("body");
products = document.querySelector(".products");

function onInIt