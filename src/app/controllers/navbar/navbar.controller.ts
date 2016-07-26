module webShoes {
  'use strict';

  export class NavbarController {

    public authSet        : boolean = false;
    public $window        : ng.IWindowService;
    public userName       : string;
    public searchString   : string;
    public $http: any;

    private $state        : any;
    private $stateParams  : any;

    /* @ngInject */
    constructor ($state, $scope, $http: any, $window: ng.IWindowService, $stateParams) {
      
      this.$state = $state;
      this.$window = $window;
      this.$stateParams = $stateParams;
      this.$http = $http;

      let username = $window.localStorage.getItem('username');
      let token = $window.localStorage.getItem('token');
       if (username !== null && token !== null) {
         this.userName = username;
         this.authSet = true;
       }
    }

    signOut() : void {
      this.$window.localStorage.removeItem('username');
      this.$window.localStorage.removeItem('token');
      this.authSet = false;
      this.$state.transitionTo(this.$state.current, this.$stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    }

     isActive(viewLocation): boolean {
      return this.$state.includes(viewLocation);
    }

    search() : void {
      this.$state.go('productList', {search: this.searchString});
    }
  }

}
