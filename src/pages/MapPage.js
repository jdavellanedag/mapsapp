import React from "react";

import { useMapBox } from "../hooks/useMapBox";

const defaultPoint = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapPage = () => {
  const { setRef, coords } = useMapBox(defaultPoint);
  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
