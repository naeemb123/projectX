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
        var arrayData = [];
        response.data.forEach(d => {
          arrayData.push({'list': [d[Object.keys(d)[0]]],'name':Object.keys(d)[0]});
        });
        return arrayData;
      });
    }
  };
}]);
