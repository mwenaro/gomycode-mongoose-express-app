//variables
const productContainer = document.querySelector(".product-container");
productContainer.className = 'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 p-4'
const copyRightYear = document.querySelector("#copyright-year");
const BASE_URL = "http://localhost:5000";
let products = [];
//fetch

const useFetch = async (url) => {
  try {
const validUrl = url.includes('http') ? url : BASE_URL + url
    const res = await fetch(validUrl)
    if (!res.ok) throw Error(`${res.statusText}(${res.status})`)
    return await res.json()

  } catch (error) {
    console.error(error)
  }

};

//create grid
function LoadProducts() {
  products.forEach((prod) => {
    //crerate product div
    const prodcutDiv = document.createElement("div");
    prodcutDiv.className = "p-2 md:p-4 rounded-lg bg-white text-black flex flex-col gap-2"
    //add content
    prodcutDiv.innerHTML = `
<div class="h-5/6 flex items-center justify-center overflow-hidden">
        <img src="${prod.image}" alt="${prod.title}" class="h-full w-auto " >
</div>
<div class ="bg-slate-100 flex-grow flex flex-col gap-2 text-xl">
<h3>Name : ${prod.title}</h3>
<h3>Price : ${prod.price}</h3>

</div>

`;
    //add prodDic into container
    productContainer.appendChild(prodcutDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
 
  //run it here
  // await getProducts();
  if (!products.length) {
   products =  await useFetch('/products')
  }

  const users = await useFetch('/users')

  console.log(await useFetch('https://jsonplaceholder.typicode.com/comments'))
  console.log({users})
  LoadProducts()

});
