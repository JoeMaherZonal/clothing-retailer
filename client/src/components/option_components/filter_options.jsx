var React = require('react')

var FilterOptions = React.createClass({


  handleCheckboxClick: function(event){
    this.props.updateFilter(event.target)
  },

  render: function(){
    return(
      <div className="row" id='filter-options-container'>

        <div className="row">
          <input onChange={this.handleCheckboxClick} type="checkbox" name="mens" id="men"/>Men's
          <input onChange={this.handleCheckboxClick} type="checkbox" name="womens" id="women"/>Women's
        </div>

        <div className="row">
        <input onChange={this.handleCheckboxClick} type="checkbox" name="footwear" id="footwear"/>Shoes
        <input onChange={this.handleCheckboxClick} type="checkbox" name="casualwear" id="casual"/>Casual wear
        <input onChange={this.handleCheckboxClick} type="checkbox" name="formalwear" id="formal"/>Formal wear
        </div>

      </div>
      )}

  })

module.exports = FilterOptions;