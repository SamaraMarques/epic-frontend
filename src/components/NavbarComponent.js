import { useRouter } from 'next/router';
import React from 'react';

const Navbar = ({ logged = true }) => {
  const router = useRouter();

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
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      )}
    </div>
  );
};
export default Navbar;
