module webShoes {
  'use strict';

  class Product {
    id            :   number;
    name          :   string;
    quantity      :   number;
    size          :   string;
    price         :   string;
    manufacturer  :   string;
    img1          :   string;

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


