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
var pvs = {
  leds:[
    { pvname: "may:led0" }, { pvname: "may:led1" }, { pvname: "may:led2" },
    { pvname: "may:led3" }, { pvname: "may:led4" }, { pvname: "may:led5" }, { pvname:"may:newLED" }]
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
  factory.now = function(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
  }
  return factory;
});
/* end - 自定义函数factory =>  使用一些JS语法或函数*/

/* start - ledsCtrl */
app.controller('ledsCtrl', function ($scope, JsService) {
  $scope.valled=[0,0,1,0,1,1];
  $scope.led4=4;
  $scope.led5=5;
  $scope.newLED=7;
  $scope.ps=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  $scope.date=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  async.map(pvs.leds, function (item, callback) {
    socket.on(item.pvname, function (data) {
      $scope.$apply(function () {	//手动出发脏检查。必须有这步才能自动通知angular的module和controller，$scope.bang发生变化了。详见腾讯课堂教程《$scope》节
        switch (item.pvname) {
          case "may:led0":
            $scope.valled[0]=data;
            break;
          case "may:led1":
            $scope.valled[1]=data;
            break;
          case "may:led2":
            $scope.valled[2]=data;
            break;
          case "may:led3":
            $scope.valled[3]=data;
            break;
          case "may:led4":
            $scope.led4=data;
            break;
          case "may:led5":
            $scope.led5=data;
            break;
          case "may:newLED":
            $scope.newLED=data;
            JsService.shift($scope.ps);
            JsService.push($scope.ps,data);
            JsService.shift($scope.date);
            JsService.push($scope.date,JsService.now());
            break;
          default:
            break;
        }					

      })
      //***end of $scope.$apply***//
    });
    //***end of socket.on***//
  });
  //***end of async.map***//
//需要绑定$scope但不需要脏检查的程序写在这里

}, function (err, results) {
  callback(err, results);
});
/* end - ledsCtrl */

/* end - angularJS script */