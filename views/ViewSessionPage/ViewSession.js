import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState,createContext,useContext } from 'react';
import CartContext from '../../components/CartContext';
import ViewSessionPaginationTable from './ViewSessionPaginationTable';
import Typography from '../../components/Typography';

//Firebase
import {useAuthState} from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
    getAuth
} from "firebase/auth";
import { getFirestore, collection, query, 
orderBy, limit, startAfter, getDocs, doc, where  } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import firebase from "firebase/app";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

//other
import NEXTLink from 'next/link'
import { useRouter } from 'next/router';



export default function ViewSession() {
    //state
    const [ordersData, setOrdersData] = useState([]);

    //initial firebase with routing
    const app = InitFirebase();
    const db = getFirestore(app);
    const storage = getStorage();
    const auth = getAuth();

    //user.data usage
    const [user, loading, error] = useAuthState(auth)
    

    //Link
    const router = useRouter();

    useEffect(() => {
        if (!user) return;
      
        const fetchData = async () => {
          const userID = user.uid;
          const services = [];
      
          // Query for buyerID
          const buyerQuery = query(collection(db, "userSessions"), where("buyerID", "==", userID));
          const buyerQuerySnapshot = await getDocs(buyerQuery);
      
          // Query for sellerID
          const sellerQuery = query(collection(db, "userSessions"), where("sellerID", "==", userID));
          const sellerQuerySnapshot = await getDocs(sellerQuery);
      
          // Conditionally run queries
          let querySnapshot;
      
          if (buyerQuerySnapshot.docs.length > 0 && userID === buyerQuerySnapshot.docs[0].data().buyerID) {
            querySnapshot = buyerQuerySnapshot;
          } else if (sellerQuerySnapshot.docs.length > 0 && userID === sellerQuerySnapshot.docs[0].data().sellerID) {
            querySnapshot = sellerQuerySnapshot;
          } else {
            return;
          }
      
          for (const doc of querySnapshot.docs) {
            const docData = doc.data();
      
            services.push({
              id: doc.id,
              ArriveBuyer: docData.ArriveBuyer,
              ArriveSeller: docData.ArriveSeller,
              buyerID: docData.buyerID,
              orderID: docData.orderID,
              rating: docData.rating,
              sellerID: docData.sellerID,
              serviceId: docData.serviceId,
            });
          }
      
          setOrdersData(services);
        };
      
        fetchData();
      }, [user]);

    return (
      <div>
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
          <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }} border={1}>
            <Typography variant="h4" marked="center" component="h2" >
              My Sessions
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <ViewSessionPaginationTable ordersData={ordersData} />
            </div>
          </Box>
        </Container>
      </div>
    )
}
