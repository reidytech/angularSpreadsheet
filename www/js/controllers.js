angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller("CalculatorController", function($scope, $ionicSideMenuDelegate, $calculatorFactory, $ionicSlideBoxDelegate) {


  $scope.$on('$ionicView.enter', function () {
  $ionicSideMenuDelegate.canDragContent(false);
  document.getElementById("gone0").style.display = 'none'; document.getElementById("gone1").style.display = 'none'; document.getElementById("gone2").style.display = 'none'; document.getElementById("gone3").style.display = 'none'; document.getElementById("gone4").style.display = 'none';
  document.getElementById("gone5").style.display = 'none'; document.getElementById("gone6").style.display = 'none'; document.getElementById("gone7").style.display = 'none'; document.getElementById("gone8").style.display = 'none'; document.getElementById("gone9").style.display = 'none';
  $scope.expression = [];
  });


  //$scope.slideHasChanged = function($index){
    //$scope.expression =


    //}


    $scope.calculate = function(expression) {
        var postfix = $calculatorFactory.infixToPostfix(expression);
        $scope.expression[$ionicSlideBoxDelegate.currentIndex()] = $calculatorFactory.solvePostfix(postfix.trim());
    }

    $scope.add = function(value) {
        if($scope.expression[$ionicSlideBoxDelegate.currentIndex()] === "" || $scope.expression[$ionicSlideBoxDelegate.currentIndex()] === undefined) {
            $scope.expression[$ionicSlideBoxDelegate.currentIndex()] = value;
        } else {
            $scope.expression[$ionicSlideBoxDelegate.currentIndex()] = $scope.expression[$ionicSlideBoxDelegate.currentIndex()] + " " + value;
        }
    }

    $scope.backspace = function(expression) {
        var toFix = $scope.expression[$ionicSlideBoxDelegate.currentIndex()];
        var afterFix = toFix.slice(0, toFix.length-2)
        $scope.expression[$ionicSlideBoxDelegate.currentIndex()] = afterFix;
    }

    $scope.clear = function(){
      $scope.expression[$ionicSlideBoxDelegate.currentIndex()] = "";
    }

    $scope.check = function(expression){
      if(expression == "P \u22c1 Q")
console.log("Right");
      
    }

})

.controller("TruthController", function($scope) {

  $scope.$on('$ionicView.enter', function () {
  	$scope.conditional = [];
  });


})

.controller("VoteCtrl", function($scope) {

	var str;

	if (str=="") {
		document.getElementById("voteCount").innerHTML="";
		return;
	}
  
	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	} 
	else { // code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function() {
		if (this.readyState==4 && this.status==200) {
		document.getElementById("voteCount").innerHTML=this.responseText;
		}
	}
	
	xmlhttp.open("GET","userinput.php",false);
	xmlhttp.send();

})


.controller("FormulaCtrl", function($scope, $timeout){

	$scope.result = '';
	$scope.get = {'A': '', 'B': '', 'C': ''};
	$scope.solveStepOne = {'determinant': '', 'quotient': ''}
	$scope.divTrue = false;
        $scope.equation = "$$\\mathbb{\\frac{-b + \\sqrt{b^2 - 4ac}}{2a}}$$";
        $scope.updateB = function (value) {
            $scope.get.B = value;
            $scope.equation = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B).concat("^2 - 4\\cdot ")
            .concat($scope.get.A).concat("\\cdot ").concat($scope.get.C).concat("}}{2\\cdot ").concat($scope.get.A).concat("}$$");
findDet();
checkEmpties();

            $timeout(this.updateMathJax, 0);
          }

                this.updateMathJax = function () {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                }

        $scope.updateA = function (value) {
            $scope.get.A = value;
            $scope.equation = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B).concat("^2 - 4\\cdot ")
            .concat($scope.get.A).concat("\\cdot ").concat($scope.get.C).concat("}}{2\\cdot ").concat($scope.get.A).concat("}$$");
findDet();
checkEmpties();

            $timeout(this.updateMathJax, 0);
          }


        $scope.updateC = function (value) {
            $scope.get.C = value;
            $scope.equation = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B).concat("^2 - 4\\cdot ")
            .concat($scope.get.A).concat("\\cdot ").concat($scope.get.C).concat("}}{2\\cdot ").concat($scope.get.A).concat("}$$");
