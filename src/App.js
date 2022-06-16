
import { FormControl, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';

function App() {

  const [countries, setCountires] = useState([])
 
   const [country,setCounrty]=useState('worldwide')

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // United State, United Kingdom
              value:country.countryInfo.iso3  // UK ,USA , IND
            }
          ))
          setCountires(countries)
        })
    }
    getCountriesData()

  }, [])

 
  const onCountryChange= async(event)=>{
     const countryCode=event.target.value;
     setCounrty(countryCode)
     
  }


  return (
    <div className="App">


     {/* Header  */}
      {/* Title + select input dropdown filed */}

      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>

        <FormControl className='app_dropdown'>

          <Select
            variant='outlined'
             value={country}
             onChange={ onCountryChange}
          >
           <MenuItem value='worldwide'>Worldwide</MenuItem>
            {
              countries.map( (country,index) => (
                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
     
       
       <div className="app_stats">

               <InfoBox title="Coronavirus Cases" cases={1256} total={2000} />
               <InfoBox title="Recovered" cases={2256}  total={3000} />
               <InfoBox title="Deaths" cases={156}  total={4000}/>
       </div>


     


      {/* Table */}
      {/* Graph */}


      {/* Map */}


    </div>
  );
}

export default App;
