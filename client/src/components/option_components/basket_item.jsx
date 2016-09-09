var React = require('react')

var BasketItem = React.createClass({

  handleClick: function(){
    this.props.removeItemFromBasket(this.props.item)
  },

  render: function(){
    return(
      <div className="row" id='basket-item'>
        <div className="col-10" id="basket-item-nodes">
          <p className="basket-node" id="basket-item-name">{this.props.item.name}</p>
          <p className="basket-node" id="basket-item-colour">{this.props.item.colour}</p>
          <p className="basket-node" id="basket-item-cat">{this.props.item.categorys}</p>
        </div>

        <div className="col-1">
          <p className="basket-node" id="basket-item-price">£{this.props.item.getPrice()}</p>
        </div>

        <div className="col-1">
          <button className="exitButton" onClick={this.handleClick}>X</button>
        </div>
      </div>
      )}

  })

module.exports = BasketItem;