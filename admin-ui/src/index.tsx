import React from 'react';
import ReactDOM from 'react-dom';

import AdminUI from '@glue42/server-admin-ui';
import '@glue42/theme';
import '@glue42/theme/dist/packages/rc-select.css';
import "@glue42/server-admin-ui/dist/src/styles/index.css";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import { CustomAuthProvider } from './auth';
require('react-dom');
(window as any).React2 = require('react');
console.log((window as any).React1 === (window as any).React2);

ReactDOM.render(
  <React.StrictMode>
    <AdminUI
      authUser="admin"
      apiURL="http://localhost:4356/api"
      agGridLicKey="your-ag-grid-key"
      auth={new CustomAuthProvider()}
      theme="dark" />
  </React.StrictMode>,
  document.getElementById('root')
);
