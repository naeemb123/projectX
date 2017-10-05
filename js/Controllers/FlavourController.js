app.controller('FlavourController',['$scope','getFlavours','cafeDetails','TransactionInfo',function($scope,getFlavours,cafeDetails,TransactionInfo){
  $scope.total = 25;
  var details = cafeDetails.getCafeDetails();
  standrd_pricing = details.standardPrice.split(":");
  special_price = details.specialPrice;
  //Helper Functions
  var findPrice = function(standardPrice,limitNum,specialPrice){
    if ($scope.selected.length < limitNum && $scope.selected[0].type != "special"){
      $scope.price = standardPrice;
      $scope.totalCost = $scope.price;
    }
    else{
      console.log("Length: " + $scope.selected.length);
      $scope.price = specialPrice + standardPrice;
      $scope.totalCost = $scope.price;
    }
  }

  $scope.price = parseInt(TransactionInfo.getOrderPrice());
  console.log("Price: " + $scope.price);
  $scope.totalCost = $scope.price;
  console.log($scope.totalCost);
  console.log(TransactionInfo.getFlavourSelection());
  $scope.selected = TransactionInfo.getFlavourSelection();
  if ($scope.selected.length != 0){
    findPrice(parseInt(standrd_pricing[0]),parseInt(standrd_pricing[1]),parseInt(standrd_pricing[2]));
  }
  $scope.pageClass = "page-flavour";
  if ($scope.selected.length != 0) $scope.flavourSelected = true;
  console.log("SelectedScope: " + $scope.selected);

  getFlavours.then(function(data){
    $scope.standard_flavours=[];
    $scope.special_flavours=[];
    for(i=0;i<data.length;i++){
      if (data[i].type == 'standard') $scope.standard_flavours.push(data[i]);
      else if(data[i].type == 'special') $scope.special_flavours.push(data[i]);
    }
    // $scope.flavours = data;
    $scope.splitImages_standard = chunk([$scope.standard_flavours],4);
    $scope.splitImages_special = chunk([$scope.special_flavours],4);
  });

  function chunk(arr,size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr[0];
}

$scope.addToSelected_standard = function(flavour){
  if ($scope.selected.length != 0){
    if ($scope.selected[0].type == 'special') alert("You can't mix special flavours with standard flavours");
    else{
      alreadySelected=false;
      for (i=0; i<$scope.selected.length; i++){
        if ($scope.selected[i] == flavour) alreadySelected=true;
      }
      if (!alreadySelected) $scope.selected.push(flavour);
      else{alert("You have already selected this flavour")}
    }
  }else{
    $scope.selected.push(flavour)
  }
  if ($scope.selected.length >= 1) $scope.flavourSelected=true;
  //pricing
  findPrice(parseInt(standrd_pricing[0]),parseInt(standrd_pricing[1]),parseInt(standrd_pricing[2]));
}

$scope.addToSelected_special = function(flavour){
  if ($scope.selected.length != 0 && $scope.selected[0].type == 'special'){
    alert("You can only have one special flavour");
  }else if ($scope.selected.length !=0){
    alert("You can't mix special flavours with standard flavours");
  }
  else{
    $scope.selected.push(flavour);
    $scope.flavourSelected=true;
    $scope.price = special_price;
    $scope.totalCost = parseInt($scope.price);
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

  //for next button
  if ($scope.selected.length < 1) $scope.flavourSelected=false;
}


$scope.flavourSubmitted = function(){
  console.log("TOTOAL COST: " + $scope.totalCost);
  TransactionInfo.setOrderPrice([$scope.totalCost]);
  TransactionInfo.setFlavourSelection($scope.selected);
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
