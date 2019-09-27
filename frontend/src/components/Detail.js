import React from 'react'
import {Grid,Paper,Card,CardActions,CardContent,Typography,Button} from '@material-ui/core'
import {Link} from "react-router-dom"
export default class Detail extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let data=this.props.data
        console.log(data.price)
        return(
            <Grid container>
                <Grid item lg={7}>
                <h2>Itinerary</h2>
                    <Paper>
                        <Card>
                            <CardContent>
                                <div style={{display:"flex",marginBottom:"80px"}}>
                                    <Typography style={{padding:"30px",fontSize:"20px"}} color="textSecondary" gutterBottom>
                                        <h5>Name</h5>
                                        {data.flightName}
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"30px",fontSize:"30px"}} variant="h5" component="h2">
                                    <h5>Departure</h5>
                                        {data.fromTime}
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"30px"}} color="textSecondary">
                                    <h5>Duration</h5>
                                        {data.duration}
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"30px",fontSize:"30px"}} variant="h5" component="h2">
                                    <h5>Arrival</h5>
                                        {data.toTime}
                                    </Typography><br/><br/>
                                </div>
                                <hr></hr>
                                <div style={{display:"flex"}}>
                                    <Typography style={{padding:"10px"}} color="textSecondary" gutterBottom>
                                        Baggage : CHECK IN
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"10px"}} color="textSecondary" gutterBottom>
                                        Adult : 25kgs
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"10px"}} color="textSecondary" gutterBottom>
                                        Cabin : 8kgs
                                    </Typography><br/><br/>
                                </div>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item lg={1}>&nbsp;</Grid>
                <Grid item lg={4}>
                    <h2>Fare Summary</h2>
                    <Paper>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Inclusive of tax
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Flight Fare&nbsp;&nbsp;&nbsp;&nbsp;{data.price}<br/><br/>
                                    Service&nbsp;&nbsp;&nbsp;&nbsp;{Number(data.TaxAmount)-20}<br/><br/>
                                    Total&nbsp;=&nbsp;{(8000)+(Number(data.TaxAmount))+(Number(data.TaxAmount)-20)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                               <Link to="/seating">
                                <Button variant="contained" color="primary" size="small">
                                    BOOK Now
                                </Button>
                               </Link> 
                            </CardActions>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}