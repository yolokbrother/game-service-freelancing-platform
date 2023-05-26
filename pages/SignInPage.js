import React from 'react'
import AppAppBar from '../views/indexPage/AppAppBar'
import withRoot from './withRoot';
import Appfooter from '../views/indexPage/Appfooter';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '../components/Typography';
import MUILink from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FirebaseSignIn from '../Firebase/FirebaseSignIn';
import NEXTLink from 'next/link'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function loginPage() {

  return (
    <>
      <AppAppBar/>
      <Box sx={{display: 'flex', backgroundColor: 'primary.light'}}
      >
        <Container maxWidth="sm" sx={{ backgroundColor: 'peachpuff', mt:5, mb:8}}>        

          <Grid component="form" container direction="column" alignItems="center" justifyContent="center" spacing={4} sx={{mt:5,mb:9}} noValidate autoComplete="off">

            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                Sign In
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                {'If do not have account, use form below to sign up'}
              </Typography>
            </Grid>


              <Grid item xs={12}>
                <FirebaseSignIn/>
              </Grid>

              <Grid item xs={12}>
                <Button component={NEXTLink} prefetch={false} href="/" variant="contained" color="secondary" size="large">
                    Back
                </Button>
              </Grid>
          </Grid>
      </Container>
      </Box>
      <Appfooter/>
    </>
  )
}

export default withRoot(loginPage)
