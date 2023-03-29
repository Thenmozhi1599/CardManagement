import React, { useState } from 'react';
import axios from 'axios';

const AddCard = ({ bucketId }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCard = {
      name: name,
      link: link,
      bucketId: bucketId
    };

    axios.post('http://localhost:3000/cards', newCard)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    setName('');
    setLink('');
  };
  return (
    <form onSubmit={handleSubmit}>
    <label>
    Card Name:
    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
    </label>
    <br />
    <label>
    Card Link:
    <input type="text" value={link} onChange={(event) => setLink(event.target.value)} />
    </label>
    <br />
    <button type="submit">Add Card</button>
    </form>
    );
    };
    
    export default AddCard;