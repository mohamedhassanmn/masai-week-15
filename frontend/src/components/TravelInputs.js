import React from 'react'
import {Grid, Paper,TextField,Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
export default class TravelInputs extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Grid>
                <Paper>
                    <TextField onChange={this.props.recordFrom} label="From"/>&nbsp;
                    <TextField onChange={this.props.recordTo} label="To"/>&nbsp;<br/><br/>
                    <TextField onChange={this.props.recordDate} type="date"/>&nbsp;
                    <Link to="/flights"><Button onClick={this.props.sendRequest} variant="contained" color="secondary">Check</Button></Link>
                </Paper>
            </Grid>
        )
    }
}