findDet();
checkEmpties();

            $timeout(this.updateMathJax, 0);
          }

        
         function checkEmpties(){

if($scope.get.A == "")
$scope.equation = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B).concat("^2 - 4\\cdot ")
            .concat("a").concat("\\cdot ").concat($scope.get.C).concat("}}{2\\cdot ").concat("a").concat("}$$");

if($scope.get.B == "")
$scope.equation = "$$\\frac{-".concat("b").concat("+ \\sqrt{").concat("b").concat("^2 - 4\\cdot ")
            .concat($scope.get.A).concat("\\cdot ").concat($scope.get.C).concat("}}{2\\cdot ").concat($scope.get.A).concat("}$$");

if($scope.get.C == "")
$scope.equation = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B).concat("^2 - 4\\cdot ")
            .concat($scope.get.A).concat("\\cdot ").concat("c").concat("}}{2\\cdot ").concat($scope.get.A).concat("}$$");

if($scope.get.C == "" && $scope.get.A == "")
$scope.equation = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B).concat("^2 - 4\\cdot ")
            .concat("a").concat("\\cdot ").concat("c").concat("}}{2\\cdot ").concat("a").concat("}$$");

if($scope.get.B == "" && $scope.get.A == "")
$scope.equation = "$$\\frac{-".concat("b").concat("+ \\sqrt{").concat("b").concat("^2 - 4\\cdot ")
            .concat("a").concat("\\cdot ").concat($scope.get.C).concat("}}{2\\cdot ").concat("a").concat("}$$");

if($scope.get.B == "" && $scope.get.C == "")
$scope.equation = "$$\\frac{-".concat("b").concat("+ \\sqrt{").concat("b").concat("^2 - 4\\cdot ")
            .concat($scope.get.A).concat("\\cdot ").concat("c").concat("}}{2\\cdot ").concat($scope.get.A).concat("}$$");

if($scope.get.B == "" && $scope.get.C == "" && $scope.get.A == "")
$scope.equation = "$$\\frac{-".concat("b").concat("+ \\sqrt{").concat("b").concat("^2 - 4\\cdot ").concat("a ").concat("\\cdot ").concat("c").concat("}}{2\\cdot ").concat("a").concat("}$$");

}
			
      
	$scope.submit = function() {
		var a = $scope.get.A;
		var b = $scope.get.B;
		var c = $scope.get.C;

		$scope.result = (-b - Math.sqrt(b*b-4*a*c))/2*a;
	}

	$scope.showNextDiv = function() {
		$scope.divTrue = true;	
	}

	function findDet() {
		//var aD = $scope.get.A;
		//var bD = $scope.get.B;
		//var cD = $scope.get.C;
		
		//var detB = bD*bD;
		//var detAC = 4*aD*cD;
		
		//$scope.solveStepOne.determinant = "$$\\mathbb{".concat(detb).concat("}$$");  
		//$scope.solveStepOne.quotient = (2*aD);
		
		$scope.solveStepOne.determinant = "$$\\frac{-".concat($scope.get.B).concat("+ \\sqrt{").concat($scope.get.B * $scope.get.B).concat(" - ")
               .concat(4 * $scope.get.A * $scope.get.C).concat(
	"}}{").concat(2 * $scope.get.A).concat("}$$");
	}
	
	

})

.controller('InboxCtrl', function InboxCtrl ($scope) {
      $scope.meta = {
        title: "My Inbox"
      };
})


.controller("WelcomeCtrl", function($scope, $stateParams) {
});
