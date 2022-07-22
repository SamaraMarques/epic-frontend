import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../utils/axiosClient';
import { useRouter } from 'next/router';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const SectorComponent = ({ name, id, token, enterprise_id }) => {
  const router = useRouter();
  const deleteSector = () => {
    api
      .delete(`/sectors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then()
      .catch((err) => {
        console.log(err);
      });
    router.push(`/enterprise/${enterprise_id}/sectors`);
  };
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
        <Grid item xs={2}>
          <Button variant="contained" onClick={deleteSector}>
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectorComponent;
