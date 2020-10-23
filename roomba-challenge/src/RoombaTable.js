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

var totalDistance = 0;
var wallsHit = 0;

//TODO
function updateLocation(currentLocation, currentAction, roomDimensions) {
    var xLimit = roomDimensions[0];
    var yLimit = roomDimensions[1];

    switch(currentAction) {
        case "N":
            if (currentLocation[1]+1 > yLimit) {
                wallsHit++;
                return [currentLocation[0],currentLocation[1]];
            }
            totalDistance++;
            return [currentLocation[0],currentLocation[1]+1];
        case "S":
            if (currentLocation[1]-1 < 0) {
                wallsHit++;
                return [currentLocation[0],currentLocation[1]];
            }
            totalDistance++;
            return [currentLocation[0],currentLocation[1]-1];
        case "E":
            if (currentLocation[0]+1 > xLimit) {
                wallsHit++;
                return [currentLocation[0],currentLocation[1]];
            }
            totalDistance++;
            return [currentLocation[0]+1,currentLocation[1]];
        case "W":
            if (currentLocation[0]-1 < 0) {
                wallsHit++;
                return [currentLocation[0],currentLocation[1]];
            }
            totalDistance++;
            return [currentLocation[0]-1,currentLocation[1]];
        default:
            console.error("invalid step detected, ignoring");
            return [currentLocation[0],currentLocation[1]];
    }
}

//TODO
// function checkDirt(location) {
//     return true;
// }

function createData(step, location, action, dirtCollected, wallsHit) {
    return { step, location, action, dirtCollected, wallsHit };
}

const RoombaTable = ({ data }) => {
    var rows = [];
    totalDistance = 0;
    wallsHit = 0;
    
    const classes = useStyles();
    var actionList = data.drivingInstructions;
    var currentLocation = data.initialRoombaLocation;
    var roomDimensions = data.roomDimensions;

    if (data.drivingInstructions !== undefined) {
        rows.push(createData(1, currentLocation[0] + ", " + currentLocation[1], "", 0, wallsHit));
        
        for (var index = 1; index < actionList.length+1; index++) {
            var currentAction = actionList[index-1];
            currentLocation = updateLocation(currentLocation, currentAction, roomDimensions);
            rows.push(createData(index+1, currentLocation[0] + ", " + currentLocation[1], currentAction, 0, wallsHit));
        }

        var finalPosition = currentLocation[0] + ", " + currentLocation[1];
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
        <h1>Final Position: {finalPosition}</h1>
        <h1>Total Distance Travelled: {totalDistance}</h1>
        <h1>Total Dirt Collected: TODO</h1>
        <h1>Total Walls Hit: {wallsHit}</h1>
    </TableContainer>
    );
}

export default RoombaTable;