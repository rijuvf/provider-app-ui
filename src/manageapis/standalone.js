import React from 'react';
import ReactDOM from 'react-dom';

import ViewApis from './ViewApis';

const ViewApisStandalone = () => {
  return <ViewApis />;
};

ReactDOM.render(
  <ViewApisStandalone />,
  document.getElementById('app')
);

module.hot.accept();
