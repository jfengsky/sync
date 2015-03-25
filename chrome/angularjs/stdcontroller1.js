var BookListCtrl = angular.module('BookListCtrls', []);

BookListCtrl.controller('HelloCtrl', ['$scope',
  function($scope) {
    $scope.greeting = {
      text: 'Hello'
    }
  }
]);

BookListCtrl.controller('BookListCtrl', ['$scope',
  function($scope) {
    $scope.books = [{
      title: "<<11>>",
      author: "str"
    }];
  }
]);