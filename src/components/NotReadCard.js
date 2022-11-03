import React from "react";


const NotReadCard = (props) => {

    const { book, remove, checkBox, changeBackground } = props;

    return (
        <div className="bookCard" id={book.id} key={book.id} onChange={()=>changeBackground(book)} style={{backgroundColor: "aquamarine"}}>
            <h1 className="cardTitle-label">Book Title: {book.title}</h1>
            <h3 className="cardLabel">Author: {book.author}</h3>
            <h3 className="cardLabel">Page Count: {book.pageCount}</h3>
            <div className="haveRead">
                <h3 className="cardLabel">Have you read this book?</h3>
                <input type="checkbox" id={"checkbox"+book.id} className="readBox" onChange={()=>checkBox(book)} defaultChecked={book.read}></input>
            </div>
            <button onClick={()=>remove(book)}>Remove Book</button>
            
        </div>
    )
}

export default NotReadCard;