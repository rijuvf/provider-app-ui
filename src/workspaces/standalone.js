import React from 'react';
import ReactDOM from 'react-dom';

import ViewWorkspaces from './ViewWorkspaces';

const WorkspacesStandalone = () => {
  return <ViewWorkspaces />;
};

ReactDOM.render(
  <WorkspacesStandalone />,
  document.getElementById('app')
);

module.hot.accept();
