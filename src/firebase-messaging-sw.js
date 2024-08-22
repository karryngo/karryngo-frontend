console.log('Service Worker script loaded.');
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyDlgFbdQlVQsRdX3b8v9U0jVJd8jFkoweY",
    authDomain: "karryngo-d25d7.firebaseapp.com",
    projectId: "karryngo-d25d7",
    storageBucket: "karryngo-d25d7.appspot.com",
    messagingSenderId: "1057740897453",
    appId: "1:1057740897453:web:bf36152947035e5bb19a24",
    measurementId: "G-VQFK85512E"
});
const messaging = firebase.messaging();

// currentMessage = new BehaviorSubject(null);

messaging.onBackgroundMessage((payload) => {
    console.log('Background Message received. ', payload);
    self.clients.matchAll({ includeUncontrolled: true }).then(clients => {
        if (clients && clients.length) {
            clients.forEach(client => {
                client.postMessage({
                    type: 'onBackgroundMessage',
                    payload: payload,
                });
            });
        }
    });
});


// If you would like to customize notifications that are received in the background (Web app is closed or not in browser focus) then you should implement this optional method
// messaging.setBackgroundMessageHandler(function (payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     var notificationTitle = 'Background Message Title';
//     var notificationOptions = {
//       body: 'Background Message body.'
  
//     };
  
//     return self.registration.showNotification(notificationTitle,
//       notificationOptions);
  
  
  
  
//   });