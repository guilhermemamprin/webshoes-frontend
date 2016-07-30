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

  export class CartController {
    public $http        : any;
    public $window      : ng.IWindowService;
    public productList  : Array<Product>;
    public itemsInCart  :  number;
    public rootUrl      : string = 'http://webshoes-backend.herokuapp.com';

    private $state      : any;

    constructor ($scope: any, $http: any, $window: ng.IWindowService, $state: any) {
      this.$http = $http;
      this.$window = $window;
      this.$state = $state;

      this.getProducts();
    }

    getProducts() : void {

        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/cart',
            headers : {
              'x-authentication': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI0MTg1MDQ3MjE1NyIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE0Njk3MjkyMzZ9.9CP7k_FWC_kehx-eQhq5MkVoCYGwrqmmkD3A2b8yWso' //this.$window.localStorage.getItem('token')
            }
          }).then((response: any) => {
            this.productList = response.data.items;
            this.itemsInCart = this.productList.length;

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
    }

    formatMoney(x:  number) : string {
      return "R$" + Math.round(x*Math.pow(10,2))/Math.pow(10,2);
    }

    calculateTotal():  string {
      let total:  number = 0;
      _.forEach(this.productList, (product: any) => {
        total+=product.product.quantity*product.product.price;
      });

      return this.formatMoney(total);

    }
  }

}


