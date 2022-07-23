import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Table,
  Box,
  Stack,
} from '@mui/material';
import defineClassificacao from '../modules/defineClassificacao';
import Typography from '../modules/components/Typography';
import defineGrau from '../modules/defineGrau';

const SectorsResultDescription = ({ sectors }) => {
  return (
    <Box>
      {sectors?.map((sector, index) => {
        return (
          <Stack my={4} direction="column">
            <Typography mr={1} key={index} sx={{ fontWeight: 700 }}>
              {`Resumo do índice de não conformidade do setor ${sector.name}: `}
            </Typography>

            <Typography mt={2} ml={2} key={index}>
              {`Grau de criticidade da informação: ${sector.gci} (${defineGrau(
                sector.gci,
              )})`}
            </Typography>
            <Typography mt={2} ml={2} key={index}>
              {`Grau de importância do setor para o negócio: ${
                sector.gin
              }  (${defineGrau(sector.gin)})`}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
};

export default SectorsResultDescription;
