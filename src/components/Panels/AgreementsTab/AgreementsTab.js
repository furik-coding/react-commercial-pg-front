import React, { useState, createContext } from 'react';

import AgreementsSearch from './AgreementsSearch';
import AgreementsPanel from './AgreementsPanel';
export const agreementsContext  = createContext();
const AgreementsTab = () => {
  const [filter, setFilter] = useState({});

  return (
    <agreementsContext.Provider value={[filter,setFilter]}>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <AgreementsSearch />
      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
        <AgreementsPanel />
        </div>
      </div>
    </div>
    </agreementsContext.Provider>
  );
};

export default AgreementsTab;
