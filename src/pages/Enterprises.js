import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';

import EnterpriseComponent from '../components/EnterpriseComponent';

const Enterprises = () => {
  const [enterprises, setEnterprises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    api
      .get('/enterprises')
      .then((response) => setEnterprises(response.data))
      .catch((err) => {
        console.log(err);
        navigate('/');
      });
  });
  return (
    <Box>
      <Box m={2}>
        <Button variant="contained">Criar Empresa</Button>
      </Box>
      <Stack m={5} spacing={5} direction="column">
        {enterprises.map((enterprise, index) => {
          return (
            <EnterpriseComponent
              key={index}
              name={enterprise.name}
              id={enterprise.id}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default Enterprises;