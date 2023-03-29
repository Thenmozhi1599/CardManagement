import { useState } from "react";

function MoveCardModal({ buckets, onCancel, onMove }) {
  const [selectedBucket, setSelectedBucket] = useState(null);

  const handleSelect = (event) => {
    setSelectedBucket(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onMove(selectedBucket);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Move card to:</h2>
        <form onSubmit={handleSubmit}>
          <select onChange={handleSelect}>
            <option value="">Select a bucket</option>
            {buckets.map((bucket) => (
              <option key={bucket.id} value={bucket.id}>
                {bucket.name}
              </option>
            ))}
          </select>
          <button type="submit">Move</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default MoveCardModal;
