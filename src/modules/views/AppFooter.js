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
      <Container sx={{ my: 8 }}>
        <Grid container textAlign={'center'}>
          <Grid item xs={4}>
            <Copyright />
          </Grid>
          <Grid item xs={4}>
            <Link
              href={
                'http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm'
              }
            >
              Acesse a LGPD
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link
              href={'https://www.serpro.gov.br/lgpd/menu/a-lgpd/glossario-lgpd'}
            >
              Glossário LGPD
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
