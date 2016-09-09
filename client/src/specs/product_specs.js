var Product = require('../models/product.js')
var assert = require('chai').assert


describe("Product Tests", function(){

  beforeEach(function(){
    product1 = new Product({name: "Bag", colour: "Blue", category: "Accessory", price: 20})
  })

  it('Product has correct name', function(){
    assert.equal("Bag", product1.name)
  })

  it('Product has correct colour', function(){
    assert.equal("Blue", product1.colour)
  })

  it('Product has correct category', function(){
    assert.equal("Accessory", product1.categorys)
  })

  it('Product has correct price', function(){
    assert.equal(20, product1.price)
  })

})