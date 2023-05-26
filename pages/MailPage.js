import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';



function MailPage() {
    return (
      <>
        <AppAppBar2/>

        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(MailPage)
