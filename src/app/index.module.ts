/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="controllers/main.controller.ts" />
/// <reference path="controllers/user/user.controller.ts" />
/// <reference path="controllers/cart/cart.controller.ts" />

/// <reference path="auth/auth.controller.ts" />
/// <reference path="controllers/navbar/navbar.controller.ts" />
/// <reference path="controllers/products/products.controller.ts" />
/// <reference path="controllers/products/productDetail.controller.ts" />

module webShoes {
  'use strict';

  angular.module('webShoes', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router'])
    .controller('MainController', MainController)
    .controller('NavbarController', NavbarController)
    .controller('UserController', UserController)
    .controller('CartController', CartController)
    .controller('ProductController', ProductController)
    .controller('ProductDetailController', ProductDetailController)


  .config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/views/user/signup.html',
        controller: 'UserController',
        controllerAs: 'userCtrl'
      })
      .state('cart', {
        url: '/cart',
        templateUrl: 'app/views/cart/cart.html',
        controller: 'CartController',
        controllerAs: 'cart'
      })
      .state('addToCart', {
        url: '/cart/add/:productId/:quantity',
        templateUrl: 'app/views/cart/cart.html',
        controller: 'CartController',
        controllerAs: 'cart'
      })

      .state('removeFromCart', {
        url: '/cart/remove/:productId',
        templateUrl: 'app/views/cart/cart.html',
        controller: 'CartController',
        controllerAs: 'cart'
      })

       .state('productList', {
        url: '/productList?search',
        templateUrl: 'app/views/product/productList.html',
        controller: 'ProductController',
        controllerAs: 'productCtrl'
      })

        .state('productDetail', {
        url: '/product?productId',
        templateUrl: 'app/views/product/productDetail.html',
        controller: 'ProductDetailController',
        controllerAs: 'productCtrl'
      });


      // .state('about', {
      //   url: '/about',
      //   templateUrl: 'app/about/about.html',
      //   controller: 'AboutController',
      //   controllerAs: 'about'
      // })

      // .state('repositories', {
      //   url: '/repositories?code',
      //   templateUrl: 'app/repositories/repositories.html',
      //   controller: 'RepositoriesController',
      //   controllerAs: 'repositories'
      // })

      //  .state('repositoryProfile', {
      //   url: '/repositoryProfile?full_name',
      //   templateUrl: 'app/repositoryProfile/repositoryProfile.html',
      //   controller: 'RepositoryProfileController',
      //   controllerAs: 'profile'
      // })

      //  .state('userProfile', {
      //   url: '/userProfile?login',
      //   templateUrl: 'app/userProfile/userProfile.html',
      //   controller: 'UserProfileController',
      //   controllerAs: 'userProfile'
      // })


      // .state('issues', {
      //   url: '/issues',
      //   templateUrl: 'app/issues/issues.html',
      //   controller: 'IssuesController',
      //   controllerAs: 'issues'
      // })

      // .state('issueForm', {
      //   url: '/issueForm/{owner}/{repo}',
      //   templateUrl: 'app/issueForm/issueForm.html',
      //   controller: 'IssueFormController',
      //   controllerAs: 'issueForm'
      // })


      // .state('/auth', {
      //   url: '/auth?code',
      //   controller: 'AuthController',
      //   controllerAs: 'auth'
      // });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);


  })
;
}
