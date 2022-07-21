import React from 'react';
import { FormLabel, Stack, Box } from '@mui/material';
import { Field } from 'react-final-form';
import Typography from '../modules/components/Typography';

const DegreeQuestion = ({ question, id, options, ...props }) => {
  return (
    <Box m={2} {...props}>
      <Typography align={'justify'} mb={1}>
        {question}
      </Typography>
      <Stack spacing={2} direction="row">
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="1" />
          <Box sx={{ fontSize: 14 }}>{options[0]}</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field
            name={id}
            component="input"
            type="radio"
            value="2"
            defaultValue="2"
          />
          <Box sx={{ fontSize: 14 }}>{options[1]}</Box>
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <Field name={id} component="input" type="radio" value="3" />
          <Box sx={{ fontSize: 14 }}>{options[2]}</Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DegreeQuestion;
