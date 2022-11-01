import React from "react";


const NewCard = (props) => {

    const { library } = props;

    return <div id="bookGrid">
        {library.map((book) => {
            return (
            <div className="bookCard" id={book.id} key={book.key}>
                <h1 className="cardTitle-label">Book Title: {book.title}</h1>
                <h3 className="cardLabel">Author: {book.author}</h3>
                <h3 className="cardLabel">Page Count: {book.pageCount}</h3>
                <div className="haveRead">
                    <h3 className="cardLabel">Have you read this book?</h3>
                    <input type="checkbox" className="readBox"></input>
                </div>
                <button></button>
                
            </div>
        )})}

    </div>




}

export default NewCard;