import React from "react";


const NewCard = (props) => {

    const { library, remove, checkBox, changeBackground } = props;

    return <div id="bookGrid">
        {library.map((book) => {
            return (
            <div className="bookCard" id={book.id} key={book.key} onChange={()=>changeBackground(book)}>
                <h1 className="cardTitle-label">Book Title: {book.title}</h1>
                <h3 className="cardLabel">Author: {book.author}</h3>
                <h3 className="cardLabel">Page Count: {book.pageCount}</h3>
                <div className="haveRead">
                    <h3 className="cardLabel">Have you read this book?</h3>
                    <input type="checkbox" id={"checkbox"+book.key} className="readBox" onChange={()=>checkBox(book)} ></input>
                </div>
                <button onClick={()=>remove(book)}>Remove Book</button>
                
            </div>
        )})}

    </div>




}

export default NewCard;