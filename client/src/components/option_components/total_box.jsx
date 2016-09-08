var React = require('react')

var TotalBox = React.createClass({




  render: function(){

    return(
      <div className="row" id='total-box'>
        £{this.props.shoppingBasket.totalPrice()}
      </div>
      )}

  })

module.exports = TotalBox;