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
import InfoIcon from '@mui/icons-material/Info';
import Typography from '../modules/components/Typography';
import defineGrau from '../modules/defineGrau';
import sectorQuestions from '../utils/sectorQuestions';
import sectorQuestionsTips from '../utils/sectorQuestionsTips';

const CriticalSectorDescription = ({ sector }) => {
  return (
    <Box>
      <Stack my={4} direction="column">
        <Typography mr={1} sx={{ fontWeight: 700 }}>
          {`O setor ${sector.name} foi o que apresentou o índice mais alto de não conformidade`}
        </Typography>
        <Typography mt={4} ml={2}>
          {`Grau de criticidade da informação: ${sector.gci} (${defineGrau(
            sector.gci,
          )})`}
        </Typography>
        <Typography my={4} ml={2}>
          {`Grau de importância do setor para o negócio: ${
            sector.gin
          }  (${defineGrau(sector.gin)})`}
        </Typography>
        {sector?.answers.map((answer, index) => {
          return (
            <Stack
              sx={{ pageBreakInside: 'avoid' }}
              my={2}
              ml={2}
              spacing={2}
              direction={'column'}
            >
              <Stack spacing={1} direction="row">
                <Typography key={index}>
                  {`${sectorQuestions[index]} `}
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>{`${
                  answer === '1'
                    ? 'Sim'
                    : answer === '0'
                    ? 'Não'
                    : 'Não se aplica'
                }`}</Typography>
              </Stack>
              {answer === '0' && (
                <Stack ml={2} spacing={1} direction={'row'}>
                  <InfoIcon />
                  <Typography
                    sx={{ color: 'gray' }}
                  >{`${sectorQuestionsTips[index]}`}</Typography>
                </Stack>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default CriticalSectorDescription;
