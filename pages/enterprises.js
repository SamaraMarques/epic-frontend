import { useEffect, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import EnterpriseComponent from '../src/components/EnterpriseComponent';
import AppAppBar from '../src/modules/views/AppAppBar';
import withRoot from '../src/modules/withRoot';
import { useRouter } from 'next/router';
import api from '../src/utils/axiosClient';

const Enterprises = () => {
  const [enterprises, setEnterprises] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!user) {
        setUser(JSON.parse(window.localStorage.getItem('user')));
      }
    }

    api
      .get('/enterprises', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setEnterprises(response.data))
      .catch((err) => {
        console.log(err);
        window.localStorage.clear();
        router.push('/');
      });

    api
      .get('/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.user) || undefined,
        );
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.clear();
        router.push(`/`);
      });
  }, [token, router, user, setUser]);

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

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
