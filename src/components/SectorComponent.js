import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const SectorComponent = ({ name, id }) => {
  return (
    <Box
      m={1}
      sx={{
        border: '2px solid ',
        borderRadius: 2,
      }}
    >
      <Grid container p={1}>
        <Grid item xs={10}>
          <Div>{name}</Div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default SectorComponent;
