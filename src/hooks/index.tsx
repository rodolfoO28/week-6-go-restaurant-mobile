import React from 'react';

import { SharedProvider } from './shared';

const AppProvider: React.FC = ({ children }) => (
  <SharedProvider>{children}</SharedProvider>
);

export default AppProvider;
