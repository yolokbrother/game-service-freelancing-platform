import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { collection, query, orderBy, onSnapshot, addDoc, where, QueryConstraint, Query } from 'firebase/firestore';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NEXTLink from 'next/link'

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

const ChatFunction = () => {
  //initial firebase with routing
  const app = InitFirebase();
  const db = getFirestore(app);
  const storage = getStorage()
  const auth = getAuth()

  //user.data usage
  const [user, loading, error] = useAuthState(auth)
  const messagesEndRef = useRef(null);
  const router = useRouter();
  const serviceData = JSON.parse(router.query.serviceData);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messageIds, setMessageIds] = useState(new Set());

  useEffect(() => {
    if (user) {
      const messagesRef = collection(db, 'messages');
      const participantsCondition = where('participants', 'array-contains-any', [user.uid, serviceData.sellerID]);

      const q = query(messagesRef, participantsCondition, orderBy('createdAt'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages((prevMessages) => {
          const newMessages = fetchedMessages.filter((message) => !messageIds.has(message.id));
          newMessages.forEach((message) => messageIds.add(message.id));
          return [...prevMessages, ...newMessages];
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user, db, serviceData]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        sender: user.uid,
        receiver: serviceData.sellerID,
        content: newMessage,
        createdAt: serverTimestamp(),
        participants: [
          `${serviceData.sellerID}`,
          `${user.uid}`,
        ],
      });

      setNewMessage('');
    }
  };


  return (
    <div>
      <div>
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
          <Box
            sx={{
              width: '100%',
              height: '500px',
              textAlign: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            border={1}
          >
            <div>
              {messages.map((message) => (
                <div key={message.id}>
                  <span>
                    {message.sender === user.uid ? 'You: ' : 'Seller: '}
                  </span>
                  {message.content}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage}>
              <TextField
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                variant="outlined"
                style={{ marginRight: 8 }}
              />
              <Button type="submit" variant="contained">
                Send
              </Button>
              <NEXTLink
                href={{
                  pathname: './ViewHomeProductPage',
                  query: { serviceData: JSON.stringify(serviceData) },
                }}
                passHref
                prefetch={false}
              >
                <Button variant="contained" sx={{ mb: '10px', mt: '10px', ml: '10px', alignSelf: 'flex-start' }}>
                  Back
                </Button>
              </NEXTLink>
            </form>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default ChatFunction;