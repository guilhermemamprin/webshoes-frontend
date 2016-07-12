module webShoes {

  class Product {
    sku        : string;
    image      : string;
    text       : string;
    price      : number;
  }

  export class ProductController {
    public $http: any;
    public $window: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public productList : Array<Product>;

      constructor ($scope: any, $http: any, $window: any) {
        this.$http = $http;
        this.$window = $window;
        this.onGetProducList();
      }

      onGetProducList() : void {

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