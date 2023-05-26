import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '../../components/Typography';
import { useState,createContext,useContext } from 'react';
import CartContext from '../../components/CartContext';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//FB
//Firebase
import {useAuthState} from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore"
import firebase from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
//other
import NEXTLink from 'next/link'
import { randomBytes } from 'crypto';
import { useRouter } from 'next/router';



export default function CreateServiceForm() {
    //state
    const context = useContext(CartContext);
    //initial firebase with routing

    const app = InitFirebase();
    const db = getFirestore(app);
    const storage = getStorage();
    const auth = getAuth();

   //user.data usage
   const [user, loading, error] = useAuthState(auth)

   //Link
   const router = useRouter();
        
    //const 
    const steps = [
        'Create Serivces Topic and image',
        'Create Serivces Details and Time slot',
        'Confirm Serivces Details',
    ];

    function generateRandomId(length = 10) {
        return randomBytes(length).toString('hex');
    }

    function dataURLtoBlob(dataURL) {
        const binary = atob(dataURL.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
      }

    //form
    function handleServiceUpload() {
        // Check if any required field is missing
        if (
            !context.nameContext ||
            !context.imageURLContext ||
            !context.serviceDetailContext ||
            !context.teamLinkContext ||
            !context.languageContext ||
            !context.priceContext ||
            !context.dateContext
        ) {
            alert("You need to fill all columns and upload an image.");
            return;
        }
    
        const serviceID = generateRandomId();
        try {
            const userDoc = doc(db, "userService", serviceID);
            setDoc(userDoc, {
                serviceName: context.nameContext,
                serviceImage: context.imageURLContext,
                serviceDetail: context.serviceDetailContext,
                teamLink: context.teamLinkContext,
                language: context.languageContext,
                price: context.priceContext,
                date: context.dateContext,
                dateArrange: context.dateArrangeContext,
                state: context.stateContext,
                sellerID: user.uid,
                buyerID: context.buyerIDContext
            });
    
            // Upload file
            const imageBlob = dataURLtoBlob(context.imageURLContext);
            const storageRef = ref(storage, `service_image/${serviceID}`);
            const uploadTask = uploadBytesResumable(storageRef, imageBlob);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    
                },
                (error) => {
                    console.error("Error uploading file to Firebase Storage: ", error);
                }
            );
            router.push('/ProfilePage');
            alert('Data was successfully sent to cloud firestore!');
    
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };



    return (
        <div>
                <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={2} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                <Box sx={{ width: '100%', textAlign: 'center', display: 'flex',flexWrap: 'wrap',flexDirection: 'column' }} border={1}>
                    <Typography variant="h6" align="center" >
                        Confirm Service Details
                    </Typography>
                    <TextField
                        id="serviceName"
                        label="Service Name"
                        defaultValue={context.nameContext}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px',alignSelf: 'center' }}
                    />
                    <br/>
                    <img
                            src={context.imageURLContext}
                            style={{ maxWidth: "100%", height: "auto",alignSelf: 'center' }}
                    />
                    <br/>
                    <TextField
                        id="serviceDetail"
                        label="Service Details"
                        defaultValue={context.serviceDetailContext}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px',alignSelf: 'center' }}
                    />
                    <TextField
                        id="teamLink"
                        label="Team Link"
                        defaultValue={context.teamLinkContext}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px',alignSelf: 'center' }}
                    />
                    <TextField
                        id="language"
                        label="Language"
                        defaultValue={context.languageContext}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="price"
                        label="Price"
                        defaultValue={"$" + context.priceContext}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="date"
                        label="Date"
                        defaultValue={context.dateContext}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />

                    <Box sx={{ width: '100%', textAlign: 'center', display: 'flex'}} >
                        <Button component={NEXTLink} prefetch={false}  href='CreateServicePage2' variant="contained" sx={{ mb: '10px', mt: '10px', ml: '10px', alignSelf: 'flex-start' }}>Back</Button>
                        <Button variant="contained" onClick={handleServiceUpload} sx={{ mb: '10px', mr: '10px', ml: 'auto', alignSelf: 'flex-end' }}>Confirm</Button>
                    </Box> 
                </Box>
                </Container>
        </div>
    )
}
