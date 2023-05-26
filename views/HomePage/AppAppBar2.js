import * as React from 'react';
import Box from '@mui/material/Box';
import NEXTLink from 'next/link'
import MUILink from '@mui/material/Link';
import AppBar from '../../components/AppBar';
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Button from '@mui/material/Button';

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:'common.white',
    '&:hover': {
    backgroundColor:'common.white',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  



//flex :1 all equally identical
function AppAppBar2() {
  return (
    <div>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <VideogameAssetIcon sx={{color:'secondary.main',fontSize: 30}}/>
                <MUILink
                    variant="h6"
                    underline="none"
                    color="inherit"
                    href="/HomePage"
                    component={NEXTLink} 
                    prefetch={false}
                    sx={{ fontSize: 16 }}
                >
                    {'Game Freelancing platform'}
                </MUILink>
                
            <Box sx ={{flex: 1}}>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
              <MUILink
                color="inherit"
                variant="h6"
                underline="none"
                href="/ProfilePage"
                component={NEXTLink} 
                prefetch={false}
                sx={rightLink}
              >
                <PersonIcon sx={{color:'secondary.main',fontSize: 45}}/>
              </MUILink>

              <MUILink
                color="inherit"
                variant="h6"
                underline="none"
                component={NEXTLink} 
                prefetch={false}
                href="/RankingPage"
                sx={rightLink}
              >
                <MilitaryTechIcon sx={{color:'secondary.main',fontSize: 45}}/>
              </MUILink>
              
              <MUILink
                color="inherit"
                variant="h6"
                underline="none"
                component={NEXTLink} 
                prefetch={false}
                href="/MailPage"
                sx={rightLink}
              >
                <EmailIcon sx={{color:'secondary.main',fontSize: 45}}/>
              </MUILink>

              <MUILink
                color="inherit"
                variant="h6"
                underline="none"
                component={NEXTLink} 
                prefetch={false}
                href="/NotificationPage"
                sx={rightLink}
              >
                <NotificationsActiveIcon sx={{color:'secondary.main',fontSize: 45}}/>
              </MUILink>
            </Box>

            
          </Toolbar>
        </AppBar>
        <Toolbar />
    </div>
  );
}

export default AppAppBar2;
