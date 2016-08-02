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

  class State {
    id   : string;
    name : string;

    constructor (id:string, name:string) {
      this.id = id;
      this.name = name;
    }
  }

  export class MyAccountController {
    public $http: any;
    public $window: ng.IWindowService;
    private $state: any;
    public rootUrl: string = 'http://webshoes-backend.herokuapp.com';
    public addressList : Array<Address>;
    public clientAddrss : Address;
    public updatedAddrss : Address;
    public newAddress : Address;
    public hasAddrs  : boolean;
    public availableState : Array<State>;

    constructor ($scope: any, $http: any, $window: ng.IWindowService, $state: any) {
      this.$http = $http;
      this.$window = $window;
      this.$state = $state;
      if($state.current.name == "myAddress") {
        this.getAddress();
      } else {
        this.setupState();
      }
    }

    getAddress() : void {
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'GET',
            url     :  this.rootUrl + '/address',
            headers :  {'x-authentication': userToken}
          }).then((response : any) => {
              this.addressList = <Array<Address>>_.get(response, 'data.addresses');
             if(this.addressList.length > 0) {
                 this.hasAddrs = true;
                 this.getClientAddrs();
                 this.getUpdatedAddrs();
             } else {
                 this.hasAddrs = false;
             }
        }, (errorResponse) => {
          alert('Erro: ' + errorResponse.message);
        });
      }
    }

    private getClientAddrs() : void {
      this.clientAddrss = _.first(this.addressList);
    }

    private getUpdatedAddrs() : void {
      this.updatedAddrss =  _.last(this.addressList)
    }

    private isLoggedIn(): boolean {
      let userToken =  this.$window.localStorage.getItem('token');
      return (userToken != null && userToken.length > 0);
    }

    setupState() {
      this.availableState = [
      new State("AC", "ACRE"),
      new State("AL", "Alagoas"),
      new State("AP", "Amapá"),
      new State("AM", "Amazonas"),
      new State("BA", "Bahia"),
      new State("CE", "Ceará"),
      new State("DF", "Distrito Federal"),
      new State("ES", "Espírito Santo"),
      new State("GO", "Goiás"),
      new State("MA", "Maranhão"),
      new State("MT", "Mato Grosso"),
      new State("MS", "Mato Grosso do Sul"),
      new State("MG", "Minas Gerais"),
      new State("PA", "Pará"),
      new State("PB", "Paraíba"),
      new State("PR", "Paraná"),
      new State("PE", "Pernambuco"),
      new State("PI", "Piauí"),
      new State("RJ", "Rio de Janeiro"),
      new State("RN", "Rio Grande do Norte"),
      new State("RS", "Rio Grande do Sul"),
      new State("RO", "Rondônia"),
      new State("RR", "Roraima"),
      new State("SC", "Santa Catarina"),
      new State("SP", "São Paulo"),
      new State("SE", "Sergipe"),
      new State("TO", "Tocantins")
      ];
    }

    public saveNewAddress() : void {
      let userToken =  this.$window.localStorage.getItem('token');
      if (this.isLoggedIn()) {
        this.$http({
            method  : 'POST',
            url     :  this.rootUrl + '/address',
            headers :  {'x-authentication': userToken},
            data    :  this.newAddress,
          }).then((response : any) => {
              alert('Endereço adicionado com sucesso');
              this.$state.go('myAddress');
        }, (errorResponse) => {
          alert('Erro: ' + errorResponse.message);
        });
      }
    }
  }
}