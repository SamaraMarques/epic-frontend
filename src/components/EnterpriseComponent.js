import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box, Button } from '@mui/material';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const EnterpriseComponent = ({ name, id }) => {
  return (
    <Box
      m={1}
      sx={{
        border: '2px solid ',
        borderRadius: 2,
      }}
    >
      <Grid container p={1}>
        <Grid item xs={8}>
          <Div>{name}</Div>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" href={`/enterprise/${id}/sectors`}>
            Setores
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" href={`/enterprise/${id}/analyses`}>
            Análises
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnterpriseComponent;
