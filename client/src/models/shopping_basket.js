var _ = require('lodash')

var ShoppingBasket = function(){
  this.items = [],
  this.voucher = null
}

ShoppingBasket.prototype = {

  addItem: function(product){
    if(product.quantity > 0){
      this.items.push(product)
    }
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
    if(this.isVoucherValid()){
      return this.totalOfItems() - this.getVoucherDiscount()
    }
    return this.totalOfItems()
  },

  totalOfItems: function(){
    var total = 0;
    for(var item of this.items){
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
    this.voucher = voucher
    // if(this.voucher === null){
    //   this.voucher = voucher
    //   return
    // }
    // if(voucher.calculateDiscount(this.items) > this.voucher.calculateDiscount(this.items)){
    //   this.voucher = voucher
    // }
  },

  clearVoucher: function(){
    this.voucher = null;
  },

  getVoucherDiscount: function(){
    if(this.voucher === null || this.items.length === 0){return 0}
    return this.voucher.calculateDiscount(this.items)
  },

  isVoucherValid: function(){
    return this.getVoucherDiscount() != 0
  },

  createFilters: function(){
    var filters = []
    for(item of this.items){
      filters.push({id: item, selected: false})
    }
    return filters
  }
}

module.exports = ShoppingBasket;