module webShoes {
  'use strict';

  class Address {
      cep     : string;
      address : string;
      number  : number;
      city    : string;
      state   : string;
      owner   : string;
      id      : number;
  }

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

  class Orders {
    address: Address;
    order_time: string;
    client: string;
    employee: string;
    state: number;
    credit_card: number;
    price: number;
    banking_billet: number;
    id: number;
    items: Array<Product>;
  }

  export class MyOrdersController {
    public $http: any;
    public $window: ng.IWindowService;
    private $state: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public orderList : Array<Orders>;
    public newAddress : Address;
    public hasOrders  : boolean;
    public selectedOrder:  Orders;

    private $stateParams: any;

    public freight      : string;

    public formattedFreight: string

    constructor ($stateParams: any, $scope: any, $http: any, $window: ng.IWindowService, $state: any) {
      this.$http = $http;
      this.$window = $window;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.getOrders()
    }

    getOrders() : void {
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/orders',
            headers :  {'x-authentication': userToken}
          }).then((response : any) => {
              this.orderList = <Array<Orders>>_.get(response, 'data.orders');
              if(this.orderList.length > 0) {
                if(this.$state.current.name == "customer-order") {
                  this.selectOrder(_.get(this.$stateParams, 'orderId', 1))
                  this.getFreight();
                }
                this.hasOrders = true;
            } else {
                 this.hasOrders = false;
            }
        }, (errorResponse) => {
          alert('Erro: ' + errorResponse.message);
        });
      }
    }
    private isLoggedIn(): boolean {
      let userToken =  this.$window.localStorage.getItem('token');
      return (userToken != null && userToken.length > 0);
    }

    public getDate(date : string) : string {
      var d = new Date(date);
      return d.toDateString();
    }

    private selectOrder(orderId:number) {
      for(var order in this.orderList) {
        if(this.orderList[order].id == orderId) {
          this.selectedOrder = this.orderList[order];
          this.$state.go('customer-order');
         }
      }
    }

    getFreight(): void {
      this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/freight/' + this.selectedOrder.address.cep,
          }).then((response: any) => {
            this.freight = _.get(response, 'data.result.price', '0');
            this.formattedFreight = this.formatMoney(Number(this.freight));

          }, (errorResponse: any) => {
            alert('Erro: ' + _.get(errorResponse, 'data.message'));
        });
    }

    formatMoney(x:  number) : string {
      return "R$" + Math.round(x * Math.pow(10,2) )/ Math.pow(10 ,2);
    }

    public shipping() : string {
      return this.formattedFreight;
    }

    public getSubtotal() : string{
      let total:  number = 0;
      _.forEach(this.selectedOrder.items, (product: any) => {
        total += product.quantity * product.price;
      });
      return total.toString();
    }
  }
}