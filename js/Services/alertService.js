app.factory('AlertService', ['$mdDialog',function($mdDialog){
  return {
    showAlert: function(ev,message,label) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Note:')
          .textContent(message)
          .ariaLabel(label)
          .ok('Got it!')
          .targetEvent(ev)
      )
    }
  }
}]);
