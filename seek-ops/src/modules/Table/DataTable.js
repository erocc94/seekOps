import './DataTable.css';
import React, {useEffect, useRef, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Row from './SharedRow/Row'
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
        if (!isAlive()) return;
        let low = 0;
        let med = 0;
        let high = 0;
        let critical = 0;

        for(let i=0;i < rawData.length; i++){
            //console.log("raw_findings[i]",raw_findings[i])
            let groupedId = rawData[i].grouped_finding_id;
            //console.log("i: ",i)
            //console.log("hello",groupedId)
            let tmp = groupedData[groupedId - 1];
            //console.log("tmp",tmp)

            if(tmp.raw_findings){
                tmp.raw_findings.push(rawData[i])
            }else{
                tmp.raw_findings = [rawData[i]];
            }
           // console.log("tmp after",tmp)

            // console.log("tmp object:",tmp)
            tmpRows.push(tmp);
           /// console.log("tmpRows tmpRows",tmpRows)

        }
        setRows(tmpRows);

        for(let i=0;i < groupedData.length; i++){
            let severity = groupedData[i].severity;
            console.log("sevvvvv",severity)
            if(severity==='low')low++;
            if(severity==='medium')med++;
            if(severity==='high')high++;
            if(severity==='critical')critical++;
        }
       // pieChartSeriesData.push(low,med,high,critical)
        setPieChartSeriesData([low,med,high,critical]);

    },[])
    console.log("final pieChartSeriesData",pieChartSeriesData)

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
                    {rows.map((row,key) => (
                        <Row key={row.id.toString() + ' '+ key.toString()} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default DataTable
