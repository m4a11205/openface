"use strict";
angular.module("smarthouseApp", ["ngAnimate", "ngAria", "ngCookies", "ngMessages", "ngResource", "ngRoute", "ngSanitize", "ngTouch"])
    .config(["$routeProvider", function(a) {
        a.when("/", {
                templateUrl: "views/main.html",
                controller: "MainCtrl",
                controllerAs: "main"
            })
            .when("/live-stream", {
                templateUrl: "views/live-stream.html",
                controller: "LiveStreamCtrl"
            })
            .when("/photos", {
                templateUrl: "views/photos.html",
                controller: "PhotosCtrl"
            })
            .otherwise({
                redirectTo: "/"
            })
}])
    .controller("BaseController", ["$scope", "$location", function(a, b) {
        a.isActive = function(a) {
            return a === b.url()
        }
}]), angular.module("smarthouseApp")
    .controller("MainCtrl", function() {
        this.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"]
    }), angular.module("smarthouseApp")
    .controller("LiveStreamCtrl", ["$scope", function(a) {
        a.streamStarted = !1;
        var b = "http://admin@" + window.location.hostname + ":81/video.cgi";
        a.startStream = function() {
            a.streamStarted || (a.streamStarted = !0, $("#video-stream")
                .attr("src", b))
        }
}]), angular.module("smarthouseApp")
    .controller("PhotosCtrl", ["$scope", "$http", "$interval", function(a, b, c) {
        a.photos = [];
        var d = "http://" + window.location.hostname + ":8010",
            e = 6e4,
            f = null,
            g = function() {
                b.get(d)
                    .then(function(b) {
                        a.photos = b.data
                    })
            };
        g(), f = c(g, e)
}]), angular.module("smarthouseApp")
    .run(["$templateCache", function(a) {
        var live_stream_html = `
            <div class="container" id="video-box">
                <h1>Live Stream</h1>
                <h2 ng-if="streamStarted">Stream is live!</h2>
                <h2 ng-if="!streamStarted">Stream has not started.</h2>
                <img id="video-stream" alt="start stream" ng-click="startStream()">
            </div>
        `
        var main_html = `
            <div class="jumbotron">
               <h1>Smart House</h1>
               <hr>
               <p class="lead">
                  <!--<img src="images/smarthome.png" alt="Paradrop" style=\'width: 55%\'>--> <!--<br>--> Ted, Mason, Sean<br> <a href="http://paradrop.io"><img src="images/smarthome.png" alt="Paradrop" style="width: 55%"></a>
               </p>
               <hr>
               <p><a class="btn btn-lg btn-success" ng-href="#/live-stream">Live Stream <span class="glyphicon glyphicon-facetime-video"></span></a></p>
               <p><a class="btn btn-lg btn-success" ng-href="#/photos">Photos <span class="glyphicon glyphicon-camera"></span></a></p>
            </div>
            <div class="row marketing">
               <!--\n  <h4>HTML5 Boilerplate</h4>\n  <p>\n    HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.\n  </p>\n\n  <h4>Angular</h4>\n  <p>\n    AngularJS is a toolset for building the framework most suited to your application development.\n  </p>\n\n  <h4>Karma</h4>\n  <p>Spectacular Test Runner for JavaScript.</p>\n  -->
            </div>
        `

         var photo_html = `
            <div id="photos" class="container">
               <h1>Photos</h1>
               <div ng-repeat="photo in photos track by $index" ng-if="$index % 2 === 0" class="row">
                  <div class="col-xs-6 cam-thumbnail">
                     <h5> {{ photos[$index + 0].ts | date:\'mediumTime\':\'CST\' }}</h5>
                     <img class="img-responsive" ng-src="{{photos[$index + 0].path}}" alt="A smarthouse photo">
                  </div>
                  <div class="col-xs-6 cam-thumbnail">
                     <h5> {{ photos[$index + 1].ts | date:\'mediumTime\':\'CST\' }}</h5>
                     <img class="img-responsive" ng-src="{{photos[$index + 1].path}}" alt="A smarthouse photo">
                  </div>
               </div>
            </div>
        `
        a.put("views/live-stream.html", live_stream_html),
        a.put("views/main.html", main_html),
        a.put("views/photos.html", photo_html)}]);
