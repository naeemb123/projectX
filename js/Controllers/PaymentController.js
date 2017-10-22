app.controller('PaymentController',['$scope','$timeout','TransactionInfo','$mdpTimePicker',function($scope,$timeout,TransactionInfo,$mdpTimePicker){
  $scope.pageClass = "page-default";
  $scope.total = 50;
  $timeout(function(){$scope.total = 85;},350);
  $scope.totalPrice = parseInt(TransactionInfo.getOrderPrice());
  $scope.timeSelected = true;
  $scope.selectedFlavours = TransactionInfo.getFlavourSelection();
  $scope.selectedHeads = TransactionInfo.getHeadSelection();
  $scope.nameOnCard = "";

  $scope.changeColourOf_backButton = function(){
    $scope.colourChange_backButton = "backButton_hover";
  }

  $scope.changeColourOfGf = function(){
    $scope.colourChange = "gfHover";
  }

  $scope.direction = function(){
    TransactionInfo.setDirectionOfTransaction("back");
  }

  $scope.paymentSubmitted = function(){
    TransactionInfo.setDateTimeSelected(formatDateForSql($scope.time.twelve));
    console.log(formatDateForSql(new Date()));
    TransactionInfo.setOrderDate(formatDateForSql(new Date()));
    TransactionInfo.setCardHoldersName($scope.nameOnCard);
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

var formatDateForSql = function(date){
  return date.getFullYear().toString()
   + "-" + date.getMonth().toString()
    + "-" + date.getDate().toString()
     + " " + date.getHours().toString()
      + ":" + date.getMinutes().toString()
       + ":" + date.getSeconds().toString();
}

}]);
