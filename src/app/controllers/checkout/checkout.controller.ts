module webShoes {
  'use script';
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

  class Address {
    cep          : string;
    address      : string;
    number       : string;
    city         : string;
    state        : string;
    owner        : string;
    id           : number;
  }

  class CartEntry {
    productId     :   number;
    quantity      :   number;
  }

  class Cart {
    productList   :  Array<Product>
  }

  class Card {
    name    : string;
    card    : string;
  }

  export class CheckoutController {
    public $http        : any;
    public $window      : ng.IWindowService;

    public productList  : Array<Product> = [];
    public addressList  : Array<Address> = [];
    public cardList     : Array<Card>    = [];

    public itemsInCart  : number;

    public chosenAddress: Address;
    public chosenCard   : Card;
    public freight      : string;

    public formattedFreight: string
    public totalWithFreight: string

    public rootUrl      : string = 'http://webshoes-backend.herokuapp.com';

    private $state      : any;
    private $stateParams: any;

    constructor ($stateParams: any, $http: any, $window: ng.IWindowService, $state: any) {
      this.$http = $http;
      this.$window = $window;
      this.$state = $state;
      this.$stateParams = $stateParams;

      let userToken =  this.$window.localStorage.getItem('token');
      if (!this.isLoggedIn()) {
        this.$state.go("signup");
      }

      if(this.$state.$current.name = 'checkout') {
        this.$state.go('checkout.stepOne');
      }

      this.getAddresses();
      this.getProducts();
      this.getCards();

      if(_.get($stateParams, 'productId', false)) {
        this.updateCart();
      }      
    }

    getProducts() : void {
    
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/cart',
            headers :  {'x-authentication': userToken}
          }).then((response: any) => {
            this.productList = response.data.products;
            this.itemsInCart = _.get(this.productList, 'length', 0);

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
            this.loadLocalCart();
        });
      } else {
        this.loadLocalCart();
      }
    }

     getCards() : void {
    
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/card',
            headers :  {'x-authentication': userToken}
          }).then((response: any) => {
            this.cardList = response.data.cards;
            

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
            
        });
      }
    }


    getAddresses() : void {
    
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/address',
            headers :  {'x-authentication': userToken}
          }).then((response: any) => {
            this.addressList = response.data.addresses;

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
      }
    }

    chooseAddress(address: Address) : void {
      this.chosenAddress = address;
      this.$state.go("checkout.stepTwo");
    }

    chooseCard(card: Card) : void {
      this.chosenCard = card;
      this.getFreight();
      this.$state.go("checkout.stepThree");
    }

    formatMoney(x:  number) : string {
      return "R$" + Math.round(x * Math.pow(10,2) )/ Math.pow(10 ,2);
    }

    calculateTotal():  string {
      let total:  number = 0;
      _.forEach(this.productList, (product: any) => {
        total += product.quantity * product.price;
      });

      return this.formatMoney(total);
    }

    calculateTotalWithFreight(): string {
      let total:  number = 0;
      _.forEach(this.productList, (product: any) => {
        total += product.quantity * product.price;
      });

      return this.formatMoney(total + Number(this.freight));
    }

    getFreight(): void {
      this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/freight/' + this.chosenAddress.cep,
          }).then((response: any) => {
            this.freight = _.get(response, 'data.result.price', '0');
            this.formattedFreight = this.formatMoney(Number(this.freight));
            this.totalWithFreight = this.calculateTotalWithFreight();

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
    }

    loadLocalCart() : void {
      let cartString = this.$window.localStorage.getItem('cart');
      let cart: Cart = new Cart();
      cart.productList = [];
      if(cartString !== null && cartString.length > 0) {
        cart.productList = JSON.parse(cartString);
        this.productList = cart.productList;
        this.itemsInCart = cart.productList.length;
      }
    }

    updateCart() : void {
      let cartEntry: CartEntry = new CartEntry();

      cartEntry.productId = <number>_.get(this.$stateParams, 'productId');
      cartEntry.quantity  = <number> _.get(this.$stateParams, 'quantity');

      if(this.$state.current.name == 'addToCart') {
        this.addProductToCart(cartEntry);
      } else {
        this.removeProductFromCart(cartEntry);
      }
    }

    changeProductQuantity(product: Product): void {
      this.addProductToCart(<CartEntry>{productId: product.id, quantity: product.quantity});
    }

    removeProductFromCart(cartEntry: CartEntry) : void {
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'DELETE',
            url     :  this.rootUrl + '/cart',
            headers :  {'x-authentication': userToken},
             data    :  {productId: Number(cartEntry.productId)}
          }).then((response: any) => {
            this.removeProductFromCartLocal(cartEntry);

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
      } else {
        this.removeProductFromCartLocal(cartEntry);
      }
    }

    removeProductFromCartLocal(cartEntry: CartEntry): void {
      for(var i = 0; i < this.productList.length; i++) {
        if(this.productList[i].id == cartEntry.productId) {
          this.productList.splice(i,1);
          this.itemsInCart = this.productList.length;
        }
      }
      this.$window.localStorage.setItem('cart', JSON.stringify(this.productList));
      this.$state.go('cart');
    }

    addProductToCart(cartEntry: CartEntry) : void {
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/cart',
            headers :  {'x-authentication': userToken},
            data    :  {productId: Number(cartEntry.productId), quantity: Number(cartEntry.quantity)}
          }).then((response: any) => {
            this.addProductToCartLocal(cartEntry);

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
      } else {
      this.addProductToCartLocal(cartEntry);
      }
    }

    addProductToCartLocal(cartEntry: CartEntry) {
   
      let update: boolean = _.some(this.productList, (product: Product) => {
        return product.id == cartEntry.productId;
      });
       if (update) {
        for(var i = 0; i < this.productList.length; i++) {
          if(this.productList[i].id == cartEntry.productId) {

            this.productList[i].quantity = Number(this.productList[i].quantity) + Number(cartEntry.quantity);
          }
        }
        this.$window.localStorage.setItem('cart', JSON.stringify(this.productList));
        this.$state.go('cart');
       } else {
          this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/products/' + cartEntry.productId,
          }).then((response: any) => {
            let product: Product = <Product>_.get(response, 'data.product');
            product.quantity = cartEntry.quantity;
            this.productList.push(product);
            this.itemsInCart = this.productList.length;
            this.$window.localStorage.setItem('cart', JSON.stringify(this.productList));
            this.$state.go('cart');
          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        }); 
       }
    }

    private isLoggedIn(): boolean {
      let userToken =  this.$window.localStorage.getItem('token');
      return (userToken != null && userToken.length > 0);
    }
  }
}


