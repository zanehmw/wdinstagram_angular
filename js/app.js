"use strict";

(function(){
  angular
  .module("wdinstagram", [
    "ui.router"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("PicIndexController", PicIndexController)

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
      templateUrl: "js/show.html"
    });
  }

  var pics = [
    {
      photo_url: "http://s3-media4.fl.yelpcdn.com/bphoto/6Cb6_yk8GErfdKViOAQGow/o.jpg",
      author:"Zaneh",
      body: "I like pizza"
    },
    {
      photo_url: "http://static5.techinsider.io/image/5660a0e884307621008b73a3-2518-1268/jon-snow-game-of-thrones.png",
      author: "Sally",
      body: "I like to watch tv"
    },
    {
      photo_url: "http://www.jobacle.com/wp-content/uploads/2016/03/air-760325_960_720.jpg",
      author: "Sam",
      body: "I like to travel"
    }
  ]

  function PicIndexController() {
    var indexVm = this;
    indexVm.pics = pics;
  }

})();
