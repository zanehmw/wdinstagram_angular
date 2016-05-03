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
  .factory("PicFactory", PicFactoryFunc);

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("picIndex", {
      url: "/pics",
      templateUrl: "js/index.html",
      controller: "PicIndexController",
      controllerAs: "indexVm"
    })
    .state("picShow", {
      url: "/index/:id",
      templateUrl: "js/show.html",
      controller: "PicShowController",
      controllerAs: "showVm"
    });
  }

PicFactoryFunc.$inject = [ "$resource" ];
function PicFactoryFunc($resource) {
  return $resource("http://localhost:3000/entries/:id")
}

  PicIndexControllerFunc.$inject = [ "PicFactory" ];
  function PicIndexControllerFunc(PicFactory) {
    var indexVm = this;
    indexVm.pics = PicFactory.query();
    indexVm.newPic = new PicFactory();

    indexVm.create = function($state) {
      indexVm.newPic.$save().then(function(res) {
        indexVm.pics.push(res)
      })
    };
  }

  PicShowControllerFunc.$inject = [ "PicFactory", "$stateParams"];
  function PicShowControllerFunc(PicFactory, $stateParams) {
    var showVm = this;
    showVm.pic = PicFactory.get({id: $stateParams.id});

    showVm.update = function() {
      pics[$stateParams.id].title = showVm.pic;
    };

    showVm.delete = function() {
      showVm.pic.$delete({id: $stateParams.id})
    }
  };

})();
