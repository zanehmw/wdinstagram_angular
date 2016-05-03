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
  PicIndexControllerFunc.$inject = [ "$resource" ];
  function PicIndexControllerFunc($resource) {
    var indexVm = this;
    indexVm.pics = $resource("http://localhost:3000/entries").query();
    indexVm.newPic = "";

    indexVm.create = function() {
      pics.unshift({title: indexVm.newPic});
      indexVm.newPic = "";
    };
  }

  PicShowControllerFunc.$inject = [ "$stateParams"];
  function PicShowControllerFunc($stateParams) {
    var showVm = this;
    showVm.pic = $resource("http://localhost:3000/entries").get({id:$stateParams.id},
      function() {}
    );

    showVm.update = function() {
      pics[$stateParams.id].title = showVm.pic;
    };

    showVm.delete = function() {
      pics.splice( $stateParams.id, 1);
    }
  };

})();
