import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ViewOrder from '../views/ViewOrderPage/ViewOrder';





function CreateServicePage1() {
    return (
      <>
        <AppAppBar2/>
        <ViewOrder/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(CreateServicePage1)