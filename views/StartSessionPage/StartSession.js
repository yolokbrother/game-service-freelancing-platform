import React from 'react'

import { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '../../components/Typography';
import Rating from '@mui/material/Rating';

//Firebase
import { useAuthState } from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { doc, setDoc, updateDoc, getDoc, onSnapshot } from "firebase/firestore"
import firebase from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

//other
import Link from 'next/link';

//other
import NEXTLink from 'next/link'
import { useRouter } from 'next/router';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <h2>{children}</h2>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function StartSession() {

    //initial firebase with routing
    const app = InitFirebase();
    const db = getFirestore(app);
    const storage = getStorage()
    const auth = getAuth()

    const [value, setValue] = useState(0);
    const [data, setData] = useState([])
    const posts = [];
    const router = useRouter();
    const [sellerCheckedIn, setSellerCheckedIn] = useState(false);
    const [buyerCheckedIn, setBuyerCheckedIn] = useState(false);
    const [rating, setRating] = useState(0);

    //user.data usage
    const [user, loading, error] = useAuthState(auth)
    let sessionData = null;

    if (router.query.sessionData) {
        try {
            sessionData = JSON.parse(router.query.sessionData);
            // rest of your code...
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else {
        console.error("router.query.sessionData is undefined");
    }

    //read data
    useEffect(() => {
        const readData = async () => {
            try {
                const userDocGet = doc(db, "userSessions", sessionData.id)
                await getDoc(userDocGet).then((doc) => {
                    if (doc.exists()) {
                        const getData = doc.data();
                        posts.push({
                            sessionskey: getData.id,
                            orderID: getData.id,
                            serviceId: getData.serviceId,
                            sellerID: getData.sellerID,
                            buyerID: getData.buyerID,
                            ArriveSeller: getData.ArriveSeller,
                            ArriveBuyer: getData.ArriveBuyer,
                            rating: getData.rating
                        })
                    }
                })
                setData(posts)
            } catch (error) {
            }
        }
        readData()
    }, [user]);

    //inital
    useEffect(() => {
        if (!user) return;

        const checkUserDoc = async () => {
            try {
                const userDocRef = doc(db, 'userSessions', sessionData.id);
                const userDocSnapshot = await getDoc(userDocRef);

                if (!userDocSnapshot.exists()) {
                    await setDoc(userDocRef, {
                        orderID: sessionData.id,
                        serviceId: sessionData.serviceId,
                        sellerID: sessionData.sellerID,
                        buyerID: sessionData.buyerID,
                        ArriveSeller: 'No',
                        ArriveBuyer: 'No',
                        rating: ''
                    });
                    posts.push({ orderID: sessionData.id, serviceId: sessionData.serviceId, sellerID: sessionData.sellerID, buyerID: sessionData.buyerID, ArriveSeller: 'No', ArriveBuyer: 'No', rating: '' })
                    setData(posts)
                    window.location.reload()
                } else {
                    console.log('Session is created');
                }
            } catch (error) {
                console.log(error);
                alert(error);
            }
        };

        checkUserDoc();
    }, [user]);




    useEffect(() => {
        if (!sessionData) return;

        const sessionDocRef = doc(db, 'userSessions', sessionData.id);

        const unsubscribe = onSnapshot(sessionDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const sessionData = docSnapshot.data();
                setSellerCheckedIn(sessionData.ArriveSeller === 'Yes');
                setBuyerCheckedIn(sessionData.ArriveBuyer === 'Yes');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [sessionData]);

    //handle checkin
    const handleCheckIn = async (userType) => {
        if (!sessionData) {
            console.log('Session data is not available.');
            return;
        }

        const sessionDocRef = doc(db, 'userSessions', sessionData.id);

        if (userType === 'teacher') {
            await setDoc(sessionDocRef, { ArriveSeller: 'Yes' }, { merge: true });
        } else if (userType === 'student') {
            await setDoc(sessionDocRef, { ArriveBuyer: 'Yes' }, { merge: true });
        } else {
            console.log('Invalid user type for check-in.');
        }
    };
    //handleSubmitRating
    const handleSubmitRating = async (event) => {
        event.preventDefault();

        if (!rating) {
            alert('Please select a rating before submitting.');
            return;
        }

        try {
            const userDocRef = doc(db, 'userSessions', sessionData.id);
            await updateDoc(userDocRef, {
                rating: rating,
            });

            alert('Rating submitted successfully!');
            // Optionally, you can clear the rating after submission
            setRating(0);
        } catch (error) {
            console.log(error);
            alert('Error submitting rating: ' + error.message);
        }
    };

    //handleEndSession
    const handleEndSession = async () => {
        try {
            const userOrderDocRef = doc(db, 'userOrder', sessionData.id);
            await updateDoc(userOrderDocRef, {
                state: 'finish',
            });

            alert('The session is done.');
            // Navigate to the homepage
            router.push('/ProfilePage');
        } catch (error) {
            console.log(error);
            alert('Error ending session: ' + error.message);
        }
    };

    //handle tap change
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div>
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }} border={1}>
                    <Typography variant="h4" align="center" marked="center" >
                        Sessions Page
                    </Typography>
                    <Typography variant="h5" align="center"  >
                        Find all the sessions function you needed here
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Check-In" {...a11yProps(0)} />
                                <Tab label="TeamLink&Rating" {...a11yProps(1)} />
                                <Tab label="End of Session" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Box component="span" sx={{ fontWeight: 'bold' }}>
                                    Seller Check-In Status:
                                </Box>
                                <Box component="span">
                                    {sellerCheckedIn ? 'Checked In' : 'Not Checked In'}
                                </Box>
                                <Box component="span" sx={{ fontWeight: 'bold' }}>
                                    Buyer Check-In Status:
                                </Box>
                                <Box component="span">
                                    {buyerCheckedIn ? 'Checked In' : 'Not Checked In'}
                                </Box>

                                {user && sessionData && user.uid === sessionData.sellerID && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleCheckIn('teacher')}
                                    >
                                        Seller Check-In
                                    </Button>
                                )}
                                {user && sessionData && user.uid === sessionData.buyerID && (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleCheckIn('student')}
                                    >
                                        Buyer Check-In
                                    </Button>
                                )}
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Box component="form" onSubmit={handleSubmitRating}>
                                <Typography variant="h4" align="center" marked="center">
                                    Satisfaction Rating
                                </Typography>
                                {sessionData ? (
                                    <Typography variant="h5" align="center">
                                        TeamLink: {" " + sessionData.teamLink}
                                    </Typography>
                                ) : (
                                    <Typography variant="h5" align="center">Loading...</Typography>
                                )}
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <Rating
                                        name="satisfaction-rating"
                                        value={rating}
                                        onChange={(event, newValue) => setRating(newValue)}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Submit Rating
                                    </Button>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleEndSession}
                                >
                                    End Session
                                </Button>
                            </Box>
                        </TabPanel>
                    </Box>
                </Box>
            </Container>

        </div>
    )
}
