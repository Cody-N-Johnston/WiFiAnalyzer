import Firebase from 'firebase';

let config = {
    apiKey: "XXXX",
    authDomain: "XXXX.firebaseapp.com",
    databaseURL: "https://XXXX.firebaseio.com",
    projectId: "XXXX",
    storageBucket: "XXXX.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXXX"

}

let app = Firebase.initializeApp(config);
export const db = app.database();

