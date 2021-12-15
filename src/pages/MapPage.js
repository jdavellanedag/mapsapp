import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

import { useMapBox } from "../hooks/useMapBox";

const defaultPoint = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapPage = () => {
  const { setRef, coords, newMarker$, markerMovement$ } = useMapBox(defaultPoint);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("add-marker", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {});
  }, [markerMovement$]);

  useEffect(() => {
    socket.on("new-marker", (marker) => {
      console.log(marker);
    });
  }, [socket]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
