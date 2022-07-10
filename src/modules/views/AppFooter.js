import * as React from 'react';
import { Grid, Link, Container } from '@mui/material';
import Typography from '../components/Typography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="/">
        EPIC
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item>
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
