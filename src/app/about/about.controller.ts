module webShoes {
  'use strict';

  class Thing {
    public rank: number;
    public title: string;
    public url: string;
    public description: string;
    public logo: string;
    public img_url: string;

    constructor(title: string, url: string, description: string, logo: string, img_url: string) {
      this.title = title;
      this.url = url;
      this.description = description;
      this.logo = logo;
      this.rank = Math.random();
      this.img_url = img_url
    }
  }

  export class AboutController {
    public awesomeThings: Thing[];

    /* @ngInject */
    constructor () {
      var vm = this;

      var awesomeThings =  





      [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png',
        'img_url': 'data:image/png;base64,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'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Stylus',
        'url': 'http://learnboost.github.io/stylus/',
        'description': 'Stylus is a revolutionary new language, providing an efficient, dynamic, and expressive way to generate CSS. Supporting both an indented syntax and regular CSS style.',
        'logo': 'stylus.png'
      },
      {
        'title': 'TypeScript',
        'url': 'http://www.typescriptlang.org/',
        'description': 'TypeScript, a typed superset of JavaScript that compiles to plain JavaScript.',
        'logo': 'typescript.png'
      },
      {
        'key': 'jade',
        'title': 'Jade',
        'url': 'http://jade-lang.com/',
        'description': 'Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node.',
        'logo': 'jade.png'
      }
    ];

      vm.awesomeThings = new Array<Thing>();

      awesomeThings.forEach(function(awesomeThing: Thing) {
        vm.awesomeThings.push(awesomeThing);
      });
    }
  }

}
