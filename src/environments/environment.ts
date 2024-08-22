export const environment = {
    production: false,
    apiUrl: 'http://localhost:8090/api',
    filesUrl: 'http://localhost:8090/',
    chatUrl: 'http://localhost:8090',
    socket_url: 'http://localhost:8090',
    url: 'http://localhost:8090',
    // apiUrl: 'https://164.160.89.232/api',
    // filesUrl: 'https://164.160.89.232/',
    // chatUrl: 'https://164.160.89.232',
    // socket_url: 'https://164.160.89.232',
    // url: 'https://164.160.89.232',
    // apiUrl: 'http://localhost:8090/api',
    // filesUrl: 'http://localhost:8090/',
    // apiBrands: 'https://private-anon-53f501b287-carsapi1.apiary-mock.com/manufacturers',
    apiBrands: 'https://private-anon-8d121d61f2-carsapi1.apiary-mock.com/manufacturers',
    url_countries: "https://restcountries.eu/rest/v2/all",
    //  apiUrl: 'http://164.160.89.211:8090/api',
    application:
    {
        name: 'karryngo',
        angular: 'Angular 11.0.0',
        bootstrap: 'Bootstrap 5.0.0',
        fontawesome: 'Font Awesome 5.15.1',
    },
    //url: 'http://localhost:5004',
    // url: 'https://164.160.89.232',
    // socket_url: 'https://karryngo.herokuapp.com',
    // url: 'https://karryngo.herokuapp.com',
    config: {
        /* SELECT ONE OF THOSE CONFIGURATIONS */

        /* LOCAL JSON (NO CRUD) */
        api: false,
        url: './assets/params/json/trips/',

        /* LOCAL REST API CRUD  */
        /* api: true,
        url: 'http://localhost:5200/', */
    },
    firebase: {
        apiKey: "AIzaSyDlgFbdQlVQsRdX3b8v9U0jVJd8jFkoweY",
        authDomain: "karryngo-d25d7.firebaseapp.com",
        projectId: "karryngo-d25d7",
        storageBucket: "karryngo-d25d7.appspot.com",
        messagingSenderId: "1057740897453",
        appId: "1:1057740897453:web:bf36152947035e5bb19a24",
        measurementId: "G-VQFK85512E",
        // vapidKey: "BBZBIdCYhW_ivak7EE61XBgwOaIR9ibWGCYfkvu2hj0NBxTkvPHwtbyDsunMh00DxPMe8BLpkAP7auKIBH09hYs"
        vapidKey: "BAfIV7TmmAEBwi7wFNQ0155tikJ5O-GoTlgxjf0TdJc30YFkS3MoV2B6AhGIqdyHlf0i3PzuoNtpG6RnySNJCDg"
    },
    resetCode: "7e08c29af79bdfdd58aef05c8bba417af3b514680640c06f0b8f6a6149b87232fde82c5b0001e70237277d1d43f86084e672a79f17b981f079ff8dd6b05b198f"
    // firebase: {
    //     databaseURL: 'https://karry-n-go.firebaseio.com',
    //     apiKey: 'AIzaSyCOX5wXZyToH9HhBfrzTbA-6RgCzAecllE',
    //     authDomain: 'karry-n-go.firebaseapp.com',
    //     projectId: 'karry-n-go',
    //     storageBucket: 'karry-n-go.appspot.com',
    //     messagingSenderId: '294710515571',
    //     appId: '1:294710515571:web:010a1ab080436d5ae25706',
    //     measurementId: 'G-XVN0CTSLT3'
    // }
};
