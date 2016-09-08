var React = require('react')

var BasketItem = React.createClass({

  handleClick: function(){
    this.props.removeItemFromBasket(this.props.item)
  },

  render: function(){
    return(
      <div className="row" id='basket-item'>
        <div className="col-10">
          {this.props.item.name}
        </div>
        <div className="col-2">
          <button onClick={this.handleClick}>X</button>
        </div>
      </div>
      )}

  })

module.exports = BasketItem;