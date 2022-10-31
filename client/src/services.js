export const getProducts =  () => {
   
  return  fetch('/products').then((response)=> response.json());  
}

export const addProduct =  (product) => {
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
};

  const response =  fetch('/products', options);
  return  response.json(); 
}

export const deleteProduct =  (id) => {
  let options = {
    method: 'DELETE'
};
  const response =  fetch(`/products/${id}`, options);
  return  response.json();
}

//  // GET all Products
//  async function getProducts() {
//     try {
//         let response = await fetch('/products');  // does GET by default

//         if (response.ok) {
//             let products = await response.json();
//             return products;
//             // setProducts(products);
//             // let activeSales = products.filter( p => p.sales_price > 0)
//             // setActiveSales(activeSales);
//             // console.log(activeSales);
//             // console.log(`Server error: ${response.status} ${response.statusText}`);
//         }
//     } catch (err) {
//         console.log(`Server error: ${err.message}`);
//     }
// }


// // POST a new product
// async function addProduct(product) {
//     // Define fetch() options
//     let options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(product)
//     };

//     try {
//         let response = await fetch('/products', options);  // do POST
//         if (response.ok) {
//             let products = await response.json();
//             setProducts(products);
//         } else {
//             console.log(`Server error: ${response.status} ${response.statusText}`);
//         }
//     } catch (err) {
//         console.log(`Server error: ${err.message}`);
//     }
// }


// // DELETE a product
// async function deleteProduct(id) {
//     // Define fetch() options
//     let options = {
//         method: 'DELETE'
//     };

//     try {
//         let response = await fetch(`/products/${id}`, options);  // do DELETE
//         if (response.ok) {
//             let products = await response.json();
//             setProducts(products);
//         } else {
//             console.log(`Server error: ${response.status} ${response.statusText}`);
//         }
//     } catch (err) {
//         console.log(`Server error: ${err.message}`);
//     }
// }
