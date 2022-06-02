import './Row.css';
import React from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    //return css classname to set correct color for each type of data value
    const setSeverityColor = (sev)=>{
        if(sev === 'low')return 'low-color';
        if(sev === 'medium')return 'med-color';
        if(sev === 'high')return 'high-color';
        if(sev === 'critical')return 'critical-color';
    };
    const setStatusColor = (sev)=>{
        if(sev === 'open')return 'open-color';
        if(sev === 'fixed')return 'fixed-color';
        if(sev === 'in_progress')return 'inProgress-color';
    };

    return (
        <React.Fragment>
            <TableRow sx={{ minWidth: 55555 }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.severity}
                </TableCell>
                <TableCell align="left">{row.grouped_finding_created}</TableCell>
                <TableCell align="left">{row.sla}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.security_analyst}</TableCell>
                <TableCell align="left">{row.owner}</TableCell>
                <TableCell align="left">{row.workflow}</TableCell>
                <TableCell align="left">{row.status + ' ' + row.progress}</TableCell>
                <TableCell align="left">{row.raw_findings.length}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse className={'table-width'} in={open}>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Raw Findings
                            </Typography>
                            <Table aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight:'bold'}} align="left">severity</TableCell>
                                        <TableCell sx={{fontWeight:'bold'}} align="left">time</TableCell>
                                        <TableCell sx={{fontWeight:'bold'}} align="left">source</TableCell>
                                        <TableCell sx={{fontWeight:'bold'}} align="left">description</TableCell>
                                        <TableCell sx={{fontWeight:'bold'}} align="left">asset</TableCell>
                                        <TableCell sx={{fontWeight:'bold'}} align="left">status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row && row.raw_findings.map((rawRow, key) => (
                                        <TableRow key={rawRow.id.toString() + key.toString()}>
                                            <TableCell component="th" scope="row">
                                                <label className={'severity-outline ' + setSeverityColor(rawRow.severity)}>{rawRow.severity}</label>
                                            </TableCell>
                                            <TableCell>{rawRow.finding_created}</TableCell>
                                            <TableCell align="left">{rawRow.source_security_tool_name}</TableCell>
                                            <TableCell align="left">{rawRow.description}</TableCell>
                                            <TableCell align="left">{rawRow.asset}</TableCell>
                                            <TableCell align="left">
                                                <label className={'severity-outline ' + setStatusColor(rawRow.status)}>
                                                    {rawRow.status}
                                                </label>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                        <div className='raw-findings-text'>table containing raw findings</div>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export default Row
