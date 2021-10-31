import React from "react";
import "./Card.css";

function Card({cardImg}) {
    
    return (
        <div className="Card">
            <img className="Card-img" src={cardImg} alt="playing card" />
        </div>
    )
}
  
export default Card;