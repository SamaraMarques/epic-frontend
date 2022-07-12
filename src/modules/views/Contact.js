import * as React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Contact() {
  return (
    <Container component="section" id="contact">
      <Grid container textAlign={'center'} my={8}>
        <Grid item xs={12} mb={10}>
          <Typography
            variant="h5"
            fontFamily={"'Roboto Condensed', sans-serif"}
            textTransform="uppercase"
            fontWeight={700}
          >
            Contato
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <PhoneIcon fontSize="large" />
          <Typography variant="subtitle1">{'(53) 99979-0198'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <EmailIcon fontSize="large" />
          <Typography variant="subtitle1">
            samarabuenomarques@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <LinkedInIcon fontSize="large" />
          <Typography variant="subtitle1">samarabmarques</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contact;
