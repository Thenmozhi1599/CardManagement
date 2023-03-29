import { useState } from "react";

function EditCard({ card, onCardUpdated }) {
  const [name, setName] = useState(card.name);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedCard = { ...card, name };

    const response = await fetch(`http://localhost:3000/cards/${card.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    });

    const data = await response.json();
    onCardUpdated(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Card Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={handleNameChange}
      />
      <button type="submit">Update Name</button>
    </form>
  );
}

export default EditCard;
