import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ProductList from '../views/HomePage/ProductList';
import InformationRow from '../views/HomePage/InformationRow';
import { IconButton, Typography, TextField, Box, Fab, Dialog, DialogContent, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MicIcon from '@mui/icons-material/Mic';
import { getIntent } from '../nlu';

function HomePage() {
  const [responseText, setResponseText] = useState('');
  const [inputText, setInputText] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const speechRecognition = useRef(null);

  const handleUserIntent = (intent, inputText) => {
    switch (intent) {
      case 'greeting':
        return 'Hi there!';
      case 'getTime':
        return `The current time is ${new Date().toLocaleTimeString()}.`;
      case 'getDate':
        return `Today's date is ${new Date().toLocaleDateString()}.`;
      case 'getDate':
        return `Today's date is ${new Date().toLocaleDateString()}.`;
      case 'viewRanking':
        router.push('/RankingPage');
        break;
      case 'viewProfile':
        router.push('/ProfilePage');
        break;
      case 'help':
        return (<>
          <div>How to use the page?</div>
          <div>1.Create service: click post a service to go to create service page and click create service</div>
          <div>2.Why I can not upload image in ranking? No make-data is allowed and error data needs to be re-upload</div>
          <div>3.How to pay if I dont have paypal? the website uses paypal button as e-payment, however paypal also accept credit card/back transfer without account</div>
        </>)
      case 'search':
        const searchQuery = inputText.split(' ')[1];
        setSearchTerm(searchQuery);
        break;
      case 'findFamousGame':
        return (<>
          <div>1.OverWatch2</div>
          <div>2.Warframe</div>
          <div>3.Roblox</div>
          <div>4.CS2</div>
          <div>5.Mincraft</div>
          <div>6.AmongUS</div>
        </>)
      default:
        return (
          <>
            <div>I did not understand your request. Please try again</div>
            <div>The Chat bot command is as follow:</div>
            <div>
              <div>greetingPattern = (hello|hi|hey|howdy|greetings)</div>
              <div>timePattern = (get|view|what is|show|current|right now|today's|now)(the)time</div>
              <div>datePattern = (get|view|what is|show|current|today's)(the)date</div>
              <div>viewRankingPattern = (view|show|display)(the)ranking;</div>
              <div>searchPattern = (search|find|look)(Games Name)</div>
              <div>viewProfilePattern = (view|show|display)(the)Profile</div>
              <div>findFamousGamePattern = (show|list)(the)(famous|popular|top)(games);</div>
            </div>
          </>
        );
    }
  };

  //voice input
  const startVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecognition.current = new SpeechRecognition();
      speechRecognition.current.continuous = false;
      speechRecognition.current.interimResults = false;
      speechRecognition.current.lang = 'en-US';

      speechRecognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        const intent = getIntent(transcript);
        const responseText = handleUserIntent(intent, transcript);
        setResponseText(responseText);
      };

      speechRecognition.current.onerror = (event) => {
        console.error('Error during speech recognition:', event.error);
      };

      speechRecognition.current.start();
    } else {
      console.error('SpeechRecognition is not supported in this browser.');
    }
  };

  const stopVoiceInput = () => {
    if (speechRecognition.current) {
      speechRecognition.current.stop();
      speechRecognition.current = null;
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const intent = getIntent(inputText);
    const responseText = handleUserIntent(intent, inputText);
    setResponseText(responseText);
    setInputText('');
  };

  const handleClickOpen = () => {
    setChatOpen(true);
  };

  const handleClose = () => {
    setChatOpen(false);
  };

  return (
    <>
      <AppAppBar2 />
      <InformationRow />
      <ProductList searchTerm={searchTerm} />
      <Box position="fixed" bottom={24} right={24}>
        <Fab color="primary" aria-label="open chat" onClick={handleClickOpen}>
          <ChatIcon />
        </Fab>
      </Box>
      <Dialog onClose={handleClose} open={chatOpen} maxWidth="xs" fullWidth>
        <DialogTitle>Chat with our bot</DialogTitle>
        <DialogContent>
          <Typography variant="body1" component="div">{responseText}</Typography>
          <form onSubmit={handleTextSubmit}>
            <TextField
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              label="Type here"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Box textAlign="right" mt={1}>
              <IconButton color="primary" aria-label="start voice input" onClick={startVoiceInput}>
                <MicIcon />
              </IconButton>
              <IconButton type="submit" color="primary" aria-label="submit">
                Send
              </IconButton>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
      <AppFooter2 />
    </>
  );
}

export default withRoot(HomePage);