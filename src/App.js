import React, { useState} from 'react';
import './App.css';
import _ from "lodash";
import moment from "moment";
require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(API_KEY)

function App() {
  
  const [state, setState] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading]  = useState(false)
  

  // useEffect(()=>{
  //   fetchData()
  // }, [])

  const fetchData =(cityName) => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if(data.cod==="404"){
        setError(data);
      }else{
        setState(data)
      }
      
      
    })
    .catch((err) => console.log(err))
  }

  const onClick = (e) => {
    e.preventDefault();
    setState("")
    setError({})
    setLoading(true)
    fetchData(city);
    setCity("")

  }

  //https://samples.openweathermap.org/data/2.5/find?q=London&appid=b6907d289e10d714a6e88b30761fae22&units=metric
  return (
    <div className="App">
      <div className="mainContent">
      {
        (error.cod === "404") ? <div className="errorMessage">{error.message}</div> : (
        _.isEmpty(state) ? ((loading) ? <div className="loading">Loading</div>: <div className="loading">Write city name</div>)
        :
        (
          <>
      <div className="description">
        <p>Welcome to <strong>{state.name}</strong> and the weather is <strong>{state.weather[0].description}</strong></p>
        <p><strong>{state.name}</strong>'s Latitude is <strong>{state.coord.lat}</strong> and Longitude is <strong>{state.coord.lon}</strong></p>
        <p><strong>{state.name}</strong>'s Temperature is <strong>{state.main.temp}</strong>&#8451;, feels like <strong>{state.main.feels_like}</strong> and humidity is <strong>{state.main.humidity}</strong>&#8451;</p>
        <p>Today's minimum temperature is <strong>{state.main.temp_min}</strong>&#8451; and maximum temperature is <strong>{state.main.temp_max}</strong>&#8451; </p>
        <p>Sunrise will be at <strong>{moment.unix(state.sys.sunrise).format('h:mm:ss A')}</strong></p>
        <p>Sunset will be at <strong>{moment.unix(state.sys.sunset).format('h:mm:ss A')}</strong></p>
      </div>
      
      </>
      )
        )
}
<div className="formInput">
        <input type="text" id="city" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter City name" />
        <button onClick={onClick}>Enter</button>
      </div>
    </div>
    </div>
  );
}

export default App;
