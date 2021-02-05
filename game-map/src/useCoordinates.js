import { useState, useEffect } from "react";

const useCoordinates = (props) => {
  const [coords, setCoords] = useState({ latitude: -1, longitude: -1 });
  const [error, setError] = useState("");
  useEffect(() => {
    const geo = navigator.geolocation;
    const watcher = geo.watchPosition(
      ({ coords }) =>
        setCoords({ latitude: coords.latitude, longitude: coords.longitude }),
      (error) => {
        setError(error.message);
      }
    );
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...coords, error: error };
};

export default useCoordinates;
