import * as React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { Button, Box, Link } from '@mui/material';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
};

function AppAppBar({ user = null }) {
  return (
    <Box>
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
              href="/#about"
              sx={rightLink}
            >
              {'Sobre'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/#contact"
              sx={{ ...rightLink, ml: 5 }}
            >
              {'Contato'}
            </Link>
            {user ? (
              <Box>
                <Button
                  variant="contained"
                  sx={{ ...rightLink, color: 'secondary.main', ml: 3 }}
                  href="/enterprises"
                  disableElevation
                >
                  {user.name}
                </Button>
                <Button
                  variant="contained"
                  sx={{ ...rightLink, color: 'secondary.main', ml: 1 }}
                  onClick={() => localStorage.clear()}
                  href="/"
                  disableElevation
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box>
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
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default AppAppBar;
