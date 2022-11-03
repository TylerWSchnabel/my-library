import './App.css';
import { useEffect, useState } from 'react';
import NewCard from './components/NewCard';
import uniqid from 'uniqid';

function App() {

  const [library, setLibrary] = useState([]);
  const [read, setRead] = useState(0);


  useEffect(() =>{
    totalRead();
    getLibrary();
  });

  const getLibrary = () => {
    return library;
  }
/* if(!localStorage.getItem('library')) {
    setLibrary([]);
    
  } else {
    setLibrary(JSON.parse(localStorage.library));
  } */

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
  var formTitle = document.getElementById('title');
  var formAuthor = document.getElementById('author');
  var formPageCount = document.getElementById('pageCount');
  var formRead = document.getElementById('read');
  setLibrary([...library, {title: formTitle.value, 
    author: formAuthor.value, 
    pageCount: formPageCount.value, 
    read: formRead.checked,
    id: uniqid()
  }]);
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
  var data = [...library];
  var index = data.findIndex(obj => obj.id === item.id);
  data.splice(index, 1);
  setLibrary(data);
};

const changeBackground = (book) => {
  let card = document.getElementById("checkbox"+book.id)
  if (card.checked){
    document.getElementById(book.id).style.backgroundColor = "#c3c1c1";
  } else {
    document.getElementById(book.id).style.backgroundColor = "aquamarine";
  }
}

const checkBox = ( item ) => {
  var data = [...library];
  var index = data.findIndex(obj => obj.id === item.id);
  if (data[index].read === true){
    data[index].read = false;
  } else if (data[index].read === false) {
    data[index].read = true;
  }
  changeBackground(item);
  setLibrary(data);
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
          
      </div>
      <button type="button" onClick={openForm} className="openForm">Add Book</button>
    
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
