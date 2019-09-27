import React from'react'
import {Grid,Paper,Card,TextField,CardContent,Typography,Button} from '@material-ui/core'
import axios from 'axios'
export default class Showbooking extends React.Component{
    constructor(props){
        super(props)
        this.state={
            Showdata:"",
            check:false,
            edit:false,
            name:"",
            Departure:"",
            price:""
        }
    }
    componentDidMount(){
        axios({method:"get",url:"http://127.0.0.1:5000/show"})
        .then(res=>{
            console.log(res)
            console.log("Hello")
            this.setState({
                Showdata:res.data,
                check:true
            })
        })
        .catch(err=>alert(err))
    }
    handleClick=(e)=>{
        let input=e.target.textContent.split(" ")
        let index=Number(input[1])
        let id=this.state.Showdata[index]._id.$oid
        axios({method:"get",url:`http://127.0.0.1:5000/delete/${id}`})
        .then(res=>console.log(res))
        .catch(err=>alert(err))
    }
    handleEdit=()=>{
        this.setState({
            edit:true
        })
    }
    handleEditCancel=()=>{
        this.setState({
            edit:false
        })
    }
    handleChangeDeparture=(e)=>{
        this.setState({
            Departure:e.target.value
        })
    }
    handleChangeFare=(e)=>{
        this.setState({
            price:e.target.value
        })
    }
    handleChangeName=(e)=>{
        this.setState({
           name:e.target.value
        })
    }
    ClickSave=(e)=>{
        let input=e.target.textContent.split(" ")
        let index=Number(input[1])
        let id=this.state.Showdata[index]._id.$oid
        let obj={
            userName:this.state.name,
            flightName:this.state.Showdata[index].flightName,
            flightTime:this.state.Departure,
            price:this.state.price,
            status:"Edited"
        }
        console.log(this.state.Showdata)
        axios({method:"post",url:`http://127.0.0.1:5000/edit/${id}`,data:obj})
        .then(res=>console.log(res))
        .catch(err=>alert(err))
    }
    render(){
        let datas=this.state.Showdata
        console.log(this.state.Showdata)
        return( 
            <React.Fragment>       
            {this.state.check?(datas.map((data,i)=>{
                return(
                        <Paper>
                            <Typography variant="h4">{data.userName}</Typography>
                            <Card>
                                <CardContent>
                                    {this.state.edit?(
                                        <div style={{marginBottom:"30px"}}>
                                            <TextField onChange={this.handleChangeName} label="userName"/><br/><br/>
                                            <TextField onChange={this.handleChangeDeparture} label="Departure"/><br/><br/>
                                            <TextField onChange={this.handleChangeFare} label="Fare Amount"/><br/><br/>
                                            <Button onClick={this.ClickSave} color="primary">Save <span style={{display:"none"}}>{i}</span></Button>
                                            <Button onClick={this.handleEditCancel} color="secondary">cancel</Button>
                                         </div>
                                    ):(
                                        <div style={{display:"flex",marginBottom:"30px"}}>
                                            <Typography style={{padding:"15px"}} variant="h5">
                                                <h5>Name</h5>
                                                {data.flightName} 
                                            </Typography><br/><br/>
                                            <Typography style={{padding:"30px"}} variant="h5">
                                                <h5>Departure</h5>
                                                {data.flightTime}    
                                            </Typography><br/><br/>
                                            <Typography style={{padding:"15px"}} variant="h5">
                                                <h5>Fare Amount</h5>
                                                {data.flightPrice}
                                            </Typography><br/><br/>
                                         </div>
                                    )}                        
                                    <Button onClick={this.handleEdit} variant="contained" color="primary">Edit</Button>                                    
                                    <Button onClick={this.handleClick} variant="contained" color="secondary">
                                        Delete <span style={{display:"none"}}>{i}</span>
                                    </Button>
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
                    )
                })):null}
                </React.Fragment>
                 )}}