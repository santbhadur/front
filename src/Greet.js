import React from 'react';
import GoogleMapReact from 'google-map-react';

export default function (props) {
  
  return (
    <>
    

     <div style={{ height: '100vh', width: '50%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAsoFzHCb3UPP5YHtrWesHb3AKWEUvZmRE" }}
        defaultCenter={{
          lat: 10.99835602,
          lng: 77.01502627
        }}
        defaultZoom={11}
      >
        
      </GoogleMapReact>
    </div>
    </>
  );
}
