import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Cards';

const CardList = ({ bucketId }) => {
  const [cards, setCards] = useState([]);
  const [newCardName, setNewCardName] = useState('');
  const [newCardLink, setNewCardLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = { name: newCardName, link: newCardLink, bucketId: bucketId };
    axios.post('http://localhost:3000/cards', newCard)
      .then(response => {
        setCards([...cards, response.data]);
        setNewCardName('');
        setNewCardLink('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/cards?bucketId=${bucketId}`)
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [bucketId]);

  return (
    <div>
      <h2>Cards</h2>
      <ul>
        {cards.map(card => (
          <li key={card.id}>
            <Card card={card} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Card Name:
          <input type="text" value={newCardName} onChange={(event) => setNewCardName(event.target.value)} />
        </label>
        <label>
          Card Link:
          <input type="text" value={newCardLink} onChange={(event) => setNewCardLink(event.target.value)} />
        </label>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default CardList;
