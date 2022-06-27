import { Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const SectorComponent = ({ name, id }) => {
  return (
    <Box>
      <Stack spacing={3} direction="row">
        <Div>{name}</Div>
        <Button variant="contained">
          <EditIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default SectorComponent;
