using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using PushSharp;
using PushSharp.Android;
using PushSharp.Apple;
using PushSharp.Core;
using System.IO;

namespace PushSharpWeb
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {



            if (!string.IsNullOrEmpty(txtNotification.Text))
            {
                //create the puchbroker object
                var push = new PushBroker();
                //Wire up the events for all the services that the broker registers
                push.OnNotificationSent += NotificationSent;
                push.OnChannelException += ChannelException;
                push.OnServiceException += ServiceException;
                push.OnNotificationFailed += NotificationFailed;
                push.OnDeviceSubscriptionExpired += DeviceSubscriptionExpired;
                push.OnDeviceSubscriptionChanged += DeviceSubscriptionChanged;
                push.OnChannelCreated += ChannelCreated;
                push.OnChannelDestroyed += ChannelDestroyed;

                //Here I am looping on my device collection. 
                //Use your own way to handle this
                //List<Device> rows = 
                //    new List<Device>(CommonMethods.entity.Devices.ToList());
                List<Device> rows = new List<Device>();
               // var dv1 = new Device { deviceid = "cf7c5b50818c0ccf60ade328c957125cd5481464942f5ff85c3e05a07e608a2b", devicename = "ios" };
               // var dv2 = new Device { deviceid = "aed4a629ee0fb379e6a41d4b32a49b3b12d0d036dc459c357d9fe26a7af6971e", devicename = "ios" };
                var dv3 = new Device { deviceid = "c3f2edb5544824e440cfe49b4bfea64efd81bd6447fef446ed626d15ceb64209", devicename = "ios" };
                //rows.Add(dv1);
                //rows.Add(dv2);
                rows.Add(dv3);
                foreach (Device row in rows)
                {

                    if (row.devicename == "ios")
                    {
                        //-------------------------
                        // APPLE NOTIFICATIONS
                        //-------------------------
                        //Configure and start Apple APNS
                        // IMPORTANT: Make sure you use the right Push certificate.  Apple allows you to
                        //generate one for connecting to Sandbox, and one for connecting to Production.  You must
                        // use the right one, to match the provisioning profile you build your
                        //   app with!
                        try
                        {
                            var appleCert = File.ReadAllBytes(Server.MapPath("pushsharp.p12"));
                            //IMPORTANT: If you are using a Development provisioning Profile, you must use
                            // the Sandbox push notification server 
                            //  (so you would leave the first arg in the ctor of ApplePushChannelSettings as
                            // 'false')
                            //  If you are using an AdHoc or AppStore provisioning profile, you must use the 
                            //Production push notification server
                            //  (so you would change the first arg in the ctor of ApplePushChannelSettings to 
                            //'true')
                            push.RegisterAppleService(new ApplePushChannelSettings(false, appleCert, "Globrin@123"));
                            //Extension method
                            //Fluent construction of an iOS notification
                            //IMPORTANT: For iOS you MUST MUST MUST use your own DeviceToken here that gets
                            // generated within your iOS app itself when the Application Delegate
                            //  for registered for remote notifications is called, 
                            // and the device token is passed back to you
                            push.QueueNotification(new AppleNotification()
                                                        .ForDeviceToken(row.deviceid)//the recipient device id
                                                        .WithAlert(txtNotification.Text)//the message
                                                        .WithBadge(1)
                                                        .WithSound("sound.caf")
                                                        );


                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                    }


                    if (row.devicename == "android")
                    {
                        //---------------------------
                        // ANDROID GCM NOTIFICATIONS
                        //---------------------------
                        //Configure and start Android GCM
                        //IMPORTANT: The API KEY comes from your Google APIs Console App, 
                        //under the API Access section, 
                        //  by choosing 'Create new Server key...'
                        //  You must ensure the 'Google Cloud Messaging for Android' service is 
                        //enabled in your APIs Console
                        push.RegisterGcmService(new
                         GcmPushChannelSettings("AIzaSyD9q9e6y8cFeyXmmZ7iJWjqC6NapjWCf20"));
                        //Fluent construction of an Android GCM Notification
                        //IMPORTANT: For Android you MUST use your own RegistrationId 
                        //here that gets generated within your Android app itself!
                        push.QueueNotification(new GcmNotification().ForDeviceRegistrationId("DEVICE REGISTRATION ID HERE").WithJson("{\"alert\":\"Hello World!\",\"badge\":7,\"sound\":\"sound.caf\"}"));
                    }

                    push.StopAllServices(waitForQueuesToFinish: true);
                }
            }
        }

        //Currently it will raise only for android devices
        static void DeviceSubscriptionChanged(object sender,
        string oldSubscriptionId, string newSubscriptionId, INotification notification)
        {
            //Do something here
        }

        //this even raised when a notification is successfully sent
        static void NotificationSent(object sender, INotification notification)
        {
            //Do something here
        }

        //this is raised when a notification is failed due to some reason
        static void NotificationFailed(object sender,
        INotification notification, Exception notificationFailureException)
        {
            //Do something here
            PushSharp.Apple.NotificationFailureException ss = (PushSharp.Apple.NotificationFailureException)notificationFailureException;
        }

        //this is fired when there is exception is raised by the channel
        static void ChannelException
            (object sender, IPushChannel channel, Exception exception)
        {
            //Do something here
        }

        //this is fired when there is exception is raised by the service
        static void ServiceException(object sender, Exception exception)
        {
            //Do something here
        }

        //this is raised when the particular device subscription is expired
        static void DeviceSubscriptionExpired(object sender,
        string expiredDeviceSubscriptionId,
            DateTime timestamp, INotification notification)
        {
            //Do something here
        }

        //this is raised when the channel is destroyed
        static void ChannelDestroyed(object sender)
        {
            //Do something here
        }

        //this is raised when the channel is created
        static void ChannelCreated(object sender, IPushChannel pushChannel)
        {
            //Do something here
        }
    }
}