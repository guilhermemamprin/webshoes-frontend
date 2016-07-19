module webShoes {

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