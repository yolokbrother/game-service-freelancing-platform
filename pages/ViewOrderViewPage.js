import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ViewServiceView from '../views/ViewOrderPage/ViewServiceView';


function ViewCreatedServicePage() {
    return (
      <>
        <AppAppBar2/>
        <ViewServiceView/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(ViewCreatedServicePage)