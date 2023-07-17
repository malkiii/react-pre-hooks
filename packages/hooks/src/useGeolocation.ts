import { useState } from 'react';
import { useEffectOnce } from './useEffectOnce';

type GeoLocationSensorState = {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error?: Error | GeolocationPositionError;
};

export const useGeolocation = (options?: PositionOptions) => {
  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null
  });

  useEffectOnce(() => {
    const successCallback: PositionCallback = ({ coords, timestamp }) => {
      setState({
        loading: false,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        accuracy: coords.accuracy,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
        timestamp
      });
    };

    const errorCallback: PositionErrorCallback = error => {
      setState(s => ({ ...s, loading: false, error }));
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    const watch = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  });

  return state;
};
