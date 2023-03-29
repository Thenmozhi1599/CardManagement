import React, { useEffect,useState } from 'react';
import axios from 'axios';
import '../CSS/AddBucket.css'

const AddBucket = () => {
const [name, setName] = useState('');
const [buckets, setBuckets] = useState([]);

useEffect(() => {
    axios.get('http://localhost:3000/buckets')
      .then(response => {
        setBuckets(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


const handleSubmit = (event) => {
    event.preventDefault();
    const exists = buckets.find(bucket => bucket.name === name);
    if(exists){
        console.log("already exists");
    }
    else{
    const newBucket = {
        name: name
      };
    axios.post('http://localhost:3000/buckets', newBucket)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
 
    setName('');
  };
}
  return (
    <form className='addBucket' onSubmit={handleSubmit}>
      <label>
        Bucket Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <button type="submit">Add Bucket</button>
    </form>
  );
}
export default AddBucket;