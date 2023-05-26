import * as React from 'react';
import { useState, useRef,useEffect } from "react";
//MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

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

//Other
import Typography from '../../components/Typography';
import NEXTLink from 'next/link'

function ProfileDetail() {
    //fileupload
    const StyledInput = styled(Input)({
        display: "none",
    });

    //State setting
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const [file, setFile] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBio, setUserBio] = useState("");
    const [data, setData] = useState([])
    const posts = [];

    const inputRef = useRef();

    //initial firebase with routing
    const app = InitFirebase();
    const db = getFirestore(app);
    const storage = getStorage()
    const auth = getAuth()

    //user.data usage
    const [user, loading, error] = useAuthState(auth)

    //read data
    useEffect(() => {
    const readData = async () => {
        try {
            const userDocGet = doc(db, "userProfile", user.uid)
            await getDoc(userDocGet).then((doc) => {
                if (doc.exists()) {
                    const getData = doc.data();
                    posts.push({userKey:user.uid,userName:getData.userName, userEmail:getData.userEmail, userBio:getData.userBio, userAvatarUrl:getData.avatarUrl}) 
                }
            })
            setData(posts)
        } catch (error) {
        }
    }
    readData()
    }, [user]);

    useEffect(() => {
        if (!user) return;
      
        const checkUserDoc = async () => {
          try {
            const userDocRef = doc(db, 'userProfile', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
      
            if (!userDocSnapshot.exists()) {
              await setDoc(userDocRef, {
                userName: user.displayName,
                userEmail: user.email,
                userBio: "",
                avatarUrl: "",
              });
              posts.push({userKey:user.uid,userName:user.displayName, userEmail:user.email, userBio:"", userAvatarUrl:""}) 
              setData(posts)
              window.location.reload()
            } else {
              console.log('User document already exists.');
            }
          } catch (error) {
            console.log(error);
            alert(error);
          }
        };
      
        checkUserDoc();
      }, [user]);

    const handleAvatarClick = () => {
        console.log("Avatar clicked");
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleSwitchChange = (event) => {
        setIsEditable(event.target.checked);
    };

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
        // create a storage ref
        const storageRef = ref(storage, `user_avator/${user.uid}`);
        // upload file
        const uploadTask = uploadBytesResumable(storageRef, file);
        const reader = new FileReader();

        reader.onload = (event) => {
            setAvatarUrl(event.target.result);
        };
        uploadTask.on(
            "state_changed",
            (snapshot) => {

            },
            (error) => {
              console.error("Error uploading file to Firebase Storage: ", error);
            },
            () => {
              alert('Avator has changed!')
            }
         );
        reader.readAsDataURL(file);
    };


    //loading...redirect
    if (loading) {
        return <div>Loading...</div>
    }  

    //User Update
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userDoc = doc(db, "userProfile", user.uid)
                await setDoc(userDoc, {
                    userName: userName,
                    userEmail: userEmail,
                    userBio: userBio,
                    avatarUrl: avatarUrl,
                })
            alert('Data was successfully sent to cloud firestore!')
        } catch (error) {
            console.log(error)
            alert(error)
        }
    };




    return (
        <div >
            {data.map((item) => (
                <div key={item.userKey}>
                    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Card>
                                        <Typography color="inherit" align="center" variant="h2" marked="center">
                                            Profile
                                        </Typography>
                                        <CardMedia>
                                            <label htmlFor="avatar-upload">
                                                <Avatar
                                                    src={item.userAvatarUrl}
                                                    sx={{ width: 150, height: 150, cursor: "pointer", marginLeft: '10px' }}
                                                    onClick={handleAvatarClick}
                                                />
                                            </label>
                                            <StyledInput
                                                id="avatar-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                                ref={inputRef}
                                            />
                                        </CardMedia>

                                        <CardContent>

                                            <TextField
                                                label="User Name"
                                                name="userName"
                                                defaultValue={item.userName}
                                                disabled={!isEditable}
                                                onChange={(event) => setUserName(event.target.value)}
                                                sx={{ marginRight: '10px' }}
                                            />
                                            <TextField
                                                label="User Email"
                                                name="userEmail"
                                                defaultValue={item.userEmail}
                                                disabled={!isEditable}
                                                onChange={(event) => setUserEmail(event.target.value)}
                                                sx={{ marginLeft: '10px' }}
                                            />
                                            <br />
                                            <TextField
                                                id="filled-multiline-static"
                                                label="Bio"
                                                name="userBio"
                                                multiline
                                                rows={4}
                                                defaultValue={item.userBio}
                                                variant="filled"
                                                disabled={!isEditable}
                                                onChange={(event) => setUserBio(event.target.value)}
                                                sx={{ width: '52%', marginTop: '10px' }}
                                            />
                                        </CardContent>
                                        <CardActions>

                                            <Typography variant="h5" component="div">
                                                Edit
                                            </Typography>
                                            <Switch
                                                checked={isEditable}
                                                onChange={handleSwitchChange}
                                                color="primary"
                                            />
                                            <Button onClick={handleSubmit} variant="contained" sx={{ marginRight: '10px' }}>Update</Button>
                                            <Button component={NEXTLink} prefetch={false} href="/" onClick={() => auth.signOut()} variant="contained" sx={{ marginLeft: '10px' }}>Log Out</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
            </div>
            ))}         
        </div>
    );
}

export default ProfileDetail;

