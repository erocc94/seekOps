import './DataTable.css';
import React, {useEffect, useRef, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './Row/Row'
import SharedModal from "../../shared/SharedModal/SharedModal";
import PieChartIcon from '@mui/icons-material/PieChart';

const DataTable = (props) => {
    const { rawData, groupedData } = props;
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [pieChartSeriesData, setPieChartSeriesData] = useState([]);
    let tmpRows = [];

    const isComponentAlive = useRef(true);
    const isAlive = () => isComponentAlive.current;

    // when component unmounts, set ref to false -
    // use ref to avoid memory leaks around async code.
    useEffect(() => () => (isComponentAlive.current = false), []);

    useEffect(()=>{
        //avoiding memory leaks
        if (!isAlive()) return;
        let low = 0;
        let med = 0;
        let high = 0;
        let critical = 0;

        //iterate through raw findings and find relevant id in grouped findings to create new nested objects
        for(let i=0;i < rawData.length; i++){
            let groupedId = rawData[i].grouped_finding_id;
            let tmp = groupedData[groupedId - 1];

            if(tmp.raw_findings){
                tmp.raw_findings.push(rawData[i])
            }else{
                tmp.raw_findings = [rawData[i]];
            }

            tmpRows.push(tmp);
        }
        setRows(tmpRows);
        //iterate thought grouped findings to count severity occurrences for pie chart
        for(let i=0;i < groupedData.length; i++){
            let severity = groupedData[i].severity;
            if(severity==='low')low++;
            if(severity==='medium')med++;
            if(severity==='high')high++;
            if(severity==='critical')critical++;
        }
        setPieChartSeriesData([low,med,high,critical]);

    },[])

    return (
        <TableContainer component={Paper}>
            <div style={{textAlign: 'left'}}>
                <label className={'header-text'}>Group Findings</label>
                <PieChartIcon className={'pie-chart'} onClick={()=> setOpenModal(true)}/>
            </div>
            {openModal && <SharedModal series={pieChartSeriesData} open={openModal} handleClose={()=>setOpenModal(false)}/>}
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{fontWeight:'bold'}} align="left">severity</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">time</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">SLA</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">description</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">security analyst</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">owner</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">workflow</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left">status</TableCell>
                        <TableCell sx={{fontWeight:'bold'}} align="left"># of findings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,key) => (
                        <Row key={row.id.toString() + ' '+ key.toString()} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DataTable
