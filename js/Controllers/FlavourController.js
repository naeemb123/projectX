app.controller('FlavourController',['$scope','$timeout','AlertService','getFlavours','cafeDetails','TransactionInfo',
function($scope,$timeout,AlertService,getFlavours,cafeDetails,TransactionInfo){
  $scope.total = 0;
  $timeout(function(){$scope.total = 25;},650);
  var details = cafeDetails.getCafeDetails();
  standrd_pricing = details.standardPrice.split(":");
  special_price = details.specialPrice;

  //pricing:
  $scope.standard = parseInt(standrd_pricing[0]);
  $scope.limit = parseInt(standrd_pricing[1]);
  $scope.special = parseInt(standrd_pricing[2]);

  $scope.standardTooltipMessage = "Pricing:<br /><br />Upto " +
                  parseInt(standrd_pricing[1]) +
                  " standard flavours cost £" +
                  parseInt(standrd_pricing[0]) +
                  ".<br />" +
                  "Selecting more than " +
                  parseInt(standrd_pricing[1]) +
                  " flavours incurs an extra £" +
                  parseInt(standrd_pricing[2]) +
                  " charge.";

  //Helper Functions =================================================================================

  var findPrice = function(standardPrice,limitNum,specialPrice){
    if ($scope.selected.length < limitNum && $scope.selected[0].type != "special"){
      $scope.price = standardPrice;
      $scope.totalCost = $scope.price;
    }
    else{
      $scope.price = specialPrice + standardPrice;
      $scope.totalCost = $scope.price;
    }
  }

  var updateTransactionService = function(){
    TransactionInfo.setOrderPrice([parseInt($scope.totalCost)]);
    TransactionInfo.setFlavourPrice(parseInt($scope.price));
    TransactionInfo.setFlavourSelection($scope.selected);
    TransactionInfo.setHeadPrice(0); //If User went back to change flavours then price of head should be reset
  }

//===================================================================================================

  $scope.price = parseInt(TransactionInfo.getOrderPrice());
  $scope.totalCost = $scope.price;
  $scope.selected = TransactionInfo.getFlavourSelection();
  if ($scope.selected.length != 0){
    findPrice(parseInt(standrd_pricing[0]),parseInt(standrd_pricing[1]),parseInt(standrd_pricing[2]));
  }
  $scope.pageClass = "page-flavour";
  if ($scope.selected.length != 0) $scope.flavourSelected = true;


  getFlavours.then(function(data){
    $scope.standard_flavours=[];
    $scope.special_flavours=[];
    $scope.categories = data[data.length-1].Categories;
    console.log($scope.categories);
    for(i=0;i<data.length;i++){
      if (data[i].type == 'standard') $scope.standard_flavours.push(data[i]);
      else if(data[i].type == 'special') $scope.special_flavours.push(data[i]);
    }
    // $scope.flavours = data;
    $scope.splitImages_standard = chunk([$scope.standard_flavours],4);
    $scope.splitImages_special = chunk([$scope.special_flavours],4);
    $scope.ready = true;
  });

  function chunk(arr,size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr[0];
}

$scope.addToSelected = function(flavour,ev){
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
      else{AlertService.showAlert(ev,"You have already selected this flavour","Woops!")}
    }
  }else{
    $scope.selected.push(flavour)
    TransactionInfo.setFlavourSelection($scope.selected);//update Transaction service
  }
  if ($scope.selected.length >= 1) $scope.flavourSelected=true;
  //pricing
  findPrice(parseInt(standrd_pricing[0]),parseInt(standrd_pricing[1]),parseInt(standrd_pricing[2]));
  updateTransactionService();
}

$scope.addToSelected_unique = function(flavour,ev){
  if ($scope.selected.length != 0 && $scope.selected[0].type == 'special'){
    AlertService.showAlert(ev,"You can only have one special flavour","Woops!");
  }else if ($scope.selected.length !=0){
    AlertService.showAlert(ev,"You can't mix special flavours with standard flavours","Woops!");
  }
  else{
    $scope.selected.push(flavour);
    $scope.flavourSelected=true;
    $scope.price = special_price;
    $scope.totalCost = parseInt($scope.price);

    updateTransactionService();
  }
}

$scope.removeFromSelected = function(index){
  $scope.selected.splice(index,1);
  if ($scope.selected.length == 0){
    $scope.price = 0;
    $scope.totalCost = TransactionInfo.getOrderPrice();
  }
  else if ($scope.selected.length < parseInt(standrd_pricing[1])){
    $scope.price = standrd_pricing[0];
    $scope.totalCost = parseInt($scope.price);
  }
  updateTransactionService();
  //for next button
  if ($scope.selected.length < 1) $scope.flavourSelected=false;
}


$scope.flavourSubmitted = function(){
  updateTransactionService();
  TransactionInfo.setDirectionOfTransaction("submit")
}

$scope.changeColourOfGf = function(){
  $scope.colourChange = "gfHover";
}

$scope.changeColourOf_backButton = function(){
  $scope.colourChange_backButton = "backButton_hover";
}

$scope.direction = function(){
  TransactionInfo.setDirectionOfTransaction("back");
}


}]);
