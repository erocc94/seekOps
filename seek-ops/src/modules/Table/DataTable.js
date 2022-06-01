import './DataTable.css';
import React, {useEffect, useState} from "react";
import grouped_findings from '../../data/grouped_findings.json'
import raw_findings from '../../data/raw_findings.json'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './SharedRow/Row'

const DataTable = () => {

    const [rows, setRows] = useState([]);
    let tmpRows = [];


    useEffect(()=>{

        for(let i=0;i < raw_findings.length; i++){
            //console.log("raw_findings[i]",raw_findings[i])
            let groupedId = raw_findings[i].grouped_finding_id;
            console.log("i: ",i)
            console.log("hello",groupedId)
            let tmp = grouped_findings[groupedId - 1];
            //console.log("tmp",tmp)

            if(tmp.raw_findings){
                tmp.raw_findings.push(raw_findings[i])
            }else{
                tmp.raw_findings = [raw_findings[i]];
            }
            console.log("tmp after",tmp)

            // console.log("tmp object:",tmp)
            tmpRows.push(tmp);
            console.log("tmpRows tmpRows",tmpRows)

        }
         console.log("tmp length:",tmpRows.length)

        setRows(tmpRows);
         //console.log("rows object:",rows)

    },[])

    return (
        <TableContainer component={Paper}>
            <h1 style={{textAlign: 'left'}}>Group Findings</h1>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>severity</TableCell>
                        <TableCell align="left">time</TableCell>
                        <TableCell align="left">SLA</TableCell>
                        <TableCell align="left">description</TableCell>
                        <TableCell align="left">security analyst</TableCell>
                        <TableCell align="left">owner</TableCell>
                        <TableCell align="left">workflow</TableCell>
                        <TableCell align="left">status</TableCell>
                        <TableCell align="left"># of findings</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DataTable
