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
    public paymentWithCard : boolean = false;

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
        });
      }
    }

    createCard(card: Card) : void {
      let userToken =  this.$window.localStorage.getItem('token');
      this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/card',
            headers :  {'x-authentication': userToken},
            data    :  card
          }).then((response: any) => {
            this.chosenCard = card;
            this.$state.go("checkout.stepThree");
          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));            
        });
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

    payWithCard() : void {
      this.paymentWithCard = true;
    }

    payWithBillet() : void {
      this.$state.go("checkout.stepThree");
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

    doCheckout() : void {
      let userToken =  this.$window.localStorage.getItem('token');

      this.$http({
          method  : 'POST',
          url     :  this.rootUrl + '/checkout',
          data    : {
            address : _.get(this.chosenAddress, 'id'),
            card    : _.get(this.chosenCard, 'number'),
            freight : this.freight,
          },
          headers : { 'x-authentication' : userToken }
        }).then(() => {
          alert("Pedido finalizado com sucesso!");
          this.$state.go("home");
        }, (errorResponse: any) => {
          alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
    }

    public isLoggedIn(): boolean {
      let userToken =  this.$window.localStorage.getItem('token');
      return (userToken != null && userToken.length > 0);
    }
  }
}


