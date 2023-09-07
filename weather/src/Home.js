import React, { useState,useEffect } from "react";
import './App.css' 
import axios from "axios";
const Home=()=>{

const[data,setData]=useState({
    celcius:26, name:"delhi",humidity:20,speed:2,image:"../cloud 300.png "
})
const[name,setName]=useState('');
const[error,setError]=useState('');

  const handleClick=()=>{
    if(name!=='')
    {
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3589ccdd4ef94eec01ba08bbde0d7580&&units=metric`;
        axios.get(apiUrl)
        .then(res=> {
            let imagepath=''
            if(res.data.weather[0].main=="Clouds"){
                imagepath="../cloud 300.png"
            }
            else if(res.data.weather[0].main=="Rain" ){
                imagepath="../rain300.png"
            }
            else if(res.data.weather[0].main=="Sunny"){
                imagepath="../sun.png"
            }
            else if(res.data.weather[0].main=="Drizzle"){
                imagepath="../drizzle1.png"
            }
            else if(res.data.weather[0].main=="Mist"){
                imagepath="../mist1.png"

            }
            else{
                imagepath="../cloud 300.png"
            }
            
            console.log(res.data)


           setData({...data,celcius:res.data.main.temp,name:res.data.name,
           humidity:res.data.main.humidity,speed:res.data.wind.speed,image:imagepath})
          // setError('');
        })
        .catch(err=>{
            if(err.response.status==404){
                setError("Invalid City Name....")
            }
            else{
                setError('');
            }
            console.log(err)});
    }
  }


return(
    <div className="conatiner">
        <div className="weather">
            <div className="search">
                <input type="text" placeholder="Enter City Name" onChange={e=>setName(e.target.value)}/>
                <button><img src="../download (1).png" onClick={handleClick} alt=""/></button>
            <div className="error">
<p>{error}</p>
            </div>
                <div className="winfo">
                    <img src={data.image}alt="" className="icon"/>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src="../hum.png"alt=""/>
                    <div className="humidity">
                        <p>{Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                    </div>
                    <div className="col">
                        <img src="../wind (1).png"alt=""/>
                    <div className="wind">
                        <p>{Math.round(data.speed)}km/h</p>
                        <p>Wind</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    
)
}
export default Home;