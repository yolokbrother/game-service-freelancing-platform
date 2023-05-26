import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState, createContext, useContext } from 'react';
import CartContext from '../../components/CartContext';
import CreatedServicePaginationTable from './CreatedServicePaginationTable';
import Typography from '../../components/Typography';

//Firebase
import { useAuthState } from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
  getAuth
} from "firebase/auth";
import {
  getFirestore, collection, query,
  orderBy, limit, startAfter, getDocs, doc, where
} from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import firebase from "firebase/app";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

//other
import NEXTLink from 'next/link'
import { useRouter } from 'next/router';



export default function CreatedServices() {
  //state
  const context = useContext(CartContext);
  const [servicesData, setServicesData] = useState([]);

  //initial firebase with routing
  const app = InitFirebase();
  const db = getFirestore(app);
  const storage = getStorage();
  const auth = getAuth();

  //user.data usage
  const [user, loading, error] = useAuthState(auth)


  //Link
  const router = useRouter();

  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }} border={1}>
          <Typography variant="h4" marked="center" component="h2" >
            Created Services
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <CreatedServicePaginationTable user={user} />
          </div>
        </Box>
      </Container>
    </div>
  )
}
