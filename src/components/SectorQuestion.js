import React from 'react';
import { FormLabel, Stack, Box } from '@mui/material';
import { Field } from 'react-final-form';

const SectorQuestion = ({ question, id }) => {
  return (
    <Box m={2}>
      <FormLabel>{question}</FormLabel>
      <Stack spacing={2} direction="row">
        <Stack direction="row" spacing={0.5}>
          <Field
            name={id}
            component="input"
            type="radio"
            value="1"
            defaultValue="1"
          />
          <Box>Sim</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="0" />
          <Box>Não</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="2" />
          <Box>Não se aplica</Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SectorQuestion;
