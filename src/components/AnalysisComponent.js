import { Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import React from 'react';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const AnalysisComponent = ({ id, enterprise_id, created_at }) => {
  const formattedDate = new Date(created_at).toLocaleDateString('pt-BR');
  return (
    <Box m={2}>
      <Stack spacing={3} direction="row">
        <Stack direction="column">
          <Div>{`Análise #${id}`}</Div>
          <Div>{`Data: ${formattedDate}`}</Div>
        </Stack>
        <Stack>
          <Button variant="contained" href={`/analyses/${id}/result`}>
            <ArticleIcon />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AnalysisComponent;
