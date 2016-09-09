var DiscountVoucher = require('../models/discount_voucher')
var assert = require('chai').assert
var ProductManager = require('../models/product_manager')
var ShoppingBasket = require('../models/shopping_basket')
var _ = require('lodash')


describe("Discount Voucher Specs", function(){

  beforeEach(function(){
    productParams1 = {name: "Bag", colour: "Blue", category: "Accessory", price: 20, quantity: 1, discount: 0}
    productParams2 = {name: "Blue Shoe", colour: "Blue", category: "Men's Footwear", price: 60, quantity: 1, discount: 0}
    productManager = new ProductManager()
    shoppingBasket = new ShoppingBasket()
    productManager.addProduct(productParams1)
    productManager.addProduct(productParams2)
    product = productManager.products[0]
    product2 = productManager.products[1]

    discountVoucher1 = new DiscountVoucher("5OFF", function(items){
      var totalSpend = _.sumBy(items, function(product) { return product.price; })
      if(totalSpend > 5){
        return 5
      }
      return 0
    }, "£5 off any order")
    discountVoucher2 = new DiscountVoucher("10OFF", function(items){
      var totalSpend = _.sumBy(items, function(o) { return o.price; })
      if(totalSpend > 50){
        return 10;
      }else{
        return 0;
      }
    }, "£10 off when you spend £50")
    discountVoucher3 = new DiscountVoucher("15OFF", function(items){
      var totalSpend = _.sumBy(items, function(product) { return product.price; })
      var hasItemWithCategory = false
      for(var item of items){
          var catArray = item.categorys.split(/(\s)/)
          if(catArray[2] === "Footwear"){
            hasItemWithCategory = true
          }
      }
      if(totalSpend > 75 && hasItemWithCategory){
        return 15;
      }else{
        //invalid
        return 0;
      }
    }, "£15 off when you buy footwear and spend £75")
  })

  it('Can apply £5 off any order', function(){
    shoppingBasket.addItem(product)
    assert.equal(5, discountVoucher1.calculateDiscount(shoppingBasket.items))
  })

  it('Cannot go to a minus total with no items in basket', function(){
    assert.equal(0, discountVoucher1.calculateDiscount(shoppingBasket.items))
  })

  it('Can apply £10 off any order', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product2)
    assert.equal(10, discountVoucher2.calculateDiscount(shoppingBasket.items))
  })

  it('Cannot not apply £10 voucher when spent under £50', function(){
    shoppingBasket.addItem(product)
    assert.equal(0, discountVoucher2.calculateDiscount(shoppingBasket.items))
  })

  it('Can apply £15 off valid order', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product2)
    assert.equal(15, discountVoucher3.calculateDiscount(shoppingBasket.items))
  })

  it('Cannot get £15 off without shoes', function(){
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product)
    shoppingBasket.addItem(product)
    assert.equal(0, discountVoucher3.calculateDiscount(shoppingBasket.items))
  })

})