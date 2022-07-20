import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Table,
} from '@mui/material';
import defineClassificacao from '../modules/defineClassificacao';

const SectorsResultTable = ({ sectors }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Setor</TableCell>
            <TableCell align="center">Índice de não conformidade</TableCell>
            <TableCell align="center">Classificação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sectors?.map((sector) => (
            <TableRow
              key={sector.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {sector.name.replace(/^\w/, (c) => c.toUpperCase())}
              </TableCell>
              <TableCell align="center">{sector.finalNCIndex}</TableCell>
              <TableCell align="center">
                {defineClassificacao(sector.finalNCIndex)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectorsResultTable;
