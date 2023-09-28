import { useCallback, useEffect, useState } from 'react';

export type GeoLocationState = Partial<GeolocationCoordinates> & {
  loading: boolean;
  error?: GeolocationPositionError;
};

export const useGeolocation = (options: PositionOptions = {}) => {
  const [state, setState] = useState<GeoLocationState>({ loading: true });

  const successCallback: PositionCallback = useCallback(({ coords }) => {
    setState({
      loading: false,
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      accuracy: coords.accuracy,
      altitudeAccuracy: coords.altitudeAccuracy,
      heading: coords.heading,
      speed: coords.speed
    });
  }, []);

  const errorCallback: PositionErrorCallback = useCallback(error => {
    setState(state => ({ ...state, loading: false, error }));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    const watch = navigator.geolocation.watchPosition(successCallback, errorCallback, options);

    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, []);

  return state;
};
