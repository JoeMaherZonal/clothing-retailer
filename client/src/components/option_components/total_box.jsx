var React = require('react')

var TotalBox = React.createClass({

  getSavings: function(){
    var savings = this.props.shoppingBasket.getDiscount()
    if(savings){
      return "You saved £" + savings
    }
    return null
  },

  render: function(){

    var savings = this.getSavings()

    return(
      <div className="row" id='total-box'>
        <p id="basket-total">
        Basket Total £{this.props.shoppingBasket.totalPrice().toFixed(2)}
        </p>
        <p id="savings">
        {savings}
        </p>
      </div>
      )}

  })

module.exports = TotalBox;