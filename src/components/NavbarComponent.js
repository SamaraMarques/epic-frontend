import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ logged = true }) => {
  let navigate = useNavigate();

  return (
    <div className="d-flex flex-row p-2">
      <div className="p-10">
        <h1>EPIC</h1>
      </div>
      {logged ? (
        <button type="button" className="btn btn-secondary m-2">
          Sair
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-secondary m-2"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      )}
    </div>
  );
};
export default Navbar;
