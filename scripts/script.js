var app = angular.module('app', ['ngRoute', 'appServices', 'appControlles', 'appDirectives']);
var appControlles = angular.module('appControlles', []);
var appServices = angular.module('appServices', []);
var appDirectives = angular.module('appDirectives', []);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]);
var Sample;
(function (Sample) {
    var Controllers;
    (function (Controllers) {
        appControlles.controller('MainCtrl', [
            '$scope',
            'mainService',
            function ($scope, mainService) { return new MainCtrl($scope, mainService); }
        ]);
        var MainCtrl = (function () {
            function MainCtrl($scope, mainService) {
                $scope.model = this;
                this.files = [
                    {
                        id: 1,
                        name: "moai"
                    },
                    {
                        id: 2,
                        name: "halfball"
                    },
                    {
                        id: 3,
                        name: "mesh"
                    },
                    {
                        id: 4,
                        name: "bunny"
                    },
                    {
                        id: 5,
                        name: "plane"
                    }
                ];
                this.currentFile = this.files[0];
            }
            return MainCtrl;
        })();
        Controllers.MainCtrl = MainCtrl;
    })(Controllers = Sample.Controllers || (Sample.Controllers = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Services;
    (function (Services) {
        appServices.factory('mainService', [
            '$http',
            function ($http) { return new MainService($http); }
        ]);
        var MainService = (function () {
            function MainService($http) {
                this.$http = $http;
            }
            return MainService;
        })();
        Services.MainService = MainService;
    })(Services = Sample.Services || (Sample.Services = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Directives;
    (function (Directives) {
        appDirectives.directive('visualizer', [function () {
            return {
                scope: {
                    file: '=',
                    width: '=',
                    height: '=',
                },
                restrict: 'E',
                templateUrl: '/views/visualizer.html',
                link: Visualizer
            };
        }]);
        var Visualizer = (function () {
            function Visualizer(scope, element, attrs) {
                var _this = this;
                this.width = 800;
                this.height = 600;
                scope.$watch('file', function (file) {
                    loader.load("assets/" + file.name + ".vtk");
                });
                if (!Detector.webgl)
                    Detector.addGetWebGLMessage();
                this.camera = new THREE.PerspectiveCamera(60, this.width / this.width, 0.001, 10000);
                this.camera.position.z = 25;
                this.camera.position.y = 0;
                this.camera.position.x = 0;
                this.scene = new THREE.Scene();
                this.scene.add(this.camera);
                var dirLight = new THREE.DirectionalLight(0xffffff);
                dirLight.position.set(200, 200, 1000).normalize();
                this.camera.add(dirLight);
                this.camera.add(dirLight.target);
                this.renderer = new THREE.WebGLRenderer({ antialias: false });
                this.renderer.setSize(this.width, this.height);
                this.container = document.getElementById('visualizer');
                this.container.appendChild(this.renderer.domElement);
                this.controls = new THREE.TrackballControls(this.camera, this.container);
                this.controls.rotateSpeed = 5.0;
                this.controls.zoomSpeed = 5;
                this.controls.panSpeed = 2;
                this.controls.noZoom = false;
                this.controls.noPan = false;
                this.controls.staticMoving = true;
                this.controls.dynamicDampingFactor = 0.3;
                this.stats = new Stats();
                this.stats.domElement.style.position = 'absolute';
                this.stats.domElement.style.top = '0px';
                document.body.appendChild(this.stats.domElement);
                window.addEventListener('resize', onWindowResize, false);
                var loader = new THREE.VTKLoader();
                loader.addEventListener('load', function (event) {
                    for (var i = 0; i < _this.scene.children.length; i++) {
                        var child = _this.scene.children[i];
                        if (child.name == 'figure') {
                            _this.scene.remove(child);
                        }
                    }
                    console.log(_this.scene.children[_this.scene.children.length - 1]);
                    var material = new THREE.MeshLambertMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
                    var geometry = event.content;
                    var mesh = new THREE.Mesh(geometry, material);
                    mesh.name = "figure";
                    _this.scene.add(mesh);
                });
                animate();
                function onWindowResize() {
                }
                function animate() {
                    requestAnimationFrame(animate);
                    this.controls.update();
                    this.renderer.render(this.scene, this.camera);
                    this.stats.update();
                }
            }
            return Visualizer;
        })();
        Directives.Visualizer = Visualizer;
    })(Directives = Sample.Directives || (Sample.Directives = {}));
})(Sample || (Sample = {}));
//# sourceMappingURL=script.js.map