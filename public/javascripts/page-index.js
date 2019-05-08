var headerDIV=document.getElementById("headerDIV");
headerDIV.style.height=window.innerHeight+"px";
var headerW=document.getElementById("header").clientWidth;
var headerH=document.getElementById("header").clientHeight;
var diagramContainer=document.getElementById("diagramContainer");
var navH=document.getElementById("mainNav").offsetHeight;
diagramContainer.style.width=headerW+"px";
diagramContainer.style.height=headerH-navH+"px";
document.querySelector("#diagramSvg").setAttribute("width",headerW+"px");
document.querySelector("#diagramSvg").setAttribute("height",headerH-navH+"px");

//socket模块和epics变量模块定义
var serverIP="10.10.33.102";
var socket = io.connect(serverIP+':3000');
var pvs={
  htsePV:[
		{ pvname: "may:bang1" }]
}

/* start - angularJS script */
var app = angular.module('myApp', []);

/* start - 自定义函数factory =>  使用一些JS语法或函数*/
app.factory('JsService', function(){
  var factory = {};
  factory.mod = function(x,y){
    return x%y;
  };
  factory.toString = function(val,num){
    return val.toString(num);
  };
  factory.shift = function(arr){
    return arr.shift();
  }
  factory.push = function(arr,item){
    return arr.push(item);
  }
  factory.pop = function(arr){
    return arr.pop();
  }
  factory.unshift = function(arr,item){
    return arr.unshift(item);
  }
  factory.now = function(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  }
  return factory;
});
// app.factory('JsFunction', function(){
//   var factory = {};
//   factory.whichElement = function whichElement(e){
//     // alert("You clicked on a " + tname + " element.")
//     e.target.parentNode.style.stroke="green";
//     e.target.parentNode.style.fill="green";
//     if(e.target.tagName=="rect") {
//       e.target.style.stroke="black";
//     }
//   }
//   return factory;
// });
/* end - 自定义函数factory =>  使用一些JS语法或函数*/

/* start - ledsCtrl */
app.controller('ledsCtrl', function ($scope, JsService) {
  $scope.ps=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  $scope.date=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  $scope.num=1;
  $scope.valveColor="red";

  async.map(pvs.htsePV, function (item, callback) {
    socket.on(item.pvname, function (data) {
      $scope.$apply(function () {
        if($scope.num<27){
          $scope.num=$scope.num+1;
        } else {
          $scope.num=1;
        }
        JsService.pop($scope.ps);
        JsService.unshift($scope.ps,(data*$scope.num).toFixed(1));
        JsService.pop($scope.date);
        JsService.unshift($scope.date,JsService.now());
      })
      //***end of $scope.$apply***//
    });
    //***end of socket.on***//
  });
  //***end of async.map***//
//需要绑定$scope但不需要脏检查的程序写在这里
// app.controller('JsClick',function($scope,JsFunction){
//   $scope.setValveColor = function(volveColor) {
//     JsFunction.whichElement(e);
//   }
// })

}, function (err, results) {
  callback(err, results);
});
/* end - ledsCtrl */
/* end - angularJS script */

function whichElement(e){
  // alert("You clicked on a " + tname + " element.")
  if(e.target.className.baseVal=="volve" || e.target.parentNode.className.baseVal=="volve"){
    e.target.parentNode.style.stroke=(e.target.parentNode.style.stroke=="red"? "orange" : "red");
    e.target.parentNode.style.fill=(e.target.parentNode.style.fill=="red"? "orange" : "red");
    if(e.target.tagName=="rect") {
      e.target.style.stroke="black";
    }
  }
}