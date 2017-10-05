app.controller('HeadsController',['$scope','$timeout','getHeads','TransactionInfo',function($scope,$timeout,getHeads,TransactionInfo){
  $scope.total = 50;
  $scope.pageClass = "page-default";
  $scope.noExtras = true;
  $scope.headSelected = false;
  $scope.price = TransactionInfo.getHeadPrice();
  console.log(TransactionInfo.getHeadPrice());
  console.log(TransactionInfo.getOrderPrice());

  console.log(TransactionInfo.getDirectionOfTransaction());
  console.log(TransactionInfo.getDirectionOfTransaction() == "submit");
  if (TransactionInfo.getDirectionOfTransaction() == "submit"){
      $scope.totalCost = TransactionInfo.getOrderPrice() + $scope.price;
  }else if(TransactionInfo.getDirectionOfTransaction() == "back"){$scope.totalCost = TransactionInfo.getheadTotal();}
  console.log($scope.totalCost);
  $scope.selected=TransactionInfo.getHeadSelection();
  if ($scope.selected.length !=0){
    $scope.headSelected=true;
    console.log("Price: "+$scope.price);
    console.log($scope.selected);
    for (var itemIndex in $scope.selected) {$scope.price += parseInt($scope.selected[itemIndex].price);}
    console.log("Price: "+$scope.price);
    $scope.totalCost += $scope.price;
  }

  getHeads.heads().then(function(data){
      $scope.heads = data;
  });
  getHeads.extras().then(function(data){
    $scope.extras = data;
    $scope.noExtras = false;
  });

  var headpreviouslySelected = TransactionInfo.getPreviouslySelectedHead();
  $scope.addToSelected = function(head){
    if ($scope.headSelected){
      for(i=0;i<$scope.selected.length;i++) if($scope.selected[i] == headpreviouslySelected) $scope.selected.splice(i,1);
      $scope.price -= parseInt(headpreviouslySelected.price);
      $scope.totalCost -= parseInt(headpreviouslySelected.price);
      $timeout(function(){$scope.selected.push(head);},500);
    }else{$scope.selected.push(head)}
    $scope.price += parseInt(head.price);
    $scope.totalCost += parseInt(head.price);
    $scope.headSelected = true;
    headpreviouslySelected = head;
    TransactionInfo.setPreviouslySelectedHead(headpreviouslySelected);
  }

  $scope.addToSelected_extra = function(extra){
    var alreadyExists = false;
    for(i=0;i<$scope.selected.length;i++) if ($scope.selected[i] == extra) alreadyExists=true;
    if (alreadyExists) alert("Item already selected!");
    else{
      $scope.selected.push(extra);
      $scope.price += parseInt(extra.price);
      $scope.totalCost +=  parseInt(extra.price);
    }
  }

  $scope.removeFromSelected = function(index){
    console.log(index);
    console.log($scope.selected[index]);
    var is_inExtras=false;
    $scope.price -= parseInt($scope.selected[index].price);
    console.log($scope.totalCost - parseInt($scope.selected[index].price));
    $scope.totalCost -= parseInt($scope.selected[index].price);
    if ($scope.selected[index] == headpreviouslySelected){
      $scope.headSelected = false;
      $scope.selected.splice(index,1);
      alert("Please choose a head type to continue");
    }
    else{$scope.selected.splice(index,1);}
  }

  $scope.flavourSubmitted = function(){
    TransactionInfo.setOrderPrice($scope.totalCost);
    TransactionInfo.setHeadSelection($scope.selected);
    TransactionInfo.setHeadTotal($scope.totalCost - $scope.price);
    TransactionInfo.setDirectionOfTransaction("submit");
  }

  $scope.changeColourOfGf = function(){
    $scope.colourChange = "gfHover";
    // $scope.pageClass = "page-default-back";
  }

  $scope.changeColourOf_backButton = function(){
    $scope.colourChange_backButton = "backButton_hover";
  }

  $scope.direction = function(){
    TransactionInfo.setDirectionOfTransaction("back");
  }


}]);
