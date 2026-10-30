import blackMain from "@/assets/thobe-black-main.jpg";
import blackDetail from "@/assets/thobe-black-detail.jpg";
import blackCollar from "@/assets/thobe-black-collar.jpg";
import blackWudhu from "@/assets/thobe-black-wudhu.jpg";
import blackPocket from "@/assets/thobe-black-pocket.jpg";
import stoneMain from "@/assets/thobe-stone-main.jpg";
import stoneFront from "@/assets/thobe-stone-front.jpg";
import stonePocket from "@/assets/thobe-stone-pocket.jpg";
import stoneWudhu from "@/assets/thobe-stone-wudhu.jpg";
import type { Product } from "@/contexts/CartContext";

export const products: Product[] = [
  {
    id: 1,
    name: "The Black Thobe",
    description: "Crafted to command, half-zip collar, clean lines",
    price: "6,500 PKR",
    priceNum: 6500,
    image: blackMain,
    images: [blackMain, blackDetail, blackCollar, blackWudhu, blackPocket],
    fabric:
      "Deep charcoal-black performance weave with a half-zip mandarin collar. Wudhu-friendly zip sleeves and secure side zip pockets, function meets form.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "The Stone Thobe",
    description: "Detail in every stitch, stone. steady. yours.",
    price: "6,500 PKR",
    priceNum: 6500,
    image: stoneMain,
    images: [stoneMain, stoneFront, stoneWudhu, stonePocket],
    fabric:
      "Warm stone-toned fabric with contrast black trim. Half-zip placket, wudhu-friendly sleeve zips and styled storage pockets designed to carry more.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];
