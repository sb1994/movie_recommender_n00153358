import firebase from 'firebase/app'
import 'firebase/storage'

let firebaseConfig = {
  apiKey: "AIzaSyDGSGAEqepK1suDDsmpzFec7M4RBCtmT6o",
  authDomain: "movie-recommender-1.firebaseapp.com",
  databaseURL: "https://movie-recommender-1.firebaseio.com",
  projectId: "movie-recommender-1",
  storageBucket: "movie-recommender-1.appspot.com",
  messagingSenderId: "310537873742",
  appId: "1:310537873742:web:9a7efd6f0a051a5b"
};
// export default firebaseConfig
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {
  storage,firebase as default
}
