import React from 'react';
import { FormLabel, Stack, Box } from '@mui/material';
import { Field } from 'react-final-form';
import Typography from '../modules/components/Typography';

const EnterpriseQuestion = ({ question, id }) => {
  return (
    <Box m={2}>
      <Typography align={'justify'} mb={1}>
        {question}
      </Typography>
      <Stack spacing={2} direction="row">
        <Stack direction="row" spacing={0.5}>
          <Field
            name={id}
            component="input"
            type="radio"
            value="1"
            defaultValue="1"
          />
          <Box sx={{ fontSize: 14 }}>Sim</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="0" />
          <Box sx={{ fontSize: 14 }}>Não</Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EnterpriseQuestion;
