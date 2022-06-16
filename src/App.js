
import { FormControl, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [countries, setCountires] = useState([])


  useEffect(() => {

    const getCountriesData = async () => {

      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {

          const countries = data.map((country) => (
            {
              name: country.country, // United State, United Kingdom
              value: country.iso3  // UK ,USA , IND

            }

          ))
          setCountires(countries)

        })
    }
    getCountriesData()

  }, [])





  return (
    <div className="App">

      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>

        <FormControl className='app_dropdown'>

          <Select
            variant='outlined'
             value={"abc"}
             
          >
            {
              countries.map( (country,index) => (
                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      {/* Header  */}
      {/* Title + select input dropdown filed */}


      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}


      {/* Table */}
      {/* Graph */}


      {/* Map */}


    </div>
  );
}

export default App;
