import React from 'react'
import styles from './seating.module.css'
import {Grid,Paper,Card,TextField,CardContent,Typography,Button} from '@material-ui/core'
import axios from 'axios'


export default class Seating extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty},{style:styles.empty}],
            check:false,
            username:"",
            booked:false
        }

    }
    handleChange=(e)=>{
        this.setState({
            username:e.target.value
        })
    }
    handleClick=()=>{
        this.state.data.pop()
        this.setState({
            data:[{style:styles.occupied},...this.state.data],
            check:true
        })
    }
    handleSend=()=>{
        this.setState({
            booked:true
        })
        let send={
            userName:this.state.username,
            flightName:this.props.data.flightName,
            flightTime:this.props.data.fromTime,
            price:this.props.data.price,
            status:"successful"
        }
        axios({method:"post",url:"http://127.0.0.1:5000/create",data:send})
        .then(res=>console.log(res))
        .catch(err=>alert(err))
    }
    render(){
        let data=this.props.data
        let new_data=this.state.data
        let j=1
        return(
            <Grid container justify="center">
                <Grid justify="center">
                    {this.state.booked?<Typography variant="h4" color="secondary">Booked successfully!</Typography>:null}
                <Paper>
                    <Grid justify="center" style={{marginTop:"50px",marginLeft:"30px"}} lg={7}>
                            {new_data.map((ele)=>{
                                return(
                                    <Grid className={ele.style}>L{j++}</Grid>
                                )
                            })}
                    </Grid>
                </Paper>
                {this.state.check?
                <div>
                    <Paper>
                        <TextField onChange={this.handleChange} label="user name"/>
                        <Card>
                            <CardContent>
                                <div style={{display:"flex",marginBottom:"30px"}}>
                                    <Typography style={{padding:"20px",fontSize:"15px"}} color="textSecondary" gutterBottom>
                                        <h5>Name</h5>
                                        {data.flightName}
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"30px",fontSize:"15px"}} variant="h5" component="h2">
                                    <h5>Departure</h5>
                                        {data.fromTime}
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"15px"}} color="textSecondary">
                                    <h5>Duration</h5>
                                        {data.duration}
                                    </Typography><br/><br/>
                                    <Typography style={{padding:"30px",fontSize:"15px"}} variant="h5" component="h2">
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
                    <Button onClick={this.handleSend} variant="contained" color="primary">
                         book now
                    </Button>
                </div>                
                :<Button onClick={this.handleClick} variant="contained" color="primary">
                    CONFIRM YOUR Seating
                </Button>

                }
                

                </Grid>
            </Grid>
        )
    }
}