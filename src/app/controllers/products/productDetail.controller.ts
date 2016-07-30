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
    public $state: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public product : Product;

    private $stateParams: any;

    constructor ($stateParams: any, $http: any, $state: any) {
      this.$http = $http;
      this.$state = $state;
      this.$stateParams = $stateParams;




      this.getProductDetail(_.get(this.$stateParams, 'productId', 0));
    }

    addToCart() : void {

      this.$http({
        method   : 'POST',
        url      : this.rootUrl + '/cart',
        headers : {
          'x-authentication': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcGYiOiI0MTg1MDQ3MjE1NyIsInR5cGUiOiJjbGllbnQiLCJpYXQiOjE0Njk3MjkyMzZ9.9CP7k_FWC_kehx-eQhq5MkVoCYGwrqmmkD3A2b8yWso' //this.$window.localStorage.getItem('token')
        },
        data: {
          quantity: 1,
          productId: this.product.id
        }
      }).then((response : any) => {
        this.$state.go('cart')
      }, (err) => {
        alert('Infelizmente não conseguimos realizar a operação. Por favor tente mais tarde')
      })


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
          this.$state.go('home');
        });
      } else {
        this.$state.go('home');
      }
    }

    formatMoney(x:  number) : string {
      return "R$" + Math.round(x*Math.pow(10,2))/Math.pow(10,2);
    }
  }
}