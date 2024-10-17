/* eslint-disable complexity */
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef
} from 'react';

import type { Ref } from 'react';
import { GoogleMapsContext, latLngEquals } from '@vis.gl/react-google-maps';

type CircleEventProps = {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onDrag?: (e: google.maps.MapMouseEvent) => void;
    onDragStart?: (e: google.maps.MapMouseEvent) => void;
    onDragEnd?: (e: google.maps.MapMouseEvent) => void;
    onMouseOver?: (e: google.maps.MapMouseEvent) => void;
    onMouseOut?: (e: google.maps.MapMouseEvent) => void;
    onRadiusChanged?: (r: ReturnType<google.maps.Circle['getRadius']>) => void;
    onCenterChanged?: (p: ReturnType<google.maps.Circle['getCenter']>) => void;
};

export type CircleProps = google.maps.CircleOptions & CircleEventProps;

export type CircleRef = Ref<google.maps.Circle | null>;

function useCircle(props: CircleProps) {
    const {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
        onRadiusChanged,
        onCenterChanged,
        radius,
        center,
        ...circleOptions
    } = props;
    // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
    const callbacks = useRef<Record<string, (e: unknown) => void>>({});
    Object.assign(callbacks.current, {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
        onRadiusChanged,
        onCenterChanged
    });

    const circle = useRef(new google.maps.Circle()).current;

    useEffect(() => {
        circle.setOptions(circleOptions);
    }, [circleOptions, circle]);

    useEffect(() => {
        if (!center) return;
        if (!latLngEquals(center, circle.getCenter())) circle.setCenter(center);
    }, [center, circle]);

    useEffect(() => {
        if (radius === undefined || radius === null) return;
        if (radius !== circle.getRadius()) {
            circle.setRadius(radius);
        }
    }, [radius, circle]);

    const map = useContext(GoogleMapsContext)?.map;

    // create circle instance and add to the map once the map is available
    useEffect(() => {
        if (!map) {
            console.error('<Circle> must be used within a <Map> component. Ensure the map context is provided.');
            return;
        }

        circle.setMap(map);

        return () => {
            circle.setMap(null);
        };
    }, [map, circle]);


    // attach and re-attach event-handlers when any of the properties change
    useEffect(() => {
        if (!circle) return;

        const gme = google.maps.event;

        const listeners = [
            { name: 'click', handler: onClick },
            { name: 'drag', handler: onDrag },
            { name: 'dragstart', handler: onDragStart },
            { name: 'dragend', handler: onDragEnd },
            { name: 'mouseover', handler: onMouseOver },
            { name: 'mouseout', handler: onMouseOut }
        ];

        listeners.forEach(({ name, handler }) => {
            if (handler) {
                gme.addListener(circle, name, handler);
            }
        });

        gme.addListener(circle, 'radius_changed', () => {
            callbacks.current.onRadiusChanged?.(circle.getRadius());
        });

        gme.addListener(circle, 'center_changed', () => {
            callbacks.current.onCenterChanged?.(circle.getCenter());
        });

        return () => {
            gme.clearInstanceListeners(circle);
        };
    }, [circle, onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut]);

    return circle;
}

/**
 * Component to render a circle on a map
 */
export const Circle = forwardRef((props: CircleProps, ref: CircleRef) => {
    const circle = useCircle(props);

    useImperativeHandle(ref, () => circle, [circle]);

    return null;
});