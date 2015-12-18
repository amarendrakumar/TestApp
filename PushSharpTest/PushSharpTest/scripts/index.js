// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    var pushNotification;
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        //alert("Amar");
        pushNotification = window.plugins.pushNotification;
        debugger

        pushNotification.register(successHandler,errorHandler,{'senderID': '744011430246','ecb': 'onNotificationGCM' });
     
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    var deviceregistrationid = localStorage.getItem('deviceregistrationid');
   // var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");

    //set push notifications handler
    document.addEventListener('push-notification', function (event) {
        debugger
        var title = event.notification.title;
        var userData = event.notification.userdata;

        if (typeof (userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
        alert(title);
    });

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };



    function DeviceTokenAndroid() {
        debugger
      


    }
    function successHandler(result) {
        debugger
        alert("device token: " + result);
        console.log('Success: ' + result);
    }

    function errorHandler(error) {
        debugger
        alert("Error :  " + error)
        console.log('Error: ' + error);
    }

    function tokenHandler(result) {
        console.log('device token: ' + result);
        // This is a device token you will need later to send a push
        // Store this to PubNub to make your life easier :-)
    }
    function onNotificationGCM(e) {
        debugger
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    // deviceRegistered(e.regid);
                    alert("registered :  " + e.regid)
                }
                break;

            case 'message':
                if (e.foreground) {
                    // When the app is running foreground. 
                    alert('The room temperature is set too high')
                }
                break;

            case 'error':
                console.log('Error: ' + e.msg);
                break;

            default:
                console.log('An unknown event was received');
                break;
        }
    }



} )();