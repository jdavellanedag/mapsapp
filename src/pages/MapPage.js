import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

//TODO: Change api KEY
mapboxgl.accessToken =
  "pk.eyJ1IjoiamRhdmVsbGFuZWRhZyIsImEiOiJja3Z1MjBiamMxaDJlMm9xcGZmMzI2dW8zIn0.LY2YR5jfbsRx4DwwApEVIg";

const defaultPoint = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapPage = () => {
  const mapDiv = useRef();
  const [setMap] = useState(null);

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [defaultPoint.lng, defaultPoint.lat],
      zoom: defaultPoint.zoom,
    });

    setMap(map);
  }, []);

  return (
    <>
      <div ref={mapDiv} className="mapContainer"></div>
    </>
  );
};
