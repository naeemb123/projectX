app.factory('getHeads',['$http',function($http){
  return {
    heads: function(){
      return $http.get('Server/getHeads.php')
      .then(function(response){
        return response.data;
      });
    },
    extras: function(){
      return $http.get('Server/getExtras.php')
      .then(function(response){
        return response.data;
      });
    }
  }
}]);
