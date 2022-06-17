import React, { useEffect, useState } from "react";
import { MapContainer , TileLayer ,useMap} from "react-leaflet";
import "../components/Maap.css"
import { showDataOnMap } from "../Util";


 const Maap =({ countries,casesType,center, zoom})=> {

        

     const [lat,setLat]=useState(center[0])
     const [long,setLong]=useState(center[1])

     useEffect(() => {

      setLat(center[0])
      setLong(center[1])
     
      
     }, [center ])

       function MyComponent(){

           const map=useMap();
           map.setView(center,zoom);
           return null;
       }
        

         
  return (
    <div className="map">
      
       <MapContainer
       center={{ lat: center[0], lng:center[1] }}
        zoom={zoom}
    >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
            
             
           
            {/* loop through countries and darw circles on the screen  */}
            
          <MyComponent/>
          {showDataOnMap(countries,casesType)}
         
   
  </MapContainer>,
    </div>
  );
}

export default Maap;