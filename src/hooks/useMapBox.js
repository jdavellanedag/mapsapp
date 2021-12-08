import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { v4 as uuidv4 } from "uuid";
import { Subject } from "rxjs";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamRhdmVsbGFuZWRhZyIsImEiOiJja3Z1MjBiamMxaDJlMm9xcGZmMzI2dW8zIn0.LY2YR5jfbsRx4DwwApEVIg";

export const useMapBox = (defaultPoint) => {
  //Map reference
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  //Marker reference
  const markers = useRef({});

  // Observable
  const markerMovement = useRef(new Subject());
  const newMarker = useRef(new Subject());

  const [coords, setCoords] = useState(defaultPoint);

  const addMarker = useCallback((ev) => {
    const { lng, lat } = ev.lngLat;

    const marker = new mapboxgl.Marker();
    marker.id = uuidv4(); // TODO: Validate if the marker already have a ID
    marker.setLngLat([lng, lat]).addTo(mapDiv.current).setDraggable(true);

    markers.current[marker.id] = marker;
    newMarker.current.next({
      id: marker.id,
      lng,
      lat,
    });

    marker.on("drag", ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();

      markerMovement.current.next({ id, lng, lat });
    });
  }, []);

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

  useEffect(() => {
    mapDiv.current?.on("click", addMarker);
  }, [addMarker]);

  return {
    addMarker,
    coords,
    setRef,
    newMarker$: newMarker.current,
    markerMovement$: markerMovement.current,
    markers,
  };
};
