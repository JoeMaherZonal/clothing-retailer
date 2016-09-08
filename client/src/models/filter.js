var Filter = function(){
  this.filters = [
      {id: "men", selected: false},
      {id: "women", selected: false},
      {id: "casual", selected: false},
      {id: "formal", selected: false},
      {id: "footwear", selected: false}
      ]
}

Filter.prototype = {

  checkForNoFilteres: function(){
    for(var filter of this.filters){
      if(filter.selected){return true}
    }
    return false
  }
}

module.exports = Filter;