import React from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function createData(step, location, action, dirtCollected, wallsHit) {
    return { step, location, action, dirtCollected, wallsHit };
}


const RoombaTable = ({ data }) => {
    var rows = [];
    
    const classes = useStyles();
    var actionList = data.drivingInstructions;
    if (data.drivingInstructions !== undefined) {
        for (var index = 0; index < actionList.length; index++) {
            rows.push(createData(index, 0, actionList[index], 0, 0));
        }
        console.log(rows);
    }

    return (
    <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Step</TableCell>
                    <TableCell align="center">Roomba Location</TableCell>
                    <TableCell align="center">Action</TableCell>
                    <TableCell align="center">Total Dirt Collected</TableCell>
                    <TableCell align="center">Total Walls Hit</TableCell>
                </TableRow>
            </TableHead>

            <TableBody> 
                {rows.map((row) => (
                <TableRow key={row.step}>
                    <TableCell align="center" component="th" scope="row">{row.step}</TableCell>
                    <TableCell align="center">{row.location}</TableCell>
                    <TableCell align="center">{row.action}</TableCell>
                    <TableCell align="center">{row.dirtCollected}</TableCell>
                    <TableCell align="center">{row.wallsHit}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    );
}

export default RoombaTable;