app.directive("category", () => {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'Views/DirectiveViews/category.html',
    link: function(scope,element,attrs){
      scope.catList = scope.categories;
      console.log(scope.categories);
      console.log(scope.total);
      // scope.$watch('categories', function(newValue, oldValue) {
      //    scope.categoryList = newValue;
      // });
    }
  }
});
