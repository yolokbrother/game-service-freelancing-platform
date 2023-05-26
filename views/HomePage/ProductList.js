import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//Firestore
//Firebase
import { useAuthState } from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { doc, setDoc, getDocs, collection } from "firebase/firestore"
import firebase from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

//other
import Link from 'next/link';
import { useRouter } from 'next/router';



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function ProductList({ searchTerm }) {
    const [expanded, setExpanded] = useState([]);
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    //initial firebase with routing
    const app = InitFirebase();
    const db = getFirestore(app);
    const storage = getStorage();
    const auth = getAuth();

    useEffect(() => {
        const fetchServices = async () => {
            const querySnapshot = await getDocs(collection(db, 'userService'));
            const servicesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(servicesData);
        };

        fetchServices();
    }, []);

    useEffect(() => {
        setFilteredServices(services);
    }, [services]);

    useEffect(() => {
        if (searchTerm) {
          setFilteredServices(
            services.filter((service) =>
              service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else {
          setFilteredServices(services);
        }
      }, [services, searchTerm]);

    const handleExpandClick = (id) => {
        setExpanded((prev) => {
            // Make a copy of the previous state
            const newState = [...prev];

            // Check if the card is already expanded
            const index = newState.indexOf(id);

            // If the card is expanded, remove it from the array; otherwise, add it
            if (index >= 0) {
                newState.splice(index, 1);
            } else {
                newState.push(id);
            }

            return newState;
        });
    };


    return (
        <div>
            <Container maxWidth="xl" sx={{ mt: "30px", mb: "30px" }} >
                <Box sx={{ flexGrow: 1, background: "lightgrey", pl: "10px", pr: "10px" }}>
                    <Grid container spacing={2}>
                        {filteredServices.map((service) => (
                            <Grid item xs={3} sm={3} md={3} xl={3} key={service.id}>

                                <Card sx={{ mb: "20px" }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={service.serviceName}
                                        subheader={service.date}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={service.serviceImage}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {service.serviceName}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="share">
                                            <ShareIcon />
                                        </IconButton>
                                        <ExpandMore
                                            expand={expanded.includes(service.id)}
                                            onClick={() => handleExpandClick(service.id)}
                                            aria-expanded={expanded.includes(service.id)}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </ExpandMore>

                                    </CardActions>
                                    <Collapse in={expanded.includes(service.id)} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>
                                                Details:{service.serviceDetail}
                                            </Typography>
                                            <Typography paragraph>
                                                TeamLink: {service.teamLink}
                                            </Typography>
                                            <Typography paragraph>
                                                Language: {service.language}
                                            </Typography>
                                            <Typography paragraph>
                                                Price: {"$" + service.price}
                                            </Typography>
                                        </CardContent>
                                        <Box display="flex" justifyContent="flex-end" alignItems="center" mr="10px">
                                            <Link
                                                href={{
                                                    pathname: './ViewHomeProductPage',
                                                    query: { serviceData: JSON.stringify(service) },
                                                }}
                                                passHref
                                            >
                                                Go shopping
                                            </Link>
                                        </Box>
                                    </Collapse>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default ProductList;
