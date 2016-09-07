var _ = require('lodash')

var ShoppingBasket = function(){
  this.items = [],
  this.voucher = null
}

ShoppingBasket.prototype = {

  addItem: function(product){
    this.items.push(product)
  },

  removeItem: function(product){
    if(this.items.length === 0){return}
    var index = this.items.indexOf(product)
    this.items.splice(index, 1)
  },

  emptyBasket: function(){
    this.items = []
  },

  totalPrice: function(){
    var total = 0;
    for(item of this.items){
      total += item.price
    }
    return total
  },

  hasItemOfCategory: function(category){
    var results = this.items.filter(function(item){
      return item.category === category 
    })
    return results.length > 0
  },

  addDiscountVoucher: function(voucher){
    if(this.voucher === null){
      this.voucher = voucher
      return
    }
    if(voucher.calculateDiscount(this) > this.voucher.calculateDiscount(this)){
      this.voucher = voucher
    }
  },

  getVoucherDiscount: function(shoppingBasket){
    if(this.voucher === null || this.items.length === 0){return 0}
    return this.voucher.calculateDiscount(shoppingBasket)
  }
}

module.exports = ShoppingBasket;