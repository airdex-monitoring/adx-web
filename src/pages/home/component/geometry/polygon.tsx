/* eslint-disable complexity */
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef
} from 'react';

import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps';

import type { Ref } from 'react';

type PolygonEventProps = {
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onDrag?: (e: google.maps.MapMouseEvent) => void;
  onDragStart?: (e: google.maps.MapMouseEvent) => void;
  onDragEnd?: (e: google.maps.MapMouseEvent) => void;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onMouseOut?: (e: google.maps.MapMouseEvent) => void;
};


export type PolygonProps = google.maps.PolygonOptions &
  PolygonEventProps;

export type PolygonRef = Ref<google.maps.Polygon | null>;

function usePolygon(props: PolygonProps) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    ...polygonOptions
  } = props;
  // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
  const callbacks = useRef<Record<string, (e: unknown) => void>>({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut
  });

  const geometryLibrary = useMapsLibrary('geometry');

  const polygon = useRef(new google.maps.Polygon()).current;

  useMemo(() => {
    polygon.setOptions(polygonOptions);
  }, [polygon, polygonOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // update the paths of the polygon
  useMemo(() => {
    if (!polygonOptions.paths) return;
    polygon.setPaths(polygonOptions.paths);
  }, [polygonOptions.paths, polygon, geometryLibrary]);


  // create polygon instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      console.error('<Polygon> must be used within a <Map> component. Ensure the map context is provided.');
      return;
    }

    polygon.setMap(map);

    return () => {
      polygon.setMap(null);
    };
  }, [map, polygon]);


  // attach and re-attach event-handlers when any of the properties change
  useEffect(() => {
    if (!polygon) return;

    const gme = google.maps.event;
    const listeners = [
      { name: 'click', handler: onClick },
      { name: 'drag', handler: onDrag },
      { name: 'dragstart', handler: onDragStart },
      { name: 'dragend', handler: onDragEnd },
      { name: 'mouseover', handler: onMouseOver },
      { name: 'mouseout', handler: onMouseOut },
    ];

    listeners.forEach(({ name, handler }) => {
      if (handler) {
        gme.addListener(polygon, name, handler);
      }
    });

    return () => {
      gme.clearInstanceListeners(polygon);
    };
  }, [polygon, onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut]);


  return polygon;
}

/**
 * Component to render a polygon on a map
 */
export const Polygon = forwardRef((props: PolygonProps, ref: PolygonRef) => {
  const polygon = usePolygon(props);

  useImperativeHandle(ref, () => polygon, [polygon]);

  return null;
});