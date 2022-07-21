import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';
import api from '../utils/axiosClient';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AnalysisComponent = ({ id, enterprise_id, created_at }) => {
  const [token, setToken] = useState('');

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  const formattedDate = new Date(created_at).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const deleteAnalysis = () => {
    api
      .delete(`/analyses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then()
      .catch((err) => {
        console.log(err);
        //router.push('/enterprises');
      });
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
        <Grid item xs={4}>
          <Div>{`Análise #${id}`}</Div>
        </Grid>
        <Grid item xs={4}>
          <Div sx={{ minWidth: 100 }}>{`Data: ${formattedDate}`}</Div>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" href={`/analyses/${id}/result`}>
            <ArticleIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            href={`/enterprise/${enterprise_id}/analyses`}
            onClick={deleteAnalysis}
          >
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisComponent;
