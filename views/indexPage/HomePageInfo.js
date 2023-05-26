import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '../../components/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-material-ui-carousel'

var items = [
    {
        name: "Find the best game services",
        description: "This platform support multiple game platform of game freelance service for you to select!",
        image: "/CarosellOne.jpg"
    },
    {
        name: "Freelance you favourite games",
        description: "You just need to take simple steps to register, then you can freelance your own service!",
        image: "/CarosellTwo.jpg"
    },
    {
        name: "Find game data and ranking analysis",
        description: "This platform contain game data and ranking systems for you to browse and compare which freelancer is the best!",
        image: "/CarosellThree.jpg"
    }
]

function Item(props)
{
    return (
        <Card sx={{ width: "100%"}}>
          <CardMedia
            component="img"
            height="500"
            image={props.item.image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {props.item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.item.description}
            </Typography>
          </CardContent>
      </Card>
    )
}


function HomePageInfo() {
    return (
      <Box
        component="section"
        sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'primary.dark' }}
      >  
        <Container sx={{ mt: 15, mb: 10, position: 'relative' }} maxWidth="md" >  
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </Container>
      </Box>
    );
  }
  
  export default HomePageInfo;