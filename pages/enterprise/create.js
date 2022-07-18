import React, { useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/material';
import Typography from '../../src/modules/components/Typography';
import AppForm from '../../src/modules/views/AppForm';
import { required } from '../../src/modules/form/validation';
import RFTextField from '../../src/modules/form/RFTextField';
import FormButton from '../../src/modules/form/FormButton';
import FormFeedback from '../../src/modules/form/FormFeedback';
import withRoot from '../../src/modules/withRoot';
import axios from 'axios';

function CreateEnterprise() {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState('');

  const validate = (values) => {
    const errors = required(['name'], values);

    return errors;
  };

  if (typeof window !== 'undefined') {
    if (!token) {
      setToken(window.localStorage.getItem('token'));
    }
  }

  const handleSubmit = (event) => {
    setSent(true);

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .post('/enterprises', event)
      .then((response) => {
        router.push('/enterprises');
      })
      .catch((err) => {
        console.error('Erro ' + err);
        router.push('/enterprises');
      });
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Criar empresa
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoComplete="name"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Nome"
                margin="normal"
                name="name"
                required
                size="large"
              />

              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'Carregando…' : 'Confirmar'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(CreateEnterprise);
