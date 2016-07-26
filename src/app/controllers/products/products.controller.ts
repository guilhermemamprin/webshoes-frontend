module webShoes {

  class Product {
    id           : number;
    img1         : string;
    img2         : string;
    img3         : string;
    img4         : string;
    manufacturer : string;
    name         : string;
    price        : number;
    quantity     : number;
    size         : string;
  }

  export class ProductController {
    public $http: any;
    public $window: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public productList : Array<Product>;
    public hasProducts : boolean

    private $stateParams: any;

    constructor ($scope: any, $http: any, $window: any, $stateParams) {
      this.$http = $http;
      this.$window = $window;
      this.$stateParams = $stateParams;
      this.hasProducts = false;
      this.getProductList(_.get(this.$stateParams, 'search', ""));
    }

    getProductList(searchString: string) : void {

        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/products?q=' + searchString,
          }).then((response : any) => {
              this.productList = <Array<Product>>_.get(response, 'data.products');
             if(this.productList.length > 0) {
                 this.hasProducts = true;
             } else {
                 this.hasProducts = false;
             }
        }, (errorResponse) => {
          alert('Erro: ' + errorResponse.message);
        });
    }
  }
}