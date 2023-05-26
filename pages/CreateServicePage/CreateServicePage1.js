import React from 'react'
import withRoot from '../withRoot';
import AppAppBar2 from '../../views/HomePage/AppAppBar2';
import AppFooter2 from '../../views/HomePage/Appfooter2';
import CreateServiceForm from '../../views/CreateServicePage/CreateServiceForm';



function CreateServicePage1() {
    return (
      <>
        <AppAppBar2/>
        <CreateServiceForm/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(CreateServicePage1)