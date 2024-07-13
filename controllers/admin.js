const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
 req.user.createProduct({
  title:title,
  imageURL:imageURL,
  price:price,
  description:description,
})
  .then((result)=>{
    console.log(result)
    res.redirect('/')
})
  .catch((err)=>console.log(err))

};

exports.addEditProduct=(req,res,next)=>{
  const editMode = req.query.edit
  if(!editMode){
     return res.redirect('/')
  }
  const prodId = req.params.productId
  req.user.getProducts({where:{id:prodId}})
  // Product.findByPk(prodId)
  .then((products)=>{
    const product = products[0]
    if(!products){
      return res.redirect('/')
    }
  
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product:product
    });
  })
 
 
}

exports.getProducts = (req, res, next) => {
Product.findAll().then((products)=>{
  res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
})
.catch((err)=>{
  console.log(err)
})
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImg = req.body.imageURL;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findByPk(+prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/admin/products');
      }
      product.title = updatedTitle;
      product.imageURL = updatedImg;
      product.description = updatedDescription;
      product.price = updatedPrice;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};





exports.deleteProductFromAdmin = (req,res,next)=>{
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product=>{
    return product.destroy();
  })
  .then(()=>{
    console.log('Product Deleted Successfully')
    res.redirect('/products');
  })
  .catch(err=>{
    console.log(err)
  })

  
}

