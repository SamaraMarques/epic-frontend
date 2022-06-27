import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const EnterpriseComponent = ({ name, id }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack spacing={2} direction="column">
        <Stack spacing={2} direction="row">
          <Div>{name}</Div>
          <Button variant="contained">
            <EditIcon />
          </Button>
        </Stack>
        <Stack spacing={2} direction="row">
          <Button variant="contained" href={`/enterprise/${id}/sectors`}>
            Setores
          </Button>
          <Button variant="contained" href={`/enterprise/${id}/analyses`}>
            Análises
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EnterpriseComponent;
