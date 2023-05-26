import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

//Firebase
import { useAuthState } from "react-firebase-hooks/auth"
import InitFirebase from "../../Firebase/InitFirebase";
import {
  getAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "@firebase/database";
import { collection, query, orderBy, doc, getDocs, deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import firebase from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';

function Ranking() {
  const [file, setFile] = useState(null);
  const [responseWords, setResponseWords] = useState([]);
  const [rankingData, setRankingData] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [userRecords, setUserRecords] = useState({});
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  //initial firebase with routing
  const app = InitFirebase();
  const db = getFirestore(app);
  const storage = getStorage()
  const auth = getAuth()
  //user.data usage
  const [user] = useAuthState(auth)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true); // Set loading to true before API call
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response words:", data.words);
        setResponseWords(data.words);
        // Upload the extracted data to Firestore
        const extractedData = titles.map((title) => getInfoByTitle(title, data.words)).filter(Boolean);
        uploadDataToFirestore(user.uid, extractedData);

      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
      setIsLoading(false); // Set loading to false after API call
    } catch (error) {
      console.error('Error during API call:', error);
      alert(`Error during API call: ${error.message}`);
    }
  };

  const getInfoByTitle = (title, data) => {
    const regex = new RegExp(`${title}\\s*([\\d,]+%?)([^\\d]|$)`);
    const joinedData = data.join('').replace(/﹒|，/g, '.');
    const match = joinedData.match(regex);

    if (match) {
      return {
        title,
        value: match[1]
      };
    }

    return null;
  };

  const uploadDataToFirestore = async (uid, data) => {
    const dataToUpload = data.reduce((acc, item) => {
      if (item) {
        acc[item.title] = item.value;
      }
      return acc;
    }, {});

    try {
      await setDoc(doc(db, "userRanking", uid), dataToUpload);
      console.log("Data successfully uploaded to Firestore");
    } catch (error) {
      console.error("Error uploading data to Firestore:", error);
    }
  };


  const titles = ['總遊戲時間', '任務完成數', '任務失敗數', '完成率'];
  const extractedInfo = titles.map((title) => getInfoByTitle(title, responseWords)).filter(Boolean);

  //ranking
  const calculateScore = (data) => {
    try {
      const totalTime = parseInt(data['總遊戲時間']);
      const tasksCompleted = parseInt(data['任務完成數'].replace(',', ''));
      const tasksFailed = parseInt(data['任務失敗數']);
      const completionRate = parseFloat(data['完成率'].replace('%', ''));

      // You can adjust the score calculation based on your desired ranking formula
      const score = (totalTime + tasksCompleted + completionRate) - tasksFailed;
      return score;
    } catch (error) {
      setError("Please use an image with dimensions at least 600x580.");
      deleteUserRanking(auth.currentUser.uid, () => setDeleted(true));
    }
  };

  //data fetch
  useEffect(() => {
    const fetchData = async () => {
      await fetchUserProfiles();
      const rankingRef = collection(db, "userRanking");
      const rankingQuery = query(rankingRef, orderBy("總遊戲時間", "desc"));
      const querySnapshot = await getDocs(rankingQuery);

      const rankingData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const score = calculateScore(data);
        return {
          ...data,
          score,
          uid: doc.id,
        };
      });

      // Sort the ranking data by score
      rankingData.sort((a, b) => b.score - a.score);
      setRankingData(rankingData);
    };

    fetchData();
    if (user) {
      fetchUserPersonalData();
    }

    // Reset the 'deleted' state after the data has been fetched and UI updated
    if (deleted) {
      setDeleted(false);
    }
  }, [user, deleted]);

  useEffect(() => {
    if (error) {
      window.alert(error);
      setError(null);
    }
  }, [error]);

  //delete
  async function deleteUserRanking(uid, onDeleteSuccess) {
    try {
      const userRankingDoc = doc(db, 'userRanking', uid);
      await deleteDoc(userRankingDoc);
      console.log('Document deleted successfully.');
      onDeleteSuccess();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  const fetchUserProfiles = async () => {
    const userProfilesRef = collection(db, "userProfile");
    const userProfilesSnapshot = await getDocs(userProfilesRef);

    const userProfilesData = userProfilesSnapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    setUserProfiles(userProfilesData);
  };

  const fetchUserPersonalData = async () => {
    const userId = user.uid;
    const userRecordRef = doc(db, "userRanking", userId);
    const userRecordSnapshot = await getDoc(userRecordRef);

    if (userRecordSnapshot.exists()) {
      setUserRecords({
        uid: userRecordSnapshot.id,
        ...userRecordSnapshot.data(),
      });
    } else {
      console.log('No such document!');
    }
  };

  const getUserNameById = (uid) => {
    const userProfile = userProfiles.find((profile) => profile.uid === uid);
    return userProfile ? userProfile.userName : 'Unknown';
  };

  // Do nothing since the input is read-only
  const handleInputChange = (event) => {
    // Do nothing since the input is read-only
  };


  return (
    <div>
      <Container maxWidth="sm" >
        <Typography variant="h4" gutterBottom>OCR Image Upload</Typography>
        <form onSubmit={handleSubmit}>
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
          </label>
          <Typography variant="body1" gutterBottom>{file ? file.name : 'No image chosen'}</Typography>
          <Button variant="contained" color="primary" type="submit">
            Upload and Process
          </Button>
          {isLoading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100px"
            >
              <CircularProgress />
            </Box>
          )}
        </form>
        <Typography variant="h6" gutterBottom>Extracted Information:</Typography>
        <ul>
          {extractedInfo.map((info, index) => (
            <li key={index}>{info.title}: {info.value}</li>
          ))}
        </ul>
        <Box border={1} borderColor="black">
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
              My Records
            </Typography>
            <TextField
              id="outlined-size-normal"
              label="總遊戲時間"
              value={userRecords.總遊戲時間 || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-size-normal"
              label="任務完成數"
              value={userRecords.任務完成數 || ''}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-size-normal"
              label="任務失敗數"
              value={userRecords.任務失敗數 || ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              id="outlined-size-normal"
              label="完成率"
              value={userRecords.完成率 || ''}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          </Container>
        </Box>

      </Container>
      <TableContainer component={Paper}>
        <Table sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>總遊戲時間</TableCell>
              <TableCell>任務完成數</TableCell>
              <TableCell>任務失敗數</TableCell>
              <TableCell>完成率</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingData.map((data, index) => (
              <TableRow key={data.uid}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{getUserNameById(data.uid)}</TableCell>
                <TableCell>{data['總遊戲時間'] + "天"}</TableCell>
                <TableCell>{data['任務完成數']}</TableCell>
                <TableCell>{data['任務失敗數']}</TableCell>
                <TableCell>{data['完成率']}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Ranking;