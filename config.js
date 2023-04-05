import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyACpfOuv6wqa4RYOKSqIfq-rrAgrXPhkOM",
  authDomain: "ky-11ab9.firebaseapp.com",
  projectId: "ky-11ab9",
  storageBucket: "ky-11ab9.appspot.com",
  messagingSenderId: "557517379314",
  appId: "1:557517379314:web:de839a5aec37dc34f5a26b",
  measurementId: "G-N3CS0L7H7T"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
