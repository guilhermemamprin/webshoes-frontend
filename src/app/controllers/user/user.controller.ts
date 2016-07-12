module testApp {

	export class UserController {
		public $http: any;

	    constructor ($scope, $http) {
	      this.$http = $http;
	    }
	}
}