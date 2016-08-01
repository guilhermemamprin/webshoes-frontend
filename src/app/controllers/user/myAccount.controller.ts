module webShoes {
  'use strict';

  class Address {
      cep     : string;
      address : string;
      number  : number;
      city    : string;
      state   : string;
      owner   : string;
      id      : number;
  }

  export class MyAccountController {
    public $http: any;
    public $window: ng.IWindowService;
    private $state: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public addressList : Array<Address>;
    public clientAddrss : Address;
    public updatedAddrss : Address;
    public hasAddrs  : boolean;

      constructor ($scope: any, $http: any, $window: ng.IWindowService, $state: any) {
        this.$http = $http;
        this.$window = $window;
        this.getAddress();
      }

      getAddress() : void {
        let userToken =  this.$window.localStorage.getItem('token');
        if (this.isLoggedIn()) {
          this.$http({
              method  : 'GET',
              url     :  this.rootUrl + '/address',
              headers :  {'x-authentication': userToken}
            }).then((response : any) => {
                this.addressList = <Array<Address>>_.get(response, 'data.addresses');
               if(this.addressList.length > 0) {
                   this.hasAddrs = true;
                   this.getClientAddrs();
                   this.getUpdatedAddrs();
               } else {
                   this.hasAddrs = false;
               }
          }, (errorResponse) => {
            alert('Erro: ' + errorResponse.message);
          });
        }
      }

      private getClientAddrs() : void {
        this.clientAddrss = _.first(this.addressList);
      }

      private getUpdatedAddrs() : void {
        this.updatedAddrss =  _.last(this.addressList)
      }

      private isLoggedIn(): boolean {
        let userToken =  this.$window.localStorage.getItem('token');
        return (userToken != null && userToken.length > 0);
      }
  }
}