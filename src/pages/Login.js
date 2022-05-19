import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch({
      url: `${process.env.REACT_APP_API_URL}/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: {
        email: 'usuario3@test.com',
        password: '1234567890',
      },
    })
      .then((res) => res.headers())
      .then(
        (result) => {
          setIsLoaded(true);
          setResult(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, []);

  if (error) {
    console.log(error);
  } else if (!isLoaded) {
    return <h1>"Loading..."</h1>;
  } else {
    console.log(result);
  }

  return (
    <div className="container-sm col-6 border border-dark p-5 my-5">
      <p className="display-5">Login</p>
      <div className="my-5">
        <label className="form-label mb-2">Email</label>
        <input type="email" class="form-control mb-3" placeholder="Email" />
        <label className="form-label mb-2">Senha</label>
        <input type="password" class="form-control" placeholder="senha" />
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-light col-6"
          onClick={() => navigate('/register')}
        >
          Registrar
        </button>
        <button type="button" className="btn btn-dark col-6">
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
