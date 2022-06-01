import logo from './logo.svg';
import './App.css';
import React from "react";
import grouped_findings from './data/grouped_findings.json'
import raw_findings from './data/raw_findings.json'
import DataTable from "./modules/Table/DataTable";

function App() {
    const groupedData = grouped_findings;
    const rawData = raw_findings;
    //console.log("grouped findings", typeof groupedData)
   // console.log("raw findings",rawData)


  return (
    <div className="App">
        <DataTable/>
    </div>
  );
}

export default App;
