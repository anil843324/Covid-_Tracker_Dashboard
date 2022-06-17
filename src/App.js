
import { FormControl, Select, MenuItem ,Card ,CardContent} from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import LineGraph from './components/LineGraph';

import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData } from './Util';

function App() {

  const [countries, setCountires] = useState([])

  const [country, setCounrty] = useState('worldwide')

   const [countryInfo,setCountryInfo]=useState({})

   const [tableData,setTableData]=useState([])

    // for worldwide data collect first time whole app render
   useEffect(() => {
       fetch("https://disease.sh/v3/covid-19/all")
       .then((response)=>response.json())
       .then(data => setCountryInfo(data) )
    
   }, [])
   

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // United State, United Kingdom
              value: country.countryInfo.iso3  // UK ,USA , IND
            }
          ))

             const sorttedData=sortData(data)

           setTableData(sorttedData)

          setCountires(countries)
        })
    }
    getCountriesData()

  }, [])


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
   
    console.log(country)
     
     const  url=countryCode==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

     await  fetch(url)
     .then((response)=> response.json())
     .then(data=>{
         
         setCounrty(countryCode)
//  All of the data.....
// from the country response 
         setCountryInfo(data)
     })


  }
   


  return (
    <div className="app">

      <div className="app_left">

        {/* Header  */}
        {/* Title + select input dropdown filed */}

        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>

          <FormControl className='app_dropdown'>

            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map((country, index) => (
                  <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>


        <div className="app_stats">

          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />

      </div>


      <Card className="app_right">

       
          <CardContent>
               <h3>Live Cases by Country</h3>
               {/* Table */}
               <Table countries={tableData} />
              <h3>Worldwide new cases</h3>
             {/* Graph */}
             <LineGraph/>
          

          </CardContent>


       

      </Card>


    </div>
  );
}

export default App;
