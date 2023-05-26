import * as React from 'react';
import { useRouter } from 'next/router';
import { Grid, Box } from '@mui/material';
import Typography from '../../components/Typography';
import TextField from '@mui/material/TextField';
import { useState, createContext, useContext } from 'react';

//steppers
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//icons
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//other
import NEXTLink from 'next/link';
import { randomBytes } from 'crypto';
//paypal 
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
//Firebase
import { useAuthState } from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
  getAuth
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { doc, setDoc, getDoc } from "firebase/firestore"
import firebase from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";


const ViewHomeProduct = () => {
  //initial firebase with routing
  const app = InitFirebase();
  const db = getFirestore(app);
  const storage = getStorage()


  //user.data usage
  const auth = getAuth()
  const [user, loading, error] = useAuthState(auth)

  const router = useRouter();
  const serviceData = JSON.parse(router.query.serviceData);
  const CLIENT_ID = 'AZyiZBlW2bFEzEGE5YDfS10qJ-GfOwuufEpAnwYtYl4CVkaWdbUgXSE7uB0_vLn-H5kymb1jOip_dx67';

  const [showUploadButton, setShowUploadButton] = useState(false);
  const amount = serviceData.price; // Set your desired amount

  const onSuccess = (details) => {
    console.log('Payment successful', details);
  };

  const steps = [
    {
      label: 'First Contect Your Provider for service information',
      description: `Ask your provider time, place and how to perform service details first before you move to next step.`,
    },
    {
      label: 'Set time and confirm service place to perform',
      description:
        'Set time and confirm service place to perform.(Notice the place to perform service is set up by the service provider.)',
    },
    {
      label: 'payment and order',
      description: `After the payment check, click the following button to buy it.`,
    },
  ];

  const [value1, setValue1] = useState(new Date());
  const [value2, setValue2] = useState(new Date());
  const [dateArrange, setDateArrange] = useState("");


  const [activeStep, setActiveStep] = React.useState(0);


  const handleDateChange1 = (newValue) => {
    setValue1(newValue);
    setDateArrange(`${newValue} to ${value2}`);
  };

  const handleDateChange2 = (newValue) => {
    setValue2(newValue);
    setDateArrange(`${value1} to ${newValue}`);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //order create

  function generateRandomId(length = 10) {
    return randomBytes(length).toString('hex');
  }

  function handleOrderUpload() {
    const orderID = generateRandomId();
    try {
      const userDoc = doc(db, "userOrder", orderID)
      setDoc(userDoc, {
        serviceID: serviceData.id,
        serviceName: serviceData.serviceName,
        serviceImage: serviceData.serviceImage,
        serviceDetail: serviceData.serviceDetail,
        teamLink: serviceData.teamLink,
        language: serviceData.language,
        price: serviceData.price,
        date: serviceData.date,
        dateArrange: dateArrange,
        state: "Payed",
        sellerID: serviceData.sellerID,
        buyerID: user.uid
      }).then(() => {
        console.log("Order uploaded successfully");
        window.alert("Order uploaded successfully!");
        router.push('/HomePage');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    } catch (error) {
      console.log(error)
      alert(error)
    }
  };

  const handleButtonClick = () => {
    setShowUploadButton(true);
  };

  const renderButtons = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <>
            <NEXTLink
              href={{
                pathname: './InboxChatPage',
                query: { serviceData: JSON.stringify(serviceData) },
              }}
              passHref
              prefetch={false}
            >
              <Button variant="contained" sx={{ mt: 1, mr: 1 }}>
                <EmailIcon />
                Mail
              </Button>
            </NEXTLink>
            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
              Next
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="h6" align="center" >
              Time and Date selection
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DateTimePicker
                label="From"
                onChange={handleDateChange1}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: '50%', mb: '50px', alignSelf: 'center' }}
              />
              <DateTimePicker
                label="To"
                onChange={handleDateChange2}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: '50%', mb: '50px', alignSelf: 'center' }}
              />
              <div>
                <h3>Selected range:</h3>
                <p>{dateArrange}</p>
              </div>

            </LocalizationProvider>
            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
              Next Step
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Go Back
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" align="center" >
              Payment
            </Typography>
            <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
              <PayPalButtons
                style={{
                  layout: 'horizontal',
                }}
                onClick={handleButtonClick}
                createOrder={(data, actions) => {
                  console.log('Creating order');
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: 100,
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  console.log('Approving order');
                  return actions.order.capture().then((details) => {
                    onSuccess(details);
                  });
                }}
              />
            </PayPalScriptProvider>
            {showUploadButton && (
              <Button variant="contained" sx={{ marginLeft: '10px' }} onClick={handleOrderUpload}><ShoppingCartIcon/>Order</Button>
            )}   
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Previous Step
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>

      <Grid container>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: "30px", mb: "30px", ml: "30px", mr: "30px", border: "1px solid black", borderRadius: 8, minHeight: '100%' }}>
            <Typography variant="h4" marked="center" component="h2" >
              {serviceData.serviceName}
            </Typography>

            <Box sx={{ mt: '16px' }}>
              <img
                src={serviceData.serviceImage}
                style={{ maxWidth: '100%', height: 'auto', alignSelf: 'center' }}
              />
            </Box>

            <TextField
              id="serviceDetail"
              label="Service Details"
              defaultValue={serviceData.serviceDetail}
              disabled={true}
              multiline
              sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
            />
            <TextField
              id="teamLink"
              label="Team Link"
              defaultValue={serviceData.teamLink}
              disabled={true}
              multiline
              sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
            />
            <TextField
              id="language"
              label="Language"
              defaultValue={serviceData.language}
              disabled={true}
              multiline
              sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
            />
            <TextField
              id="price"
              label="Price"
              defaultValue={serviceData.price}
              disabled={true}
              multiline
              sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
            />
            <TextField
              id="date"
              label="Date"
              defaultValue={serviceData.date}
              disabled={true}
              multiline
              sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
            />

          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', mt: "30px", mb: "30px", ml: "30px", mr: "30px", border: "1px solid black", borderRadius: 8, minHeight: '100%' }}>
            <Typography variant="h4" marked="center" component="h2" >
              Order List
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ ml: "30px", mr: "30px", mb: "50px", width: "60%", flexGrow: 1 }}>
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>{renderButtons(index)}</div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}

          </Box>
        </Grid>
      </Grid>

    </>
  );
};

export default ViewHomeProduct;