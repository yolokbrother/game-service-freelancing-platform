import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import StartSession from '../views/StartSessionPage/StartSession';



function ViewCreatedServicePage() {
    return (
        <>
            <AppAppBar2 />
            <StartSession/>
            <AppFooter2 />
        </>
    )
}

export default withRoot(ViewCreatedServicePage)