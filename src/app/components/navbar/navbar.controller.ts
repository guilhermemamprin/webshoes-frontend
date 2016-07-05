module testApp {
  'use strict';

  export class NavbarController {
    public date: Date;
    public controller;
    public $state;
    public authSet: boolean = true;

    isActive(viewLocation) {
      return this.$state.includes(viewLocation);
    }

    /* @ngInject */
    constructor ($state, $scope, $window) {
      this.$state = $state;
      $scope.$window = $window;
      if (window.localStorage.getItem('authToken') == null) {
        this.authSet = false;
      }
    }
  }

}
