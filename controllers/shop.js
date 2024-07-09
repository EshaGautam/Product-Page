const Product = require('../models/product');
const Cart = require('../models/cart')


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((err)=>{console.log(err)})
};

exports.getSingleProduct = (req, res, next) => {
 const prodId = req.params.productId

 Product
 .singleProduct(prodId)
 .then(([products])=>{
  res.render('shop/product-detail',{
    product:products[0],
    pageTitle:products[0].title,
    path:'/products'
  })
 })
 .catch((err)=>{
  console.log(err)
 })

};

exports.addToCart=(req,res,next)=>{
  const prodId = req.body.productId
  console.log(prodId)
  // Product.singleProduct(prodId,(product)=>{
  //    Cart.addProducts(prodId,product.price)
  // })
  // res.redirect('/cart')

  Product.singleProduct(prodId).then(([product])=>{
    Cart.addProducts(prodId,product[0].price)
    res.redirect('/cart')
  })
  .catch(err=>{
    console.log(err)
  })
}



exports.getIndex = (req, res, next) => {
  
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err)=>{console.log(err)})
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
