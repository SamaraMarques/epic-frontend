import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as axios from 'axios';
import SectorComponent from '../components/SectorComponent';

const Enterprise = () => {
  const { enterprise_id } = useParams();

  const [sectors, setSectors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    api
      .get(`/enterprise/${enterprise_id}/sectors`)
      .then((response) => setSectors(response.data))
      .catch((err) => {
        console.log(err);
        navigate('/enterprises');
      });
  });
  return (
    <div>
      <div className="m-4">
        <button type="button" className="btn btn-info mx-2">
          Adicionar Setor
        </button>
        <button type="button" className="btn btn-info mx-2">
          Exibir análises
        </button>
      </div>
      <div className="row m-3">
        {sectors.map((enterprise, index) => {
          return (
            <SectorComponent key={index} name={enterprise?.name} id={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Enterprise;
