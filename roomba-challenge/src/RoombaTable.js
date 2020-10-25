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
var totalDirtCollected = 0;

/**
 * Helper method that figures out the next location the location will move to
 * based on its current location and next action to take, while keeping the 
 * room dimensions in mind. If a wall is hit, wallsHit is incremented. 
 * totalDistance is incremented for every succesful step
 *
 * @param currentLocation, currentAction, roomDimensions
 * @public
 */
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

/**
 * Helper method to check if the current roomba location has dirt on it
 *
 * @param location, dirtLocations
 * @public
 */
function checkDirt(location, dirtLocations) {
    console.log(location);
    for (var i = 0; i < dirtLocations.length; i++) {
        if (dirtLocations[i][0] === location[0] && dirtLocations[i][1] === location[1]) {
            //dirtLocations[i] = [-1,-1];
            return true;
        } 
    }
    return false;
}

/**
 * Helper method that creates a row for the table based on the step number,
 * current location, current action, amount of dirt collected, and amount 
 * of walls hit
 *
 * @param step, location, action, dirtCollected, wallsHit
 * @public
 */
function createData(step, location, action, dirtCollected, wallsHit) {
    return { step, location, action, dirtCollected, wallsHit };
}

const RoombaTable = ({ data }) => {
    const classes = useStyles();
    
    var rows = [];
    totalDistance = 0;
    wallsHit = 0;
    totalDirtCollected = 0;
    var actionList = data.drivingInstructions;
    var currentLocation = data.initialRoombaLocation;
    var roomDimensions = data.roomDimensions;
    var dirtLocations = data.dirtLocations;

    //Check if there is a valid list of instructions
    if (data.drivingInstructions !== undefined) {
        //push the initial row
        rows.push(createData(1, currentLocation[0] + ", " + currentLocation[1], "", 0, wallsHit));
        
        for (var index = 1; index < actionList.length+1; index++) {
            var currentAction = actionList[index-1];
            currentLocation = updateLocation(currentLocation, currentAction, roomDimensions);
            if(checkDirt(currentLocation, dirtLocations) === true) {
                totalDirtCollected++;
            }
            rows.push(createData(index+1, currentLocation[0] + ", " + currentLocation[1], currentAction, totalDirtCollected, wallsHit));
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
        <div className="result-container">
            <h1>Final Position: {finalPosition}</h1>
            <h1>Total Distance Travelled: {totalDistance}</h1>
            <h1>Total Dirt Collected: {totalDirtCollected}</h1>
            <h1>Total Walls Hit: {wallsHit}</h1>
        </div>
    </TableContainer>
    );
}

export default RoombaTable;