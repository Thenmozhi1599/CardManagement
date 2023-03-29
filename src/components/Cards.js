import React from 'react';
import { IconButton,CardActionArea,Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import '../CSS/Card.css'
import MoveCard from "./MoveCardModal";

const handleLink = (link) =>{
    
  if (link.includes("youtube")){
    const videoId = link.split('v=')[1];
  return `https://www.youtube.com/embed/${videoId}`;

  }
  else{
    return link
  }
}



const Cards = ({ card,onDelete, }) => {




  const {bucketId} = useParams();
  console.log("bucket id"+bucketId)

  let link = card.link
  const embeddedUrl = handleLink(link)

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  
  return (
    <div className='card'>      
      <Card sx={{ maxWidth: 300

        }}>
      <IconButton aria-label="delete" onClick={()=>{onDelete(card.id)}}>
        <DeleteIcon />
      </IconButton>
      <CardActionArea onClick={handlePlayClick}>
        <CardContent>
        <Typography variant="h5" component="div">
        
        {card.name}
      </Typography>
      </CardContent>
      {!isPlaying && (
          <IconButton aria-label="play">
            <PlayArrowIcon />
          </IconButton>
        )}
        {isPlaying && (
        <CardMedia 
          sx={{ height: 500 }}
          component="iframe"
          image={embeddedUrl}
          
        
        />
        )}
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Cards;
