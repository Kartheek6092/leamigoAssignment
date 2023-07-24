import React, {Component} from "react";
import dummyData from '../dummydata/dummydata.json'
// import axios from "axios";
import {format } from 'date-fns'

import './index.css'

class SearchPage extends Component{

    state = {pointA: '', pointB: '', date: '', dummyData: dummyData, availableTransport: ''}

    setPointA = (event) =>{
        this.setState({pointA: event.target.value})
    }

    setPointB= (event) =>{
        this.setState({pointB: event.target.value})
    }

    setDate = (event) =>{
        this.setState({date: event.target.value})
    }

    searchVehicles = event => {
        event.preventDefault()
        const {dummyData, pointA, pointB, date} = this.state
        const filteredData = dummyData.filter(item=>(
            item.onboarding === pointA && item.destination === pointB && item.date === format(new Date(date), 'yyyy-MM-dd')
        ))
        console.log(dummyData)
        console.log(filteredData)
        this.setState({availableTransport: filteredData})

    }

    render(){
        const {pointA, pointB, date, availableTransport} = this.state
        // console.log(availableTransport)

        return(
            <div className="container">
            <h1>Airport Transfer Booking</h1>
            <form onSubmit={this.searchVehicles}>
                <label>Point A</label>
                <input type="text" value={pointA} onChange={this.setPointA} />
                <label>Point B</label>
                <input type="text" value={pointB} onChange={this.setPointB} />
                <label>Date</label>
                <input type="date" value={date} onChange={this.setDate} />
                <button type='submit'>Search</button>
            </form>
            <h2>Available Vehicles</h2>
            <ul>    
                {availableTransport.length > 0 ? availableTransport.map(item=>(
                    <li className="vehicle-item">
                        {item.vehicle_type}
                    </li>
                )) : null}
            </ul>
            </div>
        );  
    };
};

export default SearchPage;