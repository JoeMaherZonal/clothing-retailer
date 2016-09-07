var React = require('react')
var ProductList = require('./product_list')

var ProductBox = React.createClass({

  handleClick: function(){

  },

  render: function(){
    return(
        <div className="row" id='product-box'>

        <div className="row">
          <img id="product-image" src="images/shirticon.png"/>
        </div>

        <div className="row">
          <button onClick={this.handleClick} id="product-button">Add</button>
        </div>

          {this.props.product.name}
      </div>
      )}

  })

module.exports = ProductBox;