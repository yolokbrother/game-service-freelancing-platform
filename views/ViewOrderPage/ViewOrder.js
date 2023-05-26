import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState,createContext,useContext } from 'react';
import CartContext from '../../components/CartContext';
import ViewOrderPaginationTable from './ViewOrderPaginationTable';
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



export default function ViewOrder() {
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

    //pagination table
    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
          const userID = user.uid;
          const services = [];
      
          const q = query(collection(db, "userOrder"),
              where("buyerID", "==", userID),
              where("state", "==", "Payed"),
              orderBy("serviceName"));
          const querySnapshot = await getDocs(q);
          
          for (const doc of querySnapshot.docs) {
            const docData = doc.data();
            const storageRef = ref(storage, `service_image/${docData.serviceID}`);
            const imageURL = await getDownloadURL(storageRef);
            
            services.push({
              id: doc.id,
              serviceId: docData.serviceID,
              serviceName: docData.serviceName,
              serviceImage: imageURL,
              serviceDetail: docData.serviceDetail,
              teamLink: docData.teamLink,
              language: docData.language,
              price: docData.price,
              date: docData.date,
              dateArrange: docData.dateArrange,
              state: docData.state,
              sellerID: docData.sellerID,
              buyerID: docData.buyerID,
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
              My Order
            </Typography>
            <div style={{ height: 400, width: "100%" }}>
              <ViewOrderPaginationTable ordersData={ordersData} />
            </div>
          </Box>
        </Container>
      </div>
    )
}
