import React from "react";
import ReadCard from "./ReadCard";
import NotReadCard from "./NotReadCard";

const NewCard = (props) => {

    const { library, remove, checkBox, changeBackground } = props;
    return <div id="bookGrid">
        {library.map((book) => {
            if (book.read === true){
                return <ReadCard book={book} remove={remove} checkBox = { checkBox } changeBackground = {changeBackground} key={book.id}/>
            } else if (book.read === false){
               return <NotReadCard book={book} remove={remove} checkBox = { checkBox } changeBackground = {changeBackground} key={book.id}/>
            }
        })}

    </div>




}

export default NewCard;