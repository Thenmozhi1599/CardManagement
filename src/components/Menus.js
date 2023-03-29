import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate , useParams} from "react-router-dom";


function Menus() {
  const [anchor, setAnchor] = useState(null);
  const [buckets, setBuckets] = useState([]);
  const [selected, setSelected] = useState(-1);
  // const [bucketNames,setBucketNames] = useState([]);


  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:3000/buckets')
    .then(response => {
      setBuckets(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, []);
console.log(buckets)
const bucketNames = buckets.map((bucket) => bucket.name);
console.log(bucketNames)


  

  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const onMenuItemClick = (event, index) => {
    setAnchor(null);
    setSelected(index);
   navigate(`/buckets/${buckets[index].id}`);
   console.log(buckets[index].id)
  };
  
  return (
    <Box>
      <Button
        onClick={openMenu}
        color="primary"
        variant="contained"
      >
        Your Buckets
      </Button>

      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={closeMenu}
        keepMounted
      >
        {bucketNames.map((bucket,index) => (
          <MenuItem
          key={index}
            onClick={(event) => onMenuItemClick(event, index)}
            selected= {index === selected}
          >
            {bucket}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default Menus;