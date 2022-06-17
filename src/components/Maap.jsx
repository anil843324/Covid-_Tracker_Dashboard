import React from "react";
import { MapContainer , TileLayer } from "react-leaflet";
import "../components/Maap.css"
// import { showDataOnMap } from "../util";

 const Maap =({center, zoom})=> {

        console.log('hii',center,zoom)
        console.log(center[0],center[1])
  return (
    <div className="map">
       
      <MapContainer  center={{ lat: center[0], lng: center[1] }}  zoom={zoom} >
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {showDataOnMap(countries, casesType)} */}
      </MapContainer>
    </div>
  );
}

export default Maap;