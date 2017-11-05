app.controller('HeadsController',['$scope','$timeout','getHeads','TransactionInfo','AlertService',function($scope,$timeout,getHeads,TransactionInfo,AlertService){

  //==============================================>>>HELPER FUNCTIONS<<==============================================

var init = function(){
  $scope.total = 25;
  $timeout(function(){$scope.total = 50;},350);
  $scope.pageClass = "page-default";
  $scope.noExtras = true;
  $scope.headSelected = false;
  init_selectionList();
  init_priceAndTotalCost();
};

var init_selectionList = function(){
  $scope.selected=TransactionInfo.getHeadSelection();
  if (isHeadSelected($scope.selected)){
    $scope.headSelected=true;
  }
  updatePrice($scope.selected); //update price of selection
};

var init_priceAndTotalCost = function(){
  if (TransactionInfo.getDirectionOfTransaction() == "submit"){
    if (TransactionInfo.getheadTotal() == 0)
      $scope.totalCost += TransactionInfo.getFlavourPrice();
    else{ //User pressed browser back button from payments page OR went back and submitted new flavours

      $scope.totalCost += TransactionInfo.getFlavourPrice();
      // $scope.price = 0; //reset price before calculating $scope.price on line 21
    }
  }else if(TransactionInfo.getDirectionOfTransaction() == "back"){$scope.totalCost += TransactionInfo.getFlavourPrice();}
  updateTransactionService(); //update Transaction service
};

  var isHeadSelected = function(selection){
    var isHeadSelected = false;
    for (i=0; i<selection.length; i++)
      if (selection[i].Type == "head") isHeadSelected = true;
    return isHeadSelected;
  };

  var updatePrice = function(selection){
    $scope.price = 0;
    $scope.totalCost = 0;
    for (var itemIndex in selection) {$scope.price += parseInt(selection[itemIndex].price);}
    $scope.totalCost += $scope.price;
  };

  var addShishaHead = function(head){
    if ($scope.headSelected){
      for(i=0;i<$scope.selected.length;i++) if($scope.selected[i] == headpreviouslySelected) $scope.selected.splice(i,1);
      $scope.price -= parseInt(headpreviouslySelected.price);
      $scope.totalCost -= parseInt(headpreviouslySelected.price);
      $timeout(function(){$scope.selected.push(head);},500);
    }
    else{$scope.selected.push(head);}
    $scope.price += parseInt(head.price);
    $scope.totalCost += parseInt(head.price);
    $scope.headSelected = true;
    headpreviouslySelected = head;
    TransactionInfo.setPreviouslySelectedHead(headpreviouslySelected);
    updateTransactionService();
  };

  var addExtraItem = function(ev,extra){
    var alreadyExists = false;
    for(i=0;i<$scope.selected.length;i++)
      if ($scope.selected[i].Category == extra.Category && $scope.selected[i].url == extra.url) alreadyExists=true;
    if (alreadyExists) AlertService.showAlert(ev,"Item already selected!","Woops!");
    else{
      $scope.selected.push(extra);
      $scope.price += parseInt(extra.price);
      $scope.totalCost +=  parseInt(extra.price);
      updateTransactionService();
    }
  };

  var removeItemFromSelection = function(ev,index){
    $scope.price -= parseInt($scope.selected[index].price);
    $scope.totalCost -= parseInt($scope.selected[index].price);
    if ($scope.selected[index] == headpreviouslySelected){
      $scope.headSelected = false;
      $scope.selected.splice(index,1);
      AlertService.showAlert(ev,"Please choose a head type to continue","Woops!");
    }
    else{$scope.selected.splice(index,1);}
    updateTransactionService();
  };

  var updateTransactionService = function(){
    TransactionInfo.setOrderPrice($scope.totalCost);
    TransactionInfo.setHeadSelection($scope.selected);
    TransactionInfo.setHeadTotal($scope.totalCost - $scope.price);
    TransactionInfo.setHeadPrice($scope.price);
  };


  //==================================================================================================================

  init();

  getHeads.heads().then(function(data){
      $scope.heads = data;
  });
  getHeads.extras().then(function(data){
    $scope.arrayData = data;
    $scope.arrayData.forEach(category => {
      category.list = category.list[0];
    });
  });

  var headpreviouslySelected = TransactionInfo.getPreviouslySelectedHead();
  $scope.addToSelected_unique = function(head){
    addShishaHead(head);
  };

  $scope.addToSelected = function(ev,extra){
    addExtraItem(ev,extra);
  };

  $scope.removeFromSelected = function(ev,index){
    removeItemFromSelection(ev,index);
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
