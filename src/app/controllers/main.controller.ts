module webShoes {
  'use strict';

  class Product {
    id           : number;
    img1         : string;
    img2         : string;
    img3         : string;
    img4         : string;
    manufacturer : string;
    name         : string;
    price        : number;
    size         : string;
  }

  export class MainController {
    public $http: any;
    public $window: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public productList : Array<Product>;

      constructor ($scope: any, $http: any, $window: any) {
        this.$http = $http;
        this.$window = $window;
        this.getProducList();
      }

      getProducList() : void {

        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/products',
          }).then((response : any) => {
            this.productList = <Array<Product>>_.get(response, 'data.products');
        }, (errorResponse) => {
          alert('Erro: ' + errorResponse.message);
        });
    }
  }

}
