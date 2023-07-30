
const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title:title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then((result) =>{
    console.log(result)
  //  res.redirect('/');
  })
  .catch(err => console.log(err))
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((products) => {
    res.render('admin/product', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products',
          editing: false
        });
  })
  .catch(err => console.log(err))
  
   
};

exports.geteditproduct = (req, res, next) => {
  const prodId = req.params.productId;
  const editing = req.query.edit;
  if (editing) {
    Product.findAll({where:{id:prodId}})
    .then((product) =>{
      if(product.length ===0){
        console.log('product not found')
      }else{
          const pro = product[0]
          res.render('admin/edit-product', {
                pageTitle: pro.title,
                path: '/admin/edit-product',
                editing: editing,
                product:pro
              });
      }
    })
    .catch(err => console.log(err))
  }
}


  exports.posteditproduct = (req,res,next) =>{
    const updatedprodId = req.body.productId
    const updatedtitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedprice = req.body.price;
    const updateddescription = req.body.description;
    Product.findAll({where:{id:updatedprodId}})
    .then((product) =>{
       if(product.length===0){
        console.log('product not found')
       }
       const pro = product[0]
       pro.title = updatedtitle;
       pro.imageUrl = updatedimageUrl;
       pro.price = updatedprice;
       pro.description = updateddescription
       pro.save()
       .then((result)=>{
        console.log(result)
       })
       .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }

  exports.deleteproduct = (req,res,next)=>{
    const prodId = req.body.productId;
     Product.findAll({where:{id:prodId}})
     .then((product) =>{
      if(product.length ===0){
        console.log('no product to delete')
      }
      const pro = product[0]
      return pro.destroy()
     }).then((result)=>{
      console.log('destroyed product')
      res.redirect('/admin/products')
     })
     .catch(err => console.log(err))
  
    
  }

