app.factory('storeOrderDetails',['$http',function($http){
  var transactionCompleted = null;
  return {
    storeDetails: function(data){
      return $http.post('Server/storeOrderDetails.php',data)
      .then(function(response){
        console.log(response);
        return response.data;
      })
    }
  }
}]);
