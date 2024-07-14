let ArrProducts = [
  {
    id: 1,
    name: "HTML",
    image: "../img/img1.png",
    price: "1000",
    rating: "5"
  },
  {
    id: 2,
    name: "CSS",
    image: "../img/img2.png",
    price: "1000",
    rating: "4"
  },
  {
    id: 3,
    name: "JavaScript",
    image: "../img/img3.png",
    price: "5000",
    rating: "5"
  },
  {
    id: 4,
    name: "Flutter",
    image: "../img/img4.png",
    price: "2000",
    rating: "3"
  },
  {
    id: 5,
    name: "React",
    image: "../img/img5.png",
    price: "6000",
    rating: "5"
  },
  {
    id: 6,
    name: "Angular",
    image: "../img/img6.png",
    price: "5500",
    rating: "5"
  }
]



const { doc } = require("firebase/firestore");
const { imageConfigDefault } = require("next/dist/shared/lib/image-config");

const body = document.querySelector("body");
products = document.querySelector(".products");

function onInIt