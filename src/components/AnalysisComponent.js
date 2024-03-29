import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';
import api from '../utils/axiosClient';
import { useRouter } from 'next/router';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AnalysisComponent = ({ id, enterprise_id, created_at, token }) => {
  const router = useRouter();
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
      });
    router.push(`/enterprise/${enterprise_id}/analyses`);
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
          <Button variant="contained" onClick={deleteAnalysis}>
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisComponent;
