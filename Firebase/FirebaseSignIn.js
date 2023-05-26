import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {
    getAuth,
    GoogleAuthProvider,
    TwitterAuthProvider,
    EmailAuthProvider
} from "firebase/auth";
import InitFirebase from "../Firebase/InitFirebase";

InitFirebase()

const auth = getAuth()

const firebaseAuthConfig = {
    signInFlow: 'popup',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        // add additional auth flows below
        GoogleAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/HomePage',
    credentialHelper: 'none',
}

const FirebaseSignIn = () => {
    return (
        <div>
        <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={auth}/>
        </div>
    )
}

export default FirebaseSignIn

