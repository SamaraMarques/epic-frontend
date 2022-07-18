import * as React from 'react';
import { Box, Link } from '@mui/material';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../src/modules/components/Typography';
import AppFooter from '../src/modules/views/AppFooter';
import AppAppBar from '../src/modules/views/AppAppBar';
import AppForm from '../src/modules/views/AppForm';
import { email, password, required } from '../src/modules/form/validation';
import RFTextField from '../src/modules/form/RFTextField';
import FormButton from '../src/modules/form/FormButton';
import FormFeedback from '../src/modules/form/FormFeedback';
import withRoot from '../src/modules/withRoot';
import { useRouter } from 'next/router';
import api from '../src/utils/axiosClient';

function SignUp() {
  const router = useRouter();
  const [sent, setSent] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [user, setUser]);

  const validate = (values) => {
    const errors = required(
      ['name', 'email', 'password', 'password_confirmation'],
      values,
    );

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
    api
      .post('/register', event)
      .then((response) => {
        router.push('login');
      })
      .catch((err) => {
        console.error('Erro   ' + err);
        router.push('/register');
      });
  };

  return (
    <React.Fragment>
      <AppAppBar user={user} />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Registrar
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/login" underline="always">
              Já possui uma conta?
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
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                autoComplete="given-name"
                fullWidth
                label="Nome"
                name="name"
                required
              />
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Senha"
                type="password"
                margin="normal"
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password_confirmation"
                autoComplete="new-password"
                label="Confirmar Senha"
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
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'Carregando…' : 'Registrar'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
