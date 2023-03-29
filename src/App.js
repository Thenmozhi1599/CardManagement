import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BucketList from './components/BucketList';
// import BucketForm from './components/AddBucket';
// import CardList from './components/CardList';
import CardListByBucket from './components/CardListByBucket';
import Menus from './components/Menus';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route exact path="/" element={<BucketList />} />
        <Route exact path="/buckets/:bucketId" element={<CardListByBucket/>} />
        
       </Routes>
     </BrowserRouter>
    // <BucketList />
  );
}



export default App;
