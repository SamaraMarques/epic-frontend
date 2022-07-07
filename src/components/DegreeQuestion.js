import Box from '@mui/material/Box';
import React from 'react';
import { FormLabel, Stack } from '@mui/material';
import { Field } from 'react-final-form';

const DegreeQuestion = ({ question, id }) => {
  return (
    <Box m={2}>
      <FormLabel>{question}</FormLabel>
      <Stack spacing={2} direction="row">
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="1" />
          <Box>1</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field
            name={id}
            component="input"
            type="radio"
            value="2"
            defaultValue="2"
          />
          <Box>2</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="3" />
          <Box>3</Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DegreeQuestion;
