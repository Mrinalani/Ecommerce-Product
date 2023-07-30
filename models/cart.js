// const fs = require('fs');
// const path = require('path')

// const p = path.join(
//     path.dirname(process.mainModule.filename),
//     'data',
//     'cart.json'
//   );

// module.exports = class cart{
//     static Addproduct(id, productprice){
//        fs.readFile(p,(err,filecontent)=>{
//         let cart = {product: [], totalprice: 0};

//          if(!err){
//             cart = JSON.parse(filecontent)
//          }
//          const existingproductIndex =  cart.product.findIndex(p => p===id);
//          const existingproduct = cart[existingproductIndex];

//          let updatedproduct;
//          if(existingproduct){
//             updatedproduct = {...existingproduct};
//             updatedproduct.qty = updatedproduct.qty+1;
//             cart.product = {...cart.product};
//             cart.product[existingproductIndex] = updatedproduct;
//          }
//          else{
//             updatedproduct = {id:id, qty:1};
//             cart.product = {...cart.product, updatedproduct}
//          }
//          cart.totalprice = cart.totalprice+productprice;
//          fs.writeFile(p, JSON.stringify(cart),err=>{
//             console.log(err)
//          })
//        }) 
//     } 
// }

// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart {
//   static Addproduct(id, productprice) {
//     fs.readFile(p, (err, filecontent) => {
//       let cart = { product: [], totalprice: 0 };

//       if (!err) {
//         cart = JSON.parse(filecontent);
//       }

//       const existingProductIndex = cart.product.findIndex(p => p.id === id);
//       const existingProduct = cart.product[existingProductIndex];

//       if (existingProduct) {
//         existingProduct.qty += 1;
//       } else {
//         cart.product.push({ id: id, qty: 1 });
//       }

//       cart.totalprice = cart.totalprice + productprice;

//       fs.writeFile(p, JSON.stringify(cart), err => {
//         if (err) {
//           console.log(err);
//         }
//       });
//     });
//   }
// };


// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'cart.json'
// );

// module.exports = class Cart{
//     static AddProduct(id,productPrice){
//        fs.readFile(p,(err,fileContent)=>{
//          //let cart = {product:[],totalprice:0}
//          let cart = { product: [], totalprice: 0 };
//          if(!err){
//             cart = JSON.parse(fileContent)
//          }
//          const existingproductindex = cart.product.findIndex(prod => prod.id===id)
//          const existingproduct = cart.product[existingproductindex];
          
//          let updatedproduct;
//          if(existingproduct){
//             updatedproduct = {...existingproduct}
//             updatedproduct.qty = updatedproduct.qty+1;
//             cart.product = {...cart.product};
//             cart.product[existingproductindex] = updatedproduct
//          }
//         // else{
//         //    updatedproduct = {id:id,qty:1}
//         //    cart.product = {...cart.product, updatedproduct}
//         // }
//         else {
//             updatedproduct = { id: id, qty: 1 };
//             cart.product.push(updatedproduct);
//           }
          
//          cart.totalprice = cart.totalprice+ +productPrice;
//          fs.writeFile(p,JSON.stringify(cart),err=>{
//             console.log(err)
//          })
//        }) 
//     }
// }

const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static AddProduct(id, productPrice) {
    fs.readFile(p, 'utf8', (err, fileContent) => {
      let cart = { products: [], totalprice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      console.log('fileContent:', fileContent);
      console.log('cart before update:', cart);

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].qty += 1;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalprice = cart.totalprice + +productPrice;

      console.log('cart.products after update:', cart.products);

      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deletecart(id,productprice) {
    fs.readFile(p,(err,filecontent)=>{
      if(err){
        return;
      }
      const updatedcart = {...JSON.parse(filecontent)}
      const deleteproduct = updatedcart.products.find(p => p.id===id)

      if (!deleteproduct) {
        console.log(`Product with ID ${id} not found in the cart.`);
        return;
      }
      const deleteproductqty = deleteproduct.qty;

      updatedcart.products = updatedcart.products.filter(p => p.id !== id)
      updatedcart.totalprice = updatedcart.totalprice - productprice*deleteproductqty;

      fs.writeFile(p,JSON.stringify(updatedcart), err => {
        console.log(err)
      })
    })
  }
};
