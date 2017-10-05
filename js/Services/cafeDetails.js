app.factory('cafeDetails',['$http',function($http){
  var details;
  return {
    getCafeDetailsFromServer: function(data){
      return $http.post('Server/getCafeDetails.php',data)
      .then(function(response){
        details = response.data;
      });
    },
    getCafeDetails: function(){
        return details;
    }
  }
}]);
