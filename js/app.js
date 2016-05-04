"use strict";

(function(){
  angular
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("PicIndexController", PicIndexControllerFunc)
  .controller("PicShowController", PicShowControllerFunc)
  .factory("PicFactory", PicFactoryFunc)
  .directive("pic", ["$stateParams", function($stateParams) {
    return {
      templateUrl: "js/_pic.html",
      restrict: "E",
      replace: true,
      scope: {
        pic: "=",
        showEdit: "="
      },
      link: function(scope) {
        console.log(scope)
        scope.update = function() {
          scope.pic.$update({id: scope.pic.id});
        };

        scope.delete = function() {
          scope.pic.$delete({id: scope.pic.id})
        }
      }
    }
  }]);

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("picIndex", {
      url: "/pics",
      templateUrl: "js/index.html",
      controller: "PicIndexController",
      controllerAs: "indexVm"
    })
    .state("picShow", {
      url: "/pics/:id",
      templateUrl: "js/show.html",
      controller: "PicShowController",
      controllerAs: "showVm"
    });
  }

PicFactoryFunc.$inject = [ "$resource" ];
function PicFactoryFunc($resource) {
  return $resource("http://localhost:3000/entries/:id", {}, {
    update: {method: "PUT"}
  })
}

  PicIndexControllerFunc.$inject = [ "PicFactory" ];
  function PicIndexControllerFunc(PicFactory) {
    var indexVm = this;
    indexVm.pics = PicFactory.query();
    indexVm.newPic = new PicFactory();

    indexVm.create = function($state) {
      indexVm.newPic.$save().then(function(res) {
        indexVm.pics.push(res)
        indexVm.newPic = new PicFactory();
      })
    };
  }

  PicShowControllerFunc.$inject = [ "PicFactory", "$stateParams"];
  function PicShowControllerFunc(PicFactory, $stateParams) {
    var showVm = this;
    showVm.pic = PicFactory.get({id: $stateParams.id});

  };

})();
