import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { Button } from '@mui/material';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h5"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'EPIC'}
          </Link>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={rightLink}
            >
              {'Contato'}
            </Link>
            <Button
              variant="contained"
              sx={{ ...rightLink, color: 'secondary.main', ml: 3 }}
              href="/login"
              disableElevation
            >
              Entrar
            </Button>
            <Button
              variant="outlined"
              sx={{ ...rightLink, ml: 2 }}
              color="secondary"
              href="/register"
            >
              Registrar
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
