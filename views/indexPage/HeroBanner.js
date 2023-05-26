import * as React from 'react';
import Typography from '../../components/Typography';
import HeroBannerLayout from '../../components/HeroBannerLayout';
import Button from '../../components/Button';
import NEXTLink from 'next/link'

const backgroundImage =
  'https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80';

export default function ProductHero() {
  return (
    <HeroBannerLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Freelance the service you want
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Support different games with data analysis and ranking
      </Typography>

      <Button
        color="secondary"
        variant="contained"
        size="large"
        component={NEXTLink}
        prefetch={false}
        href="/SignInPage"
        sx={{ minWidth: 200 }}
      >
          Get Started
      </Button>
    </HeroBannerLayout>
  );
}
