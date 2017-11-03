var app = angular.module('imageApp', ['ui.bootstrap']);

app.controller('myCtrl', function($scope,$http,$rootScope) {

  $scope.loader  = false;

  function validUrl(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
      $scope.valid = false
    } else {
      $scope.valid = true
    }
  }

  $scope.getImage = function(url){
    validUrl($scope.link);
    $scope.links = ""; 
    if($scope.valid){
      $scope.err = "";
      var postData = {
        url: url
      }
      $scope.loader  = true;
      $http.post('/api/webCrawl',postData)
      .then(function(response){
        $scope.loader  = false;
        $scope.links = response.data;      
        // $scope.links = response.data.slice(0, 25); // to limit the data to 25
        $scope.link = "";
        });
    }else{
      $scope.err = "Please enter valid URL.";
    }
    
  }

    

});


