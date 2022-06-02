import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import Chart from 'react-apexcharts'


const SharedModal = (props) => {
    const { open , handleClose , series} = props;

    //options object to pass through to the pie chart component
    const options = {
        colors: ['#99cb15', '#a2a6ed', '#ffc300', '#ff4100'],
        chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Low '+ series[0], 'Medium '+ series[1], 'High '+ series[2], 'Critical '+ series[3]],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Group Findings By Severity
                </Typography>
                <Chart options={options} series={series} type="pie" width={380} />

            </Box>
        </Modal>
    )
};

export default SharedModal
