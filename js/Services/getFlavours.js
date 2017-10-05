app.factory('getFlavours',['$http',function($http){
  return $http.get("Server/getFlavours.php")
  .then(function(response){
    return response.data;
  })
}])
