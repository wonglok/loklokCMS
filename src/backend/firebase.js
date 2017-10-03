import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
Vue.use(VueFire)

export default firebase

function isset (o) {
  return typeof o !== 'undefined'
}

export const appState = {
  user: null,
  get name () {
    if (!appState.user) { return '' }
    return appState.user.displayName
  },
  get pic () {
    if (!appState.user) { return '' }
    return appState.user.photoURL
  },
  get loggedIn () {
    if (appState.user && isset(appState.user.uid)) {
      return true
    } else {
      return false
    }
  }
}

export const fire = firebase.initializeApp({
  apiKey: 'AIzaSyBJaCgoUfzKM5be6DAQvB48tKmbqlqtHTE',
  authDomain: 'loklokcms.firebaseapp.com',
  databaseURL: 'https://loklokcms.firebaseio.com',
  projectId: 'loklokcms',
  storageBucket: 'loklokcms.appspot.com',
  messagingSenderId: '902996908267'
})

export const googleLoginProvider = new firebase.auth.GoogleAuthProvider()

export function hydrate () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // ...
      appState.user = user
    } else {
      appState.user = null
      // router.push({
      //   path: '/'
      // })
    }
  })
}

export function loginGoogle () {
  firebase.auth().signInWithPopup(googleLoginProvider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken
    // The signed-in user info.
    var user = result.user
    // ...
    appState.user = user
  }).catch(function (error) {
    // Handle Errors here.
    // var errorCode = error.code

    var errorMessage = error.message
    // The email of the user's account used.
    // var email = error.email
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential
    // ...

    appState.user = null
    console.log(errorMessage)
  })
}

export function logout () {
  firebase.auth().signOut().then(function () {
    appState.user = null
  }).catch(function () {
    appState.user = null
  })
}

export const db = fire.database()

export const storage = firebase.storage()
export const images = db.ref('/cms/images')

