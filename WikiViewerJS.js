var app = angular.module('WikiViewer', []);
app.controller('MainCtrl', function($scope, $http, $timeout) {
  
  $scope.results = [];
  
  $scope.searchWiki = function() {
    var title = $("#query").val();
    var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'http://en.wikipedia.org/?curid=';
    
    $http.jsonp(api + title + cb).success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(v,k)  {
        $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
      })
    });
    $scope.results = [];
  };
  
  $scope.clearQuery = function() {
    $("#query").val('');
    $scope.results = {};
  };
  
});
