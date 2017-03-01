// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.staticInclude', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  })
})


.factory("$calculatorFactory", function() {

    return {

        infixToPostfix: function(infix) {
            var outputQueue = "";
            var operatorStack = [];
            var operators = {
                "^": {
                    precedence: 4,
                    associativity: "Right"
                },
                "/": {
                    precedence: 3,
                    associativity: "Left"
                },
                "*": {
                    precedence: 3,
                    associativity: "Left"
                },
                "\u02eb": {
                    precedence: 2,
                    associativity: "Left"
                },
                "-": {
                    precedence: 2,
                    associativity: "Left"
                }
            }
            infix = infix.replace(/\s+/g, "");
            infix = infix.split(/([\u02eb\-\*\/\^\(\)])/).clean();
            for(var i = 0; i < infix.length; i++) {
                var token = infix[i];
                if(token.isNumeric()) {
                    outputQueue += token + " ";
                } else if("^*/\u02eb-".indexOf(token) !== -1) {
                    var o1 = token;
                    var o2 = operatorStack[operatorStack.length - 1];
                    while("^*/\u02eb-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                        outputQueue += operatorStack.pop() + " ";
                        o2 = operatorStack[operatorStack.length - 1];
                    }
                    operatorStack.push(o1);
                } else if(token === "(") {
                    operatorStack.push(token);
                } else if(token === ")") {
                    while(operatorStack[operatorStack.length - 1] !== "(") {
                        outputQueue += operatorStack.pop() + " ";
                    }
                    operatorStack.pop();
                }
            }
            while(operatorStack.length > 0) {
                outputQueue += operatorStack.pop() + " ";
            }
            return outputQueue;
        },

        solvePostfix: function(postfix) {
            var resultStack = [];
            postfix = postfix.split(" ");
            for(var i = 0; i < postfix.length; i++) {
                if(postfix[i].isNumeric()) {
                    resultStack.push(postfix[i]);
                } else {
                    var a = resultStack.pop();
                    var b = resultStack.pop();
                    if(postfix[i] === "\u02eb") {
                        resultStack.push(parseInt(a) + parseInt(b));
                    } else if(postfix[i] === "-") {
                        resultStack.push(parseInt(b) - parseInt(a));
                    } else if(postfix[i] === "*") {
                        resultStack.push(parseInt(a) * parseInt(b));
                    } else if(postfix[i] === "/") {
                        resultStack.push(parseInt(b) / parseInt(a));
                    } else if(postfix[i] === "^") {
                        resultStack.push(Math.pow(parseInt(b), parseInt(a)));
                    }
                }
            }
            if(resultStack.length > 1) {
                return "error";
            } else {
                return resultStack.pop();
            }
        }

    }

})

.factory('InboxFactory', function InboxFactory($q, $http, $location){
	var exports = {};
	exports.messages = [];
	
	exports.goToMessage = function(id) {
		if(angular.isNumber(id)){
		//$location.path('inbox/email/' + id)
		}
	}
	
	exports.deleteMessage = function (id, index) {
		this.messages.splice(index, 1);
	}	
	
	exports.getMessages = function(){
		var deferred = $q.defer();
		return $http.get('json/emails.json')
		.success(function (data) {
		exports.messages = data;
		deferred.resolve(data);
		})
		.error(function(data) {
		deferred.reject(data);
		});
		return deferred.promise;
	};
	
	return exports;
})



.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.ex1', {
    url: '/ex1',
    views: {
      'menuContent': {
        templateUrl: 'templates/ex1.html',
        controller: 'TruthController'
      }
    }
  })

  .state('app.ex3', {
    url: '/ex3',
    views: {
      'menuContent': {
        templateUrl: 'templates/ex3.html',
        controller: 'CalculatorController'
      }
    }
  })

  .state('app.ex2', {
      url: '/ex2',
      views: {
        'menuContent': {
          templateUrl: 'templates/ex2.html',
          controller: 'VoteCtrl'
        }
      }
    })
  .state('app.ex4', {
      url: '/ex4',
      views: {
        'menuContent': {
          templateUrl: 'templates/ex4.html',
        }
      }
    })
    
    .state('app.qformula', {
    url: '/qformula', 
    views: {
    	'menuContent': {
    	 templateUrl: 'templates/qformula.html',
    	 controller: 'FormulaCtrl'
    	 }
       }
    })
    .state('app.welcome', {
      url: '/welcome',
      views: {
        'menuContent': {
          templateUrl: 'templates/welcome.html',
          controller: 'WelcomeCtrl'
        }
      }
    })
    
    .state('app.inbox', {
    	url: '/inbox',
    	views: {
    	'menuContent': {
    	templateUrl: 'templates/inbox.html',
    	controller: 'InboxCtrl'
    	}
       }
    })
    
    .state('app.inbox/email/:id', {
    url: '/email',
    views: {
    'menuContent': {
    templateUrl: 'templates/email.html',
    controller: 'EmailCtrl'
    }
   }
  });
    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/welcome');

  String.prototype.isNumeric = function() {
      return !isNaN(parseFloat(this)) && isFinite(this);
  }

  Array.prototype.clean = function() {
      for(var i = 0; i < this.length; i++) {
          if(this[i] === "") {
              this.splice(i, 1);
          }
      }
      return this;
  }

});
