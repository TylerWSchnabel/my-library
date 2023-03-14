import './App.css';
import { useEffect, useState } from 'react';
import NewCard from './components/NewCard';
import uniqid from 'uniqid';
import profilePic from './components/files/StockAvatar.jpeg'

import { initializeApp, firebase } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  query,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs
} from 'firebase/firestore';
import 'firebase/firestore';

// Required for side-effects


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



function App() {

  const [library, setLibrary] = useState([]);
  const [read, setRead] = useState(0);


  useEffect(() =>{
    ifSignedIn();
    totalRead();
  });
//Firebase Functions

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrnQQD5Avmfdy_Rn6_1XnO9BQYnecxEQ8",
  authDomain: "library-1313.firebaseapp.com",
  databaseURL: "https://library-1313-default-rtdb.firebaseio.com",
  projectId: "library-1313",
  storageBucket: "library-1313.appspot.com",
  messagingSenderId: "686649559449",
  appId: "1:686649559449:web:8325fa8c65bcd355376b08",
  measurementId: "G-57LJQNHPC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig); */

async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
  ifSignedIn();
  loadLibrary();
}

function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth()).then(()=>
  ifSignedIn());
  const newLib = [];
  setLibrary(newLib);
  loadLibrary();
}

const ifSignedIn = () =>{
  if (isUserSignedIn() === true){
    document.getElementById('sign-in').style.display = 'none';
    document.getElementById('sign-out').style.display = 'block';
    document.getElementById('user-name').textContent = getUserName();
    document.getElementById('user-pic').src = getProfilePicUrl();
    document.getElementById('user-pic').style.display = 'block';
    document.getElementById('user-name').style.display = 'block';
  } else {
    document.getElementById('sign-out').style.display = 'none'
    document.getElementById('sign-in').style.display = 'block'
    document.getElementById('user-pic').src = profilePic;
    document.getElementById('user-name').style.display = 'none';
    console.log('signed-out  =  ' + isUserSignedIn());

  }
}


// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}

async function saveLibrary(book) {
  console.log(library);
  // Add a new message entry to the Firebase database.
  try {
    await setDoc(doc(db, 'library: '+ getUserName(), book.title), {
      name: book.title,
      userId: getAuth().currentUser.uid,
      title: book.title, 
      author: book.author, 
      pageCount: book.pageCount, 
      read: book.read,
      timestamp: serverTimestamp(),
      id: uniqid()
  });
  }
  catch(error) {
    console.error('Error writing new library to Firebase Database', error);
  }
}

function loadLibrary() {
  // Create the query to load the last 12 messages and listen for new ones.
  const recentLibraryQuery = query(collection(getFirestore(), 'library: '+ getUserName()));
  // Start listening to the query.
  const newLib = [];
  onSnapshot(recentLibraryQuery, function(snapshot) {
    
    snapshot.docChanges().forEach(function(change) {
        var book = change.doc.data();
        newLib.push({title: book.title, 
          author: book.author, 
          pageCount: book.pageCount, 
          read: book.read,
          timestamp: serverTimestamp(),
          id: uniqid()
        });
        
  });
  setLibrary(newLib);
}) 


};

//End Firebase Functions



const openForm=()=>{
    document.getElementById("addBook").style.display = "block";
}

const closeForm=()=>{
    document.getElementById("addBook").style.display = "none";
}

const resetForm =()=> {
  var formTitle = document.getElementById('title');
  var formAuthor = document.getElementById('author');
  var formPageCount = document.getElementById('pageCount');
  var formRead = document.getElementById('read');
    formTitle.value = "";
    formAuthor.value = "";
    formPageCount.value = "";
    formRead.checked = false;
}
 
const addBook = () => {
  console.log(library);
  var formTitle = document.getElementById('title');
  var formAuthor = document.getElementById('author');
  var formPageCount = document.getElementById('pageCount');
  var formRead = document.getElementById('read');
  let book = {title: formTitle.value, 
    author: formAuthor.value, 
    userId: getAuth().currentUser.uid,
    pageCount: formPageCount.value, 
    read: formRead.checked,
    timestamp: serverTimestamp(),
    id: uniqid()
  }
  
  saveLibrary(book);
  
  console.log(library);
  loadLibrary();
  console.log(library);
  resetForm();
  closeForm();
};

const totalRead=()=>{
    let br = 0;
    for (let i=0; i<library.length; i++){
        if (library[i].read === true){
            br++
        }
    }
    setRead(br)
}

const removeBook = (item) => {
  
  deleteDoc(doc(db, 'library: '+ getUserName(), item.title));
  console.log(doc(db, 'library: '+ getUserName(), item.title));
  loadLibrary();
}

const changeBackground = (book) => {
  let card = document.getElementById("checkbox"+book.id)
  if (card.checked){
    document.getElementById(book.id).style.backgroundColor = "#c3c1c1";
  } else {
    document.getElementById(book.id).style.backgroundColor = "aquamarine";
  }
}

const checkBox = ( item ) => {
  /* var data = [...library];
  var index = data.findIndex(obj => obj.id === item.id);
  if (data[index].read === true){
    data[index].read = false;
  } else if (data[index].read === false) {
    data[index].read = true;
  }
  changeBackground(item);
  setLibrary(data); */
  if (item.read === false){
  updateDoc(doc(db, 'library: '+ getUserName(), item.title), {
    read: true
  })} else if (item.read === true) {
    updateDoc(doc(db, 'library: '+ getUserName(), item.title), {
      read: false
  })}
  loadLibrary();
}

  return (
    <div className='body'>
      <div className="topper">
          <div id="library-count">
              <p className="count-p">Books in Library: </p>
              <p className="count-p" id="total-books">{library.length}</p>
              <p className="count-p">Books Read: </p>
              <p className="count-p" id="total-read">{read}</p>
          </div>
          <h1 className="pageHeading">My Library</h1>
          <div id="user-container">
            <img id="user-pic" src={profilePic} alt='Profile' referrerPolicy="no-referrer"></img>
            <div className='userLeft'>
              <button className='sign-inBtn'  id="sign-out" onClick={signOutUser}>
                Sign-out
              </button>
              <div hidden id="user-name"></div>
              
              <button id="sign-in" className='sign-inBtn' onClick={signIn}>
              Sign-in with Google
              </button>
            </div>
          </div>
          
      </div>
      <div className='addBookbtn'>
        <button type="button" onClick={openForm} className="openForm">Add Book</button>
      </div>
      <NewCard library={ library } remove={removeBook} checkBox = { checkBox } changeBackground = {changeBackground}/>
      <div id="addBook">
          <form id="bookForm" >
              <label htmlFor="title">Book Title</label>
              <input type="text" id="title" required/>
              <label htmlFor="author">Author of Book</label>
              <input type="text" id="author" required pattern="[A-Za-z\s.]+"></input>
              <label htmlFor="pageCount">Page Count</label>
              <input type="number" id="pageCount" required></input>
              <label htmlFor="read">Have you read this book?</label>
              <input type="checkbox" id="read" name="read"></input>
              <div className="buttons">
                  <button className="formButtons" type="button" id="submit" onClick={addBook} >Submit</button>
                  <button className="formButtons" type="button" id="reset" onClick={resetForm}>Clear</button>
                  <button className="formButtons" type="button" onClick={closeForm}>Close Form</button>
              </div>
          </form>
      </div>
  </div>
  );
}

export default App;
