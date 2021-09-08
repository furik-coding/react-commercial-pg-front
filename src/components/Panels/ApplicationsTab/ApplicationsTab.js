import React, { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import ApplicationSearch from './ApplicationSearch';
import ApplicationsPanel from './ApplicationsPanel';

import Table from '../../Tablea/Tablea';
export const applicationsContext = createContext();
const ApplicationsTab = () => {
  const [filter, setFilter] = useState({});
  return (
    <applicationsContext.Provider value={[filter,setFilter]}>
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>

        <ApplicationSearch />

      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <ApplicationsPanel></ApplicationsPanel>
        </div>
      </div>
    </div>
    </applicationsContext.Provider>
  );
};

export default ApplicationsTab;
