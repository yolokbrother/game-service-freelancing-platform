import React from 'react'
import withRoot from './withRoot';
import AppAppBar2 from '../views/HomePage/AppAppBar2';
import AppFooter2 from '../views/HomePage/Appfooter2';
import ChatFunction from '../views/InboxChatPage/chatfunction';

function InboxChatPage() {
    return (
      <>
        <AppAppBar2/>
        <ChatFunction/>
        <AppFooter2/>
      </>
    )
  }
  
  export default withRoot(InboxChatPage)
