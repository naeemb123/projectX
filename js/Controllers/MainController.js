app.controller('MainController',['$scope','$location','cafeDetails','TransactionInfo',function($scope,$location,cafeDetails,TransactionInfo){
  $scope.pageClass="page-home";
  data = {'name':'Glasvegas'}
  cafeDetails.getCafeDetailsFromServer(data);
  TransactionInfo.setOrderPrice(0);

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
