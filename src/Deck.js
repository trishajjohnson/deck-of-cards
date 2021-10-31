import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";
import axios from "axios";

const Deck = () => {
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState("https://s3.amazonaws.com/images.penguinmagic.com/images/products/medium/5075a.jpg");
    const [toggleInterval, setToggleInterval] = useState(false);
    const intervalId = useRef(null);

    useEffect(() => {
        async function fetchDeck() {
            const deck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"); 
            setDeck(deck.data);
        } 
        fetchDeck();
    }, [setDeck]);

    useEffect(() => {
        async function drawCard() {
            const { deck_id } = deck;
            
            try {
                const newCard = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

                if(newCard.data.remaining === 0) {
                    setToggleInterval(false);
                    throw new Error("No cards remaining!");
                } else {
                    setCard(newCard.data.cards[0].image);
                } 
            } catch (e) {
                alert(e);
            }
        }

        if(toggleInterval && !intervalId.current) {      
            intervalId.current = setInterval(async () => {
                await drawCard();
            }, 1000);
            
            return () => {
                clearInterval(intervalId.current);  
                intervalId.current = null;
            }
        }
    }, [toggleInterval, deck]);

    const toggleDrawCardInterval = () => {
        setToggleInterval(isOn => !isOn);
    }

    return (
        <div className="Deck">
            <h1>Deck of Cards</h1>
            <button className="Deck-btn" onClick={toggleDrawCardInterval}>Draw</button>
            {/* {!(cardsRemaining === 0) && <button className="Deck-btn" onClick={drawCard}>Draw</button>} */}
            <Card cardImg={card} />
        </div>
    );
}

export default Deck;