import React from 'react';
import "normalize.css"
import "./styles.css"

import { List } from "../List/List";

export const App: React.FC = () => {
  return (
    <div className="App">
      <List />
    </div>
  );
}

