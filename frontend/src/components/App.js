import React from 'react'
import {Grid} from '@material-ui/core'
import {Route} from 'react-router-dom'
import TravelInputs from "./TravelInputs"
import Show from './Show.js'
import Detail from './Detail.js'
import Seating from './Seating.js'
import Navbar from './Navbar.js'
import Showbooking from "./Showbooking.js"
import axios from 'axios'
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            from:"",
            to:"",
            date:"",
            flightData:"",
            passDetail:""
        }
    }
    handleChangeFrom=(e)=>{
        this.setState({
            from:e.target.value
        })
    }
    handleChangeTo=(e)=>{
        this.setState({
            to:e.target.value
        })
    }
    handleChangeDate=(e)=>{
        this.setState({
            date:e.target.value
        })
    }
    handleClick=(e)=>{
        let check={
            from:this.state.from,
            to:this.state.to,
            time:this.state.date
        }
        axios({method:"post",url:"http://127.0.0.1:5000/flights",data:check})
        .then((res)=>{
            console.log(res.data.flights)
            this.setState({
                flightData:res.data.flights
            })
        })
        .catch(err=>alert(err))
    }
    handleClickBook=(e)=>{
        let input=e.target.textContent
        let i=input.split(" ")
        let index=i[1]
        console.log(index)
        this.setState({
            passDetail:this.state.flightData[Number(index)]
        })
    }
    render(){
        return(
            <React.Fragment>
                <Route path="/" render={()=>{
                    return(
                        <React.Fragment>
                            <Navbar/>
                            <TravelInputs
                            recordFrom={this.handleChangeFrom}
                            recordTo={this.handleChangeTo}
                            recordDate={this.handleChangeDate}
                            sendRequest={this.handleClick}
                            />
                        </React.Fragment>            
                    )
                }}/>
                <Route path="/yourbookings" render={()=>{
                    return(
                        <Showbooking/>
                    )
                }}/>
                {this.state.flightData!=""?<Route path="/flights" render={()=>{
                    return(
                        <Show flightsData={this.state.flightData} Recordbook={this.handleClickBook}/>
                    )
                }}/>:null}
                {this.state.passDetail!==""?<Route path="/details" render={()=>{
                    return(
                        <Detail data={this.state.passDetail}/>
                    )
                }}/>:null}
                <Route path="/seating" render={()=>{
                    return(
                        <Seating data={this.state.passDetail}/>
                    )
                }}/>
            </React.Fragment>
        )
    }
}