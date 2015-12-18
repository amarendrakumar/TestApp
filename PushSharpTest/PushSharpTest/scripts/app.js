(function () {

    var MyApp = angular.module('MyApp', ['ngCordova']);

    MyApp.directive('test', function ($compile) {
        return {
            restrict: 'E',
            scope: { text: '@' },
            template: '<p ng-click="add()">{{text}}</p>',
            controller: function ( $scope, $element ) {
                $scope.add = function () {
                    var el = $compile( "<test text='n'></test>" )( $scope );
                    $element.parent().append( el );
                };
            }
        };
    });


    MyApp.controller('Apple', function ($scope) {
debugger
        $scope.Amar = "Amarendra Kumar Amar";
        //"Amar"
      
    });

    MyApp.controller('MainCtrl', function ($scope, $cordovaDialogs) {
       
        $scope.count = 0;
    //    $cordovaDialogs.alert('message', 'title', 'button name')
    //.then(function () {
    //    // callback success
    //});

    //    $cordovaDialogs.confirm('message', 'title', ['button 1', 'button 2'])
    //      .then(function (buttonIndex) {
    //          // no button = 0, 'OK' = 1, 'Cancel' = 2
    //          var btnIndex = buttonIndex;
    //      });

    //    $cordovaDialogs.prompt('msg', 'title', ['btn 1', 'btn 2'], 'default text')
    //      .then(function (result) {
    //          var input = result.input1;
    //          // no button = 0, 'OK' = 1, 'Cancel' = 2
    //          var btnIndex = result.buttonIndex;
    //      });

    //    // beep 3 times
    //    $cordovaDialogs.beep(3);
    });
    
    //Directive that returns an element which adds buttons on click which show an alert on click
    MyApp.directive("addbuttonsbutton", function () {
        return {
            restrict: "E",
            template: "<button addbuttons>Click to add buttons</button>"
        }
    });

    //Directive for adding buttons on click that show an alert on click
    MyApp.directive("addbuttons", function ($compile) {
        return function (scope, element, attrs) {
            element.bind("click", function () {
                scope.count++;
                angular.element(document.getElementById('space-for-buttons')).append($compile("<div><button class='btn btn-default' data-alert=" + scope.count + ">Show alert #" + scope.count + "</button></div>")(scope));
            });
        };
    });

    //Directive for showing an alert on click
    MyApp.directive("alert", function () {
        return function (scope, element, attrs) {
            element.bind("click", function () {
                console.log(attrs);
                alert("This is alert #" + attrs.alert);
            });
        };
    });


    MyApp.controller('MyCtrl', function ($scope, $cordovaDevice) {
        debugger
        document.addEventListener("deviceready", function () {
            var device1 = $cordovaDevice.getDevice();

            $scope.device1 = device1;
            var cordova = $cordovaDevice.getCordova();
            $scope.cordova = cordova;
            var model = $cordovaDevice.getModel();
            $scope.model = model;
            var platform = $cordovaDevice.getPlatform();
            $scope.platform = platform;
            var uuid = $cordovaDevice.getUUID();
            $scope.uuid = uuid;
            var version = $cordovaDevice.getVersion();
            $scope.version = version;

        }, false);

        //var device = $cordovaDevice.getDevice();

        $scope.device = device.uuid;
        //var cordova = $cordovaDevice.getCordova();
        //$scope.cordova = cordova;
        //var model = $cordovaDevice.getModel();
        //$scope.model = model;
        //var platform = $cordovaDevice.getPlatform();
        //$scope.platform = platform;
        //var uuid = $cordovaDevice.getUUID();
        //$scope.uuid = uuid;
        //var version = $cordovaDevice.getVersion();
        //$scope.version = version;
    });



    MyApp.run(function ($cordovaPush) {
        //debugger
        var androidConfig = {
            "senderID": "744011430246",
        };

        document.addEventListener("deviceready", function () {
            debugger
            $cordovaPush.register(androidConfig).then(function (result) {
                // Success
              //  debugger
                alert("Success androidConfig register" + result);
            }, function (err) {
                // Error
                alert("Error androidConfig register" + result);
            })

            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
              debugger
                switch (notification.event) {
                    case 'registered':
                        if (notification.regid.length > 0) {
                            alert('registration ID = ' + notification.regid);
                        }
                        break;

                    case 'message':
                        // this is the actual push notification. its format depends on the data model from the push server
                        alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                        break;

                    case 'error':
                        alert('GCM error = ' + notification.msg);
                        break;

                    default:
                        alert('An unknown GCM event has occurred');
                        break;
                }
            });


            // WARNING: dangerous to unregister (results in loss of tokenID)
            $cordovaPush.unregister(options).then(function (result) {
                // Success!
            }, function (err) {
                // Error
            })

        }, false);
    });

})();

