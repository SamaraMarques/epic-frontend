import React from 'react';

const Register = () => {
  return (
    <div className="container-sm col-6 border border-dark p-5 my-5">
      <p className="display-5">Registrar</p>
      <div className="my-5">
        <label className="form-label mb-2">Nome</label>
        <input type="text" class="form-control mb-3" placeholder="Nome" />
        <label className="form-label mb-2">Email</label>
        <input type="email" class="form-control mb-3" placeholder="Email" />
        <label className="form-label mb-2">Senha</label>
        <input type="password" class="form-control mb-3" placeholder="Senha" />
        <label className="form-label mb-2">Confirmar Senha</label>
        <input
          type="password"
          class="form-control"
          placeholder="Confirmar Senha"
        />
      </div>
      <div className="row">
        <button type="button" className="btn btn-dark">
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Register;
