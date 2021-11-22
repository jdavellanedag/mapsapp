import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamRhdmVsbGFuZWRhZyIsImEiOiJja3Z1MjBiamMxaDJlMm9xcGZmMzI2dW8zIn0.LY2YR5jfbsRx4DwwApEVIg";

export const useMapBox = (defaultPoint) => {
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  const [coords, setCoords] = useState(defaultPoint);

  useEffect(() => {
    var mapBox = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [defaultPoint.lng, defaultPoint.lat],
      zoom: defaultPoint.zoom,
    });

    mapDiv.current = mapBox;
  }, [defaultPoint]);

  useEffect(() => {
    mapDiv.current?.on("move", () => {
      const { lng, lat } = mapDiv.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapDiv.current.getZoom().toFixed(4),
      });
    });
  }, []);
  return {
    coords,
    setRef,
  };
};
