var ProductManager = require('../models/product_manager.js')
var assert = require('chai').assert
var Product = require('../models/product_manager.js')


describe("Product Manager Test", function(){

  beforeEach(function(){
    productParams1 = {name: "Bag", colour: "Blue", category: "Accessory", price: 20}
    productParams2 = {name: "Shoe", colour: "Black", category: "Foot wear", price: 45}
    //colour spelt color
    invalidParams = {name: "Shoe", color: "Black", category: "Foot wear", price: 45}
    productManager = new ProductManager()
  })

  it('Can add product', function(){
    productManager.addProduct(productParams1)
    assert.equal(1, productManager.products.length)
  })

  it('Cannot add product with invalid params', function(){
    productManager.addProduct(invalidParams)
    assert.equal(0, productManager.products.length)
  })

  it('Can remove product', function(){
    productManager.addProduct(productParams1)
    assert.equal(1, productManager.products.length)

    var product = productManager.products[0]
    productManager.removeProduct(product)
    assert.equal(0, productManager.products.length)
  })

  


})