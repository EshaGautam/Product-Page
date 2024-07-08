const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProducts(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };

    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(p => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  static deleteProduct(id,productPrice){
   
    fs.readFile(p,(err,fileContent)=>{
      let cart = JSON.parse(fileContent)
      if(err){
        return 
      }
      let updatedCart = {...cart}
      let productToDelete = updatedCart.products.find(product=>product.id === id)
      let productToDeleteQty = productToDelete.qty
      updatedCart.products  =  updatedCart.products.filter(p=>p.id===id)
      updatedCart.totalPrice = updatedCart.totalPrice - productToDeleteQty * productPrice
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    })


  }
};
