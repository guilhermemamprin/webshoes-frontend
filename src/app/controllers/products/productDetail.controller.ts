module webShoes {
  'use strict';
  class Product {
    id         : number;
    img1       : string;
    img2       : string;
    img3       : string;
    img4       : string;
    manufactor : string;
    name       : string;
    price      : number;
    quantity   : number;
    size       : string;
  }

  export class ProductDetailController {
    public $http: any;
    public $window: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public product : Product;

    private $stateParams: any;

    constructor ($stateParams: any, $http: any, $window: any) {
      this.$http = $http;
      this.$window = $window;
      this.$stateParams = $stateParams;
      this.getProductDetail(_.get(this.$stateParams, 'productId', 0));
    }

    getProductDetail(productId: number) : void {
      if (productId !== 0) {
        this.$http({
          method  : 'GET',
          url     :  this.rootUrl + '/products/' + productId,
        }).then((response : any) => {
          this.product = <Product>_.get(response, 'data.product');
        }, (errorResponse) => {
          alert('Erro: ' + errorResponse.message);
        });
      }
    }

    formatMoney(x:  number) : string {
      return "R$" + Math.round(x*Math.pow(10,2))/Math.pow(10,2);
    }
  }
}