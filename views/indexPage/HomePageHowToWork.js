import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import NEXTLink from 'next/link'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function HomePageHowToWork() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secordary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/bg2.jpg"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.25,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          How To Freelance
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src= "/border_color_black_24dp.svg"
                  alt="Register"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                    Register and login to your account.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/storefront_black_24dp.svg"
                  alt="Post Service"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                    Select games you want to freelance, then publish your services.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/auto_graph_black_24dp.svg"
                  alt="Wait for Customer"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                    Wait for your customer, talk about details togather.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component={NEXTLink}
          prefetch={false}
          href="/SignInPage"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default HomePageHowToWork;
