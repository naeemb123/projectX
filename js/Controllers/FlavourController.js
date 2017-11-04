app.controller('FlavourController',['$scope','$timeout','AlertService','getFlavours','cafeDetails','TransactionInfo',
function($scope,$timeout,AlertService,getFlavours,cafeDetails,TransactionInfo){

  // $scope.standardTooltipMessage = "Pricing:<br /><br />Upto " +
  //                 parseInt(standrd_pricing[1]) +
  //                 " standard flavours cost £" +
  //                 parseInt(standrd_pricing[0]) +
  //                 ".<br />" +
  //                 "Selecting more than " +
  //                 parseInt(standrd_pricing[1]) +
  //                 " flavours incurs an extra £" +
  //                 parseInt(standrd_pricing[2]) +
  //                 " charge.";
//Helper Functions =================================================================================

var init = function(){
  $scope.pageClass = "page-flavour";
  $scope.total = 0;
  $timeout(function(){$scope.total = 25;},650);

  $scope.price = parseInt(TransactionInfo.getOrderPrice());
  $scope.totalCost = $scope.price;
  $scope.selected = TransactionInfo.getFlavourSelection();
  initPricing();
  if ($scope.selected.length != 0) $scope.flavourSelected = true;

};

var initPricing = function(){
  var details = cafeDetails.getCafeDetails();
  standrd_pricing = details.standardPrice.split(":");
  if ($scope.selected.length != 0)
    setCurrentPriceAndTotalCost(parseInt(standrd_pricing[0]),parseInt(standrd_pricing[1]),parseInt(standrd_pricing[2]));
  //pricing:
  $scope.standard = parseInt(standrd_pricing[0]);
  $scope.limit = parseInt(standrd_pricing[1]);
  $scope.special = parseInt(standrd_pricing[2]);
};

  var setCurrentPriceAndTotalCost = function(standardPrice,limitNum,specialPrice){
    if ($scope.selected.length < limitNum && $scope.selected[0].type != "special"){
      $scope.price = standardPrice;
      $scope.totalCost = $scope.price;
    }
    else{
      $scope.price = specialPrice + standardPrice;
      $scope.totalCost = $scope.price;
    }
  };

  var updateTransactionService = function(){
    TransactionInfo.setOrderPrice([parseInt($scope.totalCost)]);
    TransactionInfo.setFlavourPrice(parseInt($scope.price));
    TransactionInfo.setFlavourSelection($scope.selected);
    TransactionInfo.setHeadPrice(0); //If User went back to change flavours then price of head should be reset
  };

  function chunk(arr,size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr[0];
}

  var loadflavourData = function(data){
    $scope.arrayData = [];
    data.forEach(d => {
      var key = Object.keys(d)[0];
      console.log(key);
      if (key == 'standard') $scope.standard_flavours = chunk([d[Object.keys(d)[0]]],4);
      else{
        $scope.arrayData.push({'list': chunk([d[Object.keys(d)[0]]],4),'name':Object.keys(d)[0]});
      }
    });
  };

  var nonStandardFlavourSelected = function(flavour,ev){
    if ($scope.selected.length != 0 && $scope.selected[0].type == 'special'){
      AlertService.showAlert(ev,"You can only have one " + flavour.type + " flavour","Woops!");
    }else if ($scope.selected.length !=0){
      AlertService.showAlert(ev,"You can't mix " +  flavour.type + " flavours with standard flavours","Woops!");
    }
    else{
      $scope.selected.push(flavour);
      $scope.flavourSelected=true;
      $scope.price = flavour.price;
      $scope.totalCost = parseInt($scope.price);
      updateTransactionService();
    }
  };

  var standardFlavourSelected = function(flavour,ev){
    if ($scope.selected.length != 0){
      if ($scope.selected[0].type == 'special') AlertService.showAlert(ev,"You can't mix special flavours with standard flavours","Woops!");
      else{
        alreadySelected=false;
        for (i=0; i<$scope.selected.length; i++){
          if ($scope.selected[i] == flavour) alreadySelected=true;
        }
        if (!alreadySelected) {
          $scope.selected.push(flavour);
        }
        else{AlertService.showAlert(ev,"You have already selected this flavour","Woops!");}
      }
    }else{
      $scope.selected.push(flavour);
      TransactionInfo.setFlavourSelection($scope.selected);//update Transaction service
    }
  };

  var removeFlavourFromSelection = function(index){
    // var flavourPrice = parseInt($scope.selected[index].price); // use when pricing is fixed
    var flavourPrice;
    if ($scope.selected[index].type == 'standard') flavourPrice = $scope.standard;
    else{
      flavourPrice = $scope.standard + $scope.special;
    }
    $scope.selected.splice(index,1);
    if ($scope.selected.length == 0){
      $scope.price = 0;
      $scope.totalCost = TransactionInfo.getOrderPrice() - flavourPrice ;
    }
    else if ($scope.selected.length < parseInt(standrd_pricing[1])){
      $scope.price = standrd_pricing[0];
      $scope.totalCost = parseInt($scope.price);
    }
    updateTransactionService();
    //for next button
    if ($scope.selected.length < 1) $scope.flavourSelected=false;
  };

  //===================================================================================================

  init();

  getFlavours.then(function(data){
    loadflavourData(data);
  });

  $scope.addToSelected = function(flavour,ev){
    if (flavour.type == 'special')
      nonStandardFlavourSelected(flavour,ev);
    else{
      standardFlavourSelected(flavour,ev);
    }
    if ($scope.selected.length >= 1) $scope.flavourSelected=true;
    setCurrentPriceAndTotalCost(parseInt(standrd_pricing[0]),parseInt(standrd_pricing[1]),parseInt(standrd_pricing[2]));
    updateTransactionService();
  };

  $scope.removeFromSelected = function(index){
    removeFlavourFromSelection(index);
  };


  $scope.flavourSubmitted = function(){
    updateTransactionService();
    TransactionInfo.setDirectionOfTransaction("submit");
  };

  $scope.changeColourOfGf = function(){
    $scope.colourChange = "gfHover";
  };

  $scope.changeColourOf_backButton = function(){
    $scope.colourChange_backButton = "backButton_hover";
  };

  $scope.direction = function(){
    TransactionInfo.setDirectionOfTransaction("back");
};


}]);
