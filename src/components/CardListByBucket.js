import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCard from "./AddCard";
import Cards from "./Cards";
import EditCard from "./EditCard";
import '../CSS/CardListByBucket.css'
import MoveCardModal from "./MoveCardModal";
import Menus from "./Menus";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";


function CardListByBucket() {
  const { bucketId } = useParams();

  const [cards, setCards] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null); // new state variable
  const [movingCard, setMovingCard] = useState(null);
  const [bucket,setBucket] = useState([])
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch(`http://localhost:3000/cards?bucketId=${bucketId}`);
      const data = await response.json();
      setCards(data);
    };

    fetchCards();
  }, [bucketId]);


  useEffect(() => {
    const fetchBuckets = async () => {
      const response = await fetch("http://localhost:3000/buckets");
      const data = await response.json();
      setBuckets(data);
    };
    fetchBuckets();
  }, []);
  useEffect(() => {
    const fetchBuckets = async () => {
      const response = await fetch(`http://localhost:3000/buckets/${bucketId}`);
      const data = await response.json();
      setBucket(data);
    };
    fetchBuckets();
  }, []);


//Delete a card
  const deleteCard = async (cardId) => {
    const response = await fetch(`http://localhost:3000/cards/${cardId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setCards(cards.filter((card) => card.id !== cardId));
    } else {
      console.log(`Failed to delete card with ID ${cardId}`);
    }
  };

  

  const handleCardUpdated = (updatedCard) => {
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedCards);
    setEditingCardId(null);
  };


  const moveCard = async (newBucketId) => {
    const updatedCard = { ...movingCard, bucketId: newBucketId };
    await fetch(`http://localhost:3000/cards/${updatedCard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    });
    setCards(cards.filter((card) => card.id !== movingCard.id));
    setMovingCard(null);
  };
  

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

 
  return (
    <div className="card-list">
       <Link to="/" className="btn">
          <Button>Home</Button>
        </Link>
      <Menus />
      <h2>Cards for Bucket {bucket.name}</h2>
      <button onClick={toggleAddCard}>Add Card</button>
      {showAddCard && <AddCard bucketId={bucketId} />}
      
      <ul>
        {cards.map((card) => (
          <li key={card.id} className="card">
            {editingCardId === card.id ? (
              <EditCard card={card} onCardUpdated={handleCardUpdated} />
            ) : (
              <>
            <Cards card={card} onDelete={deleteCard}/>
            <button onClick={() => setEditingCardId(card.id)}>Edit</button>
            <button type="button" onClick={() => setMovingCard(card)}>Move</button>

            </>
            )}
          </li>
        ))} 
      </ul>
      {movingCard && (
        <MoveCardModal buckets={buckets} onCancel={() => setMovingCard(null)} onMove={moveCard} />
      )}
       
      
        </div>
        
        );
        }

export default CardListByBucket;
