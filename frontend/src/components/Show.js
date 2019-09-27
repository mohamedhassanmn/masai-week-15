import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"

export default class Show extends React.Component{
    constructor(props){
        super(props)
    }   
    render(){
        let rows=this.props.flightsData
        let i=0
        return (
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Flight Name</TableCell>
                    <TableCell align="right">From</TableCell>
                    <TableCell align="right">To</TableCell>
                    <TableCell align="right">Departure Time</TableCell>
                    <TableCell align="right">Arrival Time</TableCell>
                    <TableCell align="right">Total Time</TableCell>
                    <TableCell align="right">Price in Rs</TableCell>
                    <TableCell align="right">Book</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.flightName}>
                      <TableCell component="th" scope="row">
                        {row.flightName}
                      </TableCell>
                      <TableCell align="right">{row.fromLoc}</TableCell>
                      <TableCell align="right">{row.To}</TableCell>
                      <TableCell align="right">{row.fromTime}</TableCell>
                      <TableCell align="right">{row.toTime}</TableCell>
                      <TableCell align="right">{row.duration}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">
                         <Link to="/details">
                            <Button onClick={this.props.Recordbook} variant="contained" color="primary">
                                BOOK <span style={{display:"none"}}>{i++}</span>
                            </Button>                         
                         </Link>                           
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          );
    }
}