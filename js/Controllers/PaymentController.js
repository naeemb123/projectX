app.controller('PaymentController',['$scope','TransactionInfo','$mdpTimePicker',function($scope,TransactionInfo,$mdpTimePicker){
  $scope.pageClass = "page-default";
  $scope.total = 85;
  $scope.totalPrice = parseInt(TransactionInfo.getOrderPrice());
  $scope.timeSelected = true;
  $scope.selectedFlavours = TransactionInfo.getFlavourSelection();
  $scope.selectedHeads = TransactionInfo.getHeadSelection();

  $scope.changeColourOf_backButton = function(){
    $scope.colourChange_backButton = "backButton_hover";
  }

  $scope.changeColourOfGf = function(){
    $scope.colourChange = "gfHover";
  }

  $scope.timeSelectSubmitted = function(){
    TransactionInfo.setDirectionOfTransaction("submit");
  }

  $scope.direction = function(){
    TransactionInfo.setDirectionOfTransaction("back");
  }

  $scope.paymentSubmitted = function(){
    TransactionInfo.setOrderPrice($scope.totalCost);
    TransactionInfo.setHeadSelection($scope.selected);
    TransactionInfo.setHeadTotal($scope.totalCost - $scope.price);
    TransactionInfo.setDirectionOfTransaction("submit");
  }

  $scope.time = {
      twelve: new Date(),
      twentyfour: new Date()
    };

    $scope.message = {
      hour: 'Hour is required',
      minute: 'Minute is required',
      meridiem: 'Meridiem is required'
    }

}]);
