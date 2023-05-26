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
import {useAuthState} from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";

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

    const [value1, setValue1] = useState(new Date());
    const [value2, setValue2] = useState(new Date());
    const [rangeValue, setRangeValue] = useState("");

    //FB
    InitFirebase();
    const auth = getAuth()

    //user.data usage
    const [user, loading, error] = useAuthState(auth)

    //set value
    function handleServiceDetailChange(event) {
        context.setServiceDetailContext(event.target.value)
    }

    function handleTeamLinkChange(event) {
        context.setTeamLinkContext(event.target.value)
    }

    function handleLanguageChange(event) {
        context.setLanguageContext(event.target.value)
    }

    function handlePriceChange(event) {
        context.setPriceContext(event.target.value)
    }
      
        const handleDateChange1 = (newValue) => {
          setValue1(newValue);
          setRangeValue(`${newValue} to ${value2}`);
          context.setDateContext(`${newValue} to ${value2}`)
        };
      
        const handleDateChange2 = (newValue) => {
          setValue2(newValue);
          setRangeValue(`${value1} to ${newValue}`);
          context.setDateContext(`${newValue} to ${value2}`)
    };


    return (
        <div>
                <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                <Box sx={{ width: '100%', textAlign: 'center', display: 'flex',flexWrap: 'wrap',flexDirection: 'column' }} border={1}>
                    <Typography variant="h6" align="center" >
                        Create Services Details
                    </Typography>
                    <TextField
                        id="serviceDetail"
                        label="Service Details"
                        placeholder="Service Details Here"
                        defaultValue={context.serviceDetailContext}
                        onChange={handleServiceDetailChange}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px',alignSelf: 'center' }}
                    />
                    <TextField
                        id="teamsLink"
                        label="Teams Link(Optional)"
                        placeholder="Teams Link Here"
                        defaultValue={context.teamLinkContext}
                        onChange={handleTeamLinkChange}
                        multiline
                        sx={{ width: '50%', mb: '50px',alignSelf: 'center' }}
                    />
                    <TextField
                        id="language"
                        label="Language"
                        placeholder="Language Option Here"
                        defaultValue={context.languageContext}
                        onChange={handleLanguageChange}
                        multiline
                        sx={{ width: '50%', mb: '50px',alignSelf: 'center' }}
                    />
                    <TextField
                        id="setPrice"
                        label="Set Price"
                        placeholder="Set Price Here"
                        defaultValue={context.priceContext}
                        onChange={handlePriceChange}
                        multiline
                        sx={{ width: '50%', mb: '50px',alignSelf: 'center' }}
                    />
                    <Typography variant="h6" align="center" >
                        Time and Date selection
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <DateTimePicker
                            label="From"
                            onChange={handleDateChange1}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: '50%', mb: '50px',alignSelf: 'center' }}
                        />
                        <DateTimePicker
                            label="To"
                            onChange={handleDateChange2}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: '50%', mb: '50px',alignSelf: 'center' }}
                        />
                        <div>
                            <h3>Selected range:</h3>
                            <p>{rangeValue}</p>
                        </div>

                    </LocalizationProvider>
                    <Box sx={{ width: '100%', textAlign: 'center', display: 'flex'}} >
                        <Button component={NEXTLink} prefetch={false} href='CreateServicePage1' variant="contained" sx={{ mb: '10px', mt: '10px', ml: '10px', alignSelf: 'flex-start' }}>Back</Button>
                        <Button component={NEXTLink} prefetch={false} href='CreateServicePage3' variant="contained" sx={{ mb: '10px', mr: '10px', ml: 'auto', alignSelf: 'flex-end' }}>Next</Button>
                    </Box> 
                </Box>
                </Container>
        </div>
    )
}
