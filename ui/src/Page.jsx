import React from 'react';


import Contents from './Contents.jsx';
import HeaderComponent from './components/header/header.component.jsx'


export default function Page() {
  return (
    <div>
      <HeaderComponent />
      <Contents />
    </div>
  );
}