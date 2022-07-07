import React from 'react';
import './index.css';
import App from './App';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Register from './pages/Register';
import Enterprises from './pages/Enterprises';
import Enterprise from './pages/Enterprise';
import Analyses from './pages/Analyses';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CreateEnterprise from './pages/CreateEnterprise';
import CreateSector from './pages/CreateSector';
import AnalysisResult from './pages/AnalysisResult';
import EnterpriseQuestions from './pages/EnterpriseQuestions';
import SectorQuestions from './pages/SectorQuestions';

const roomElement = document.getElementById('root');
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/enterprises" element={<Enterprises />} />
      <Route path="/enterprise/create" element={<CreateEnterprise />} />
      <Route
        path="/enterprise/:enterprise_id/sectors/create"
        element={<CreateSector />}
      />
      <Route
        path="/enterprise/:enterprise_id/sectors"
        element={<Enterprise />}
      />
      <Route
        path="/enterprise/:enterprise_id/analyses"
        element={<Analyses />}
      />
      <Route
        path="/analyses/:analysis_id/enterprise/:enterprise_id"
        element={<EnterpriseQuestions />}
      />
      <Route
        path="/analyses/:analysis_id/sector/:sector_id"
        element={<SectorQuestions />}
      />
      <Route
        path="/analyses/:analysis_id/result"
        element={<AnalysisResult />}
      />
    </Routes>
  </BrowserRouter>,
  roomElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
