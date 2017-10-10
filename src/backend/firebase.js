import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import axios from 'axios'
Vue.use(VueFire)

function isset (o) {
  return typeof o !== 'undefined'
}

export const appState = {
  useCMS: false,
  useRT: false,
  loading: false,
  ready: false,
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

export function restoreStates ({ done }) {
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
    appState.ready = true
    done()
  })
}

var googleLoginProvider
export function loginGoogle () {
  appState.loading = true
  googleLoginProvider = googleLoginProvider || new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(googleLoginProvider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken
    // The signed-in user info.
    var user = result.user
    // ...
    appState.user = user
    appState.loading = false
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
    appState.loading = false
    console.log(errorMessage)
  })
}

export function logout () {
  appState.loading = true
  firebase.auth().signOut().then(function () {
    appState.user = null
    appState.loading = false
  }).catch(function () {
    appState.user = null
    appState.loading = false
  })
}

export const api = {}
export function connectFirebase ({ done }) {
  if (!api.firebase) {
    api.firebase = firebase.initializeApp({
      apiKey: 'AIzaSyBJaCgoUfzKM5be6DAQvB48tKmbqlqtHTE',
      authDomain: 'loklokcms.firebaseapp.com',
      databaseURL: 'https://loklokcms.firebaseio.com',
      projectId: 'loklokcms',
      storageBucket: 'loklokcms.appspot.com',
      messagingSenderId: '902996908267'
    })
    api.db = api.firebase.database()
    api.storage = firebase.storage()
  }
  restoreStates({ done })
  return api
}

export function readyRT () {
  return new Promise((resolve, reject) => {
    connectFirebase({ done: () => {
      resolve(appState)
    } })
  })
}

export function cleanseForUpload (obj) {
  obj = {
    ...obj
  }
  delete obj['.key']
  return obj
}

export function getStyles () {
  return axios.get('https://loklokcms.firebaseio.com/cms-data/styles.json')
  .then((response) => {
    return transform(response.data)
  })
}

export function transform (obj) {
  var bucket = []
  var keys = Object.keys(obj)
  for (var i = 0; i < keys.length; i++) {
    bucket.push({
      '.key': keys[i],
      ...obj[keys[i]]
    })
  }
  return bucket
}
