import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddBucket from "./AddBucket";
import axios from "axios";
import '../CSS/Buckets.css'
import Menus from "./Menus";



function BucketList() {

  const [showAddCard, setShowAddCard] = useState(false);
  
  const [buckets, setBuckets] = useState([]);

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  useEffect(() => {
    axios.get('http://localhost:3000/buckets')
      .then(response => {
        setBuckets(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (

    <div className="bucket-list">
      <div className="navbar">
      <ul>
      <li><Menus /></li>
      <li><h2>Buckets</h2></li>
      <li><button onClick={toggleAddCard}>Add Bucket</button>
      {showAddCard && <AddBucket />}</li>
      
      </ul>
      </div>
      <div className="bucket-card-container">
        {buckets.map((bucket) => (
          <div className="bucket-card" key={bucket.id}>
            {/* <h3 className="bucket-name">{bucket.name}</h3> */}
            <p className="bucket-description">{bucket.description}</p>
            <Link className="bucket-link" to={`/buckets/${bucket.id}`}>
            {bucket.name}
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default BucketList;
