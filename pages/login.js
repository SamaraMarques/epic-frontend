import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { Box, Link } from '@mui/material';
import Typography from '../src/modules/components/Typography';
import AppFooter from '../src/modules/views/AppFooter';
import AppAppBar from '../src/modules/views/AppAppBar';
import AppForm from '../src/modules/views/AppForm';
import { email, password, required } from '../src/modules/form/validation';
import RFTextField from '../src/modules/form/RFTextField';
import FormButton from '../src/modules/form/FormButton';
import FormFeedback from '../src/modules/form/FormFeedback';
import withRoot from '../src/modules/withRoot';
import axios from 'axios';
import { useRouter } from 'next/router';

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [user, setUser]);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    if (!errors.password) {
      const passwordError = password(values.password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }

    return errors;
  };

  const handleSubmit = (event) => {
    setSent(true);

    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: { Accept: 'application/json' },
    });
    api
      .post('/login', event)
      .then((response) => {
        localStorage.setItem('token', response.data.token || undefined);
        router.push('/enterprises');
      })
      .catch((err) => {
        console.error('Erro ' + err);
        localStorage.clear();
        router.push('/login');
      });
  };

  return (
    <React.Fragment>
      <AppAppBar user={user} />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Entrar
          </Typography>
          <Typography variant="body2" align="center">
            {'Não é registrado ainda? '}
            <Link href="/register/" align="center" underline="always">
              Registre-se aqui
            </Link>
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
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Senha"
                type="password"
                margin="normal"
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
                {submitting || sent ? 'Carregando…' : 'Entrar'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link
            underline="always"
            href="/premium-themes/onepirate/forgot-password/"
          >
            Esqueceu sua senha?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
