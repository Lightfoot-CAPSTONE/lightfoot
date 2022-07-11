import {MAPBOX} from "./keyfile.js";
let center = [-97.77,30.26]
export default function getMapbox(){
    mapboxgl.accessToken = MAPBOX;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: center, // starting position [lng, lat]
        zoom: 17 // starting zoom
    });
}

export function getGeo

