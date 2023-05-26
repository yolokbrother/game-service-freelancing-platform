import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '../../components/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Carousel from 'react-material-ui-carousel'
import CardMedia from '@mui/material/CardMedia';
import NEXTLink from 'next/link'

//Firebase
import {useAuthState} from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";

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
        <Card sx={{ width: "100%",height:"250px"}}>
          <CardMedia
            component="img"  
            height="200px"
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

function ProductList() {
    InitFirebase();
    const auth = getAuth()

    //user.data usage
    const [user, loading, error] = useAuthState(auth)
  return (
    <div>
          <Container maxWidth="xl">
              <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                      <Grid item  xs={3} sm={3} md={3} xl={3}>
                          <Card sx={{height:"250px", background:"lightgrey", mt:"30px", mb:"30px"}}>
                          {user ? (
                              <Typography variant="h4" marked="center" component="h2"  align="center" sx={{ mt: 2 }}>
                                  Hi {user.displayName},
                              </Typography> 
                              ):("")}
                              <CardContent>
                                  <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
                                      Get Started Here
                                  </Typography>
                                  <Typography variant="body2">
                                      Create your own service
                                  </Typography>
                              </CardContent>
                              <CardActions>
                                  <Button href="/ProfilePage" component={NEXTLink} prefetch={false} variant="contained" sx={{ marginLeft: '10px' }}>
                                      <AddCircleIcon />Post a service
                                  </Button>
                              </CardActions>
                          </Card>
                      </Grid>

                      <Grid item xs={9} sm={9} md={9} xl={9}>
                          <Container sx={{ mt:"30px", mb:"30px", position: 'relative' }} >
                              <Carousel>
                                  {
                                      items.map((item, i) => <Item key={i} item={item} />)
                                  }
                              </Carousel>
                          </Container>
                      </Grid>
                  </Grid>
              </Box>
          </Container>
    </div>
  );
}

export default ProductList;
