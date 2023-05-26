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

//Firebase
import InitFirebase from "../../Firebase/InitFirebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//other
import NEXTLink from 'next/link'



export default function CreateServiceForm() {
    //const 
    const steps = [
        'Create Serivces Topic and image',
        'Create Serivces Details and Time slot',
        'Confirm Serivces Details',
    ];
    //state
    const context = useContext(CartContext);



    //file and firebase
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const app = InitFirebase();
    const storage = getStorage()

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();

        reader.onload = (event) => {
            setImageUrl(event.target.result);
            context.setImageURLContext(event.target.result)
        };
        reader.readAsDataURL(file);
    };


    //set value
    function handleServiceNameChange(event) {
        context.setNameContext(event.target.value)
    }

    return (
        <div>
                <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={0} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                <Box sx={{ width: '100%', textAlign: 'center', display: 'flex',flexWrap: 'wrap',flexDirection: 'column' }} border={1}>
                    <Typography variant="h6" align="center" >
                        Create Services Topic and Image
                    </Typography>

                    
                    <TextField
                        id="outlined-textarea"
                        label="Service Topic"
                        placeholder="Service Topic Here"
                        defaultValue={context.nameContext}
                        onChange={handleServiceNameChange}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px',alignSelf: 'center' }}
                    />
                    <br/>
                    <input type="file" onChange={handleFileUpload} />
                    <br/>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Uploaded file"
                            style={{ maxWidth: "100%", height: "auto",alignSelf: 'center' }}
                        />
                    )}     
                    <Button component={NEXTLink} prefetch={false} href='CreateServicePage2' variant="contained" sx={{ mb: '10px', mt: '10px', mr:'10px', alignSelf: 'flex-end', marginLeft: 'auto'}}>Next</Button>
                </Box>
                </Container>
        </div>
    )
}
