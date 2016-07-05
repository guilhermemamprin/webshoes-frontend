module testApp {
  'use strict';

  export class AuthController {

    /* @ngInject */
    constructor ($scope, $stateParams, $window, $http) {
      var code = $stateParams.code;
      // Non secure access to auth Token, use server side requesting for security
      if (code != null ) {
        $http({
          method: 'POST',
          url:  'http://localhost:5000/login/oauth/access_token?client_id=2e5699877d1e6044b10a&client_secret=c59ae80c4e522e08c8ea54f0870bee6a045d2ea6&code=' + code
        }).then(function(response) {
          $window.localStorage.setItem("authToken", decodeURIComponent(response.data));

          $http.get("https://api.github.com/user" + "?" + window.localStorage.getItem("authToken"))
            .then(function(response){
              $window.localStorage.setItem("username", response.data.login);
              $window.location.href = '/';
            });


        });
      }



    }
  }

}
