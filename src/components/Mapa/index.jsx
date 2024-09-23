import React, { useEffect } from 'react';

const Index = ({ lat, lng }) => {
  useEffect(() => {
    const initMap = () => {
      new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 8,
      });
    };
    
    if (window.google) {
      initMap();
    } else {
      window.initMap = initMap;
    }
  }, [lat, lng]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Index;
