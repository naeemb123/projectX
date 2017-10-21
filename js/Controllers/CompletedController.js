app.controller('CompletedController',['$scope','TransactionInfo','cafeDetails','storeOrderDetails',
function($scope,TransactionInfo,cafeDetails,storeOrderDetails){
  $scope.pageClass = "page-default";
  $scope.total = 100;
  $scope.OrderMessage = " . . . "

  var data = {
    'cafeID':cafeDetails.getCafeDetails().cafeID,
    'Price': TransactionInfo.getOrderPrice(),
    'Flavours': TransactionInfo.getFlavourSelection(),
    'Heads': TransactionInfo.getHeadSelection(),
    'SelectedTime': TransactionInfo.getDateTimeSelected(),
    'orderDate': TransactionInfo.getOrderDate(),
    'CardHoldersName': TransactionInfo.getCardHoldersName()
  }
  //Price, cafeDetails,selectedHeads,selectedFlavours,selectedTime,cardHolderName

  storeOrderDetails.storeDetails(data)
  .then(function(response){
    console.log(response);
    (response == 1) ? $scope.OrderMessage = "Your shisha is being prepared!":
    $scope.OrderMessage = "Sorry, Transaction did not go through. You are entitled to a refund";
  });

}]);
