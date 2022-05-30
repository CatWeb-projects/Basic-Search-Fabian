import React from 'react';
import createRoot from 'react-dom';
import { CreateRouter } from 'estafette-router';
import { ProviderContext } from 'contexts/Context';
import { routes } from 'routes';

createRoot.render(
  <React.StrictMode>
    <ProviderContext>
      <CreateRouter routes={routes} />
    </ProviderContext>
  </React.StrictMode>,
  document.getElementById('root')
);
