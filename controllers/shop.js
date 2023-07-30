const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) =>{
   // console.log(products)
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findAll({where: {id:prodId}})

  .then((product) =>{
    if(product.length === 0){
      console.log('product not found')
    }
    else{
    const pro = product[0];
    res.render('shop/product-detail', {
          product: pro,
          pageTitle: pro.title,
          path: '/products'
        });
    }
  })

 
};


exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then((products) =>{
   // console.log(products)
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err))
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postcart = (req,res,next)=> {
  const prodId = req.body.productId;
  console.log(prodId)
  Product.FindById(prodId,product=>{
    console.log(product)
    if (!product) {
      // Handle the case where the product is not found
      return res.status(404).render('404', {
        pageTitle: 'Page Not Found' ,// Replace with your desired page title
        path: req.url 
      });
    }

     Cart.AddProduct(prodId,product.price)
  })
  res.redirect('/cart')
}

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
