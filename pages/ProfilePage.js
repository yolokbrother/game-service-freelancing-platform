import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ProfileDetail from '../views/ProfilePage/ProfileDetail';
import ProfileFunctions from '../views/ProfilePage/ProfileFunctions';

function ProfilePage() {
    return (
      <>
        <AppAppBar2/>
        <ProfileDetail/>
        <ProfileFunctions/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(ProfilePage)
