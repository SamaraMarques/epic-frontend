import React, { useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { Box } from '@mui/material';
import Typography from '../modules/components/Typography';
import AppForm from '../modules/views/AppForm';
import { required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import FormFeedback from '../modules/form/FormFeedback';
import withRoot from '../modules/withRoot';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function CreateSector() {
  const { enterprise_id } = useParams();
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = required(['name'], values);

    return errors;
  };

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  const handleSubmit = (event) => {
    setSent(true);

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    api
      .post(`/enterprises/${enterprise_id}/sectors`, event)
      .then((response) => {
        navigate(`/enterprise/${enterprise_id}/sectors`);
      })
      .catch((err) => {
        console.error('Erro ' + err);
        navigate(`/enterprise/${enterprise_id}/sectors`);
      });
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Criar setor
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

export default withRoot(CreateSector);
