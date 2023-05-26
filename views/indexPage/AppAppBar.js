import * as React from 'react';
import Box from '@mui/material/Box';
import NEXTLink from 'next/link'
import MUILink from '@mui/material/Link';
import AppBar from '../../components/AppBar';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

//muitoolbar override the theme
const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

//flex :1 all equally identical
function AppAppBar() {
  return (
    <div>
        <AppBar position="fixed" color="primary">
          <Toolbar sx={{ justifyContent: 'space-between' }}>

            
            <Box sx={{ flex: 1}} >
              
            </Box>

            <VideogameAssetIcon sx={{color:'secondary.main',fontSize: 40}}/>
              <MUILink
                component={NEXTLink}
                prefetch={false}
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ fontSize: 24 }}
              >
                {'Game Freelancing platform'}
              </MUILink>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
              <MUILink
                component={NEXTLink}
                prefetch={false}
                color="inherit"
                variant="h6"
                underline="none"
                href="/SignInPage"
                sx={rightLink}
              >
                {'Sign In'}
              </MUILink>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
    </div>
  );
}

export default AppAppBar;
