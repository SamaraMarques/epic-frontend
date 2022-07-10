import { Box, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import React from 'react';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AnalysisComponent = ({ id, enterprise_id, created_at }) => {
  const formattedDate = new Date(created_at).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  return (
    <Box
      m={1}
      sx={{
        border: '2px solid ',
        borderRadius: 2,
      }}
    >
      <Grid container p={1}>
        <Grid item xs={5}>
          <Div>{`Análise #${id}`}</Div>
        </Grid>
        <Grid item xs={5}>
          <Div sx={{ minWidth: 100 }}>{`Data: ${formattedDate}`}</Div>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" href={`/analyses/${id}/result`}>
            <ArticleIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisComponent;
