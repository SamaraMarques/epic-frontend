import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';

import EnterpriseComponent from '../components/EnterpriseComponent';
import AppAppBar from '../modules/views/AppAppBar';
import withRoot from '../modules/withRoot';

const Enterprises = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .get('/enterprises')
      .then((response) => setEnterprises(response.data))
      .catch((err) => {
        console.log(err);
        navigate('/');
      });

    api
      .get('/me')
      .then((response) => {
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.user) || undefined,
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, navigate, user, setUser]);

  return (
    <Box>
      <AppAppBar user={user} />
      <Box m={4}>
        <Button variant="contained" href="/enterprise/create">
          Criar Empresa
        </Button>
      </Box>
      <Stack m={3} direction="column">
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

export default withRoot(Enterprises);
