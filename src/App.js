
import { FormControl, Select, MenuItem, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import LineGraph from './components/LineGraph';

import InfoBox from './InfoBox';
import Maap from './components/Maap';
import Table from './Table';
import { prettyPrintStat, sortData } from './Util';
import "leaflet/dist/leaflet.css"


function App() {

  const [countries, setCountires] = useState([])

  const [country, setCounrty] = useState('worldwide')

  const [countryInfo, setCountryInfo] = useState({})

  const [tableData, setTableData] = useState([])

  const [mapCountries, setMapCountries] = useState([])

  


  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796])
  const [mapZoom, setMapZoom] = useState(3)

  const [casesType, setCasesType] = useState("cases")

  // for worldwide data collect first time whole app render
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then(data => setCountryInfo(data))

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

          const sorttedData = sortData(data)
          setMapCountries(data)
          setTableData(sorttedData)

          setCountires(countries)
        })
    }
    getCountriesData()

  }, [mapCenter])


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // console.log(country)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then(data => {

        setCounrty(countryCode)
        //  All of the data.....
        // from the country response 
        setCountryInfo(data)


        setMapCenter([data.countryInfo.lat, data.countryInfo.long])

        setMapZoom(4)

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

          <InfoBox
           isRed
          active={casesType==='cases'}
            onClick={  (e) => setCasesType('cases') }
           title="Coronavirus Cases" 
           cases={prettyPrintStat(countryInfo.todayCases)} 
           total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox 
           
            active={casesType==='recovered'}
           onClick={ (e)=> setCasesType('recovered') }
          title="Recovered" 
          cases={prettyPrintStat(countryInfo.todayRecovered)} 
          total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox
           isRed
           active={casesType==='deaths'}
           onClick={ (e)=> setCasesType('deaths') }
           title="Deaths" 
           cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        {/* Map */}
        <Maap
           casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>


      <Card className="app_right">


        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3 className='app_graphTitle'>Worldwide new  {casesType}</h3>
          {/* Graph */}
          <LineGraph className='app_graph' casesType={casesType} />


        </CardContent>




      </Card>


    </div>
  );
}

export default App;
