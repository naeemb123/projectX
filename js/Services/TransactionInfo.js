app.factory('TransactionInfo',[function(){
  var directionOfTransaction = "";
  var price=0;
  var flavourSelection=[];
  var headpreviouslySelected=null;
  var headSelection=[];
  var headPrice=0;
  var headTotal=price - headPrice;

  var dateTimeSelected = "";
  var orderDate = "";
  var cardHoldersName = "";

  return {
    getOrderPrice: function(){
      if (Array.isArray(price)){
        return price[0];
      }
      else{
        return price;
      }
    },
    setOrderPrice: function(cost){
      price = cost;
    },
    getFlavourSelection: function(){
      return flavourSelection;
    },
    setFlavourSelection: function(selected){
      flavourSelection = selected;
    },
    getHeadSelection: function(){
      return headSelection;
    },
    setHeadSelection: function(head){
      headSelection=head;
    },
    getHeadPrice: function(){
      return headPrice;
    },
    setHeadPrice: function(headPrice_selected){
      headPrice=headPrice_selected;
    },
    getheadTotal: function(){
      return headTotal;
    },
    setHeadTotal: function(totalPrice){
      headTotal = totalPrice;
    },
    getPreviouslySelectedHead: function(){
      return headpreviouslySelected;
    },
    setPreviouslySelectedHead: function(head){
      headpreviouslySelected = head;
    },
    getDirectionOfTransaction: function(){
      return directionOfTransaction;
    },
    setDirectionOfTransaction: function(direction){
      directionOfTransaction = direction;
    },
    getDateTimeSelected: function(){
      return (dateTimeSelected == "") ? null: dateTimeSelected;
    },
    setDateTimeSelected: function(dateTime){
      dateTimeSelected = dateTime
    },
    getCardHoldersName: function(){
      return (cardHoldersName == "") ? null: cardHoldersName;
    },
    setCardHoldersName: function(name){
      cardHoldersName = name;
    },
    getOrderDate: function(){
      return orderDate;
    },
    setOrderDate: function(date){
      orderDate = date;
    }
  }
}]);
