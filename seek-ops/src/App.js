import './App.css';
import React from "react";
import grouped_findings from './data/grouped_findings.json'
import raw_findings from './data/raw_findings.json'
import DataTable from "./modules/Table/DataTable";

const App = () => {

  return (
    <div className="App">
        <DataTable rawData={raw_findings} groupedData={grouped_findings}/>
    </div>
  );
};

export default App;
