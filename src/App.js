import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

function App() {
  const [place, setPlace] = useState("");
  const [placeData, setPlacedata] = useState({});
  const updatePlaceData = () => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=0ca63a17b0d14bb582a61546220807&q=${place}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlacedata(data);
      });
  };
  // it should be only loaded when page is reload so adding empty array in it
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12 form">
            <input
              type="text"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            ></input>
            <button className="btn btn-primary" onClick={updatePlaceData}>
              Submit
            </button>
          </div>
          <div className="offset-md-4 col-12 col-md-4 weather">
            <div className="card">
              {placeData.location ? (
                <div>
                  <img src={placeData.current.condition.icon} alt="notfound"></img>
                  <div className="temp">{placeData.current.temp_c}°</div>
                  <div className="text">{placeData.current.condition.text}</div>
                  <div className="place">{placeData.location.name}</div>
                  <div className="container">
                    <div className="row whp">
                      <div className="col">
                        <div className="title">Wind now</div>
                        <div className="data">{placeData.current.wind_kph}<span className="unit">km</span></div>
                      </div>
                      <div className="col">
                      <div className="title">Humidity</div>
                        <div className="data">{placeData.current.humidity}<span className="unit">%</span></div>
                      </div>
                      <div className="col">
                      <div className="title">Precipitaion</div>
                        <div className="data">{placeData.current.precip_mm}<span className="unit">%</span></div>
                      </div>
                    </div>
                  </div>

                  {/* <h1>{placeData.location.region}</h1>
                <h1>{placeData.location.country}</h1> */}
                </div>
              ) : (
                <h2>Page not found</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
