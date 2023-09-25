import React, { useRef, useEffect } from "react";
import "./Map.css";

interface MapsProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Map: React.FC<MapsProps> = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
      });

      new window.google.maps.Marker({
        position: center,
        map: map,
      });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`Map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
