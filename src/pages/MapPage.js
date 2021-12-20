import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

import { useMapBox } from "../hooks/useMapBox";

const defaultPoint = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapPage = () => {
  const { setRef, coords, newMarker$, markerMovement$, addMarker, updateMarkerLocation } =
    useMapBox(defaultPoint);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("active-markers", (markers) => {
      for (const key of Object.keys(markers)) {
        addMarker(markers[key], key);
      }
    });
  }, [socket, addMarker]);

  useEffect(() => {
    newMarker$.subscribe((marker) => {
      socket.emit("add-marker", marker);
    });
  }, [newMarker$, socket]);

  useEffect(() => {
    markerMovement$.subscribe((marker) => {
      socket.emit("updated-marker", marker);
    });
  }, [socket, markerMovement$]);

  useEffect(() => {
    socket.on("updated-marker", (marker) => {
      updateMarkerLocation(marker);
    });
  }, [socket, updateMarkerLocation]);

  useEffect(() => {
    socket.on("new-marker", (marker) => {
      addMarker(marker, marker.id);
    });
  }, [socket, addMarker]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
