var React = require('react')
var BasketItem = require('./basket_item')
var VoucherItem = require('./voucher_item')

var BasketList = React.createClass({

  buildBasketNodes: function(){
    var shoppingNodes = this.props.shoppingBasket.items.map(function(item, index){
      return (
        <BasketItem removeItemFromBasket={this.props.removeItemFromBasket} key={index} item={item}/>
        )
    }.bind(this))
    shoppingNodes = this.addVoucherNodes(shoppingNodes)
    return shoppingNodes
  },

  addVoucherNodes: function(shoppingNodes){
    if(this.props.shoppingBasket.voucher){
      shoppingNodes.push(
        <VoucherItem removeItemFromBasket={this.props.removeItemFromBasket} voucher={this.props.shoppingBasket.voucher} key={shoppingNodes.length}/>
        )
      return shoppingNodes
    }
    return shoppingNodes
  },

  render: function(){
    var shoppingNodes = this.buildBasketNodes()

    return(
      <div className="row" id='basket-list'>
        {shoppingNodes}
      </div>
      )}

  })

module.exports = BasketList;