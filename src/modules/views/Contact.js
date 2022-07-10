import * as React from 'react';
import { Container, Typography } from '@mui/material';

function Contact() {
  return (
    <Container
      component="section"
      id="contact"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 9,
      }}
    >
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>
    </Container>
  );
}

export default Contact;
