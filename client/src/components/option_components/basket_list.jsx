var React = require('react')
var BasketItem = require('./basket_item')

var BasketList = React.createClass({

  render: function(){
    var shoppingNodes = this.props.shoppingItems.map(function(item, index){
      return (
        <BasketItem removeItemFromBasket={this.props.removeItemFromBasket} key={index} item={item}/>
        )
    }.bind(this))

    return(
      <div className="row" id='basket-list'>
        {shoppingNodes}
      </div>
      )}

  })

module.exports = BasketList;