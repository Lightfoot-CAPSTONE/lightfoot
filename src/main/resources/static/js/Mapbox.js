import {MAPBOX} from "./keyfile.js";
import {getAirNowByLatLong} from "./AirNowApi.js";
import {getBreezometer} from "./Breezometer.js";
//import {MapboxGeocoder} from '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.js';
//import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

let center = [-97.77, 30.26]
let map;
let geocoder;

export default function getMapbox() {
    mapboxgl.accessToken = MAPBOX;
    map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: center, // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
}

export function getGeocoder() {
    geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
    // Add the control to the map.
    map.addControl(geocoder);
}

export function setGeocoderEvent() {
    //
    geocoder.on('result', async (data) => {
        await getRoute(data.result.geometry.coordinates);
        $(getGoButton()).insertAfter("#map");
    })
}

export function setMapLoadEvent() {
    const setAirData = async (lngLat) => {
        const airdata = await getAirNowByLatLong(lngLat).then(rez => rez.json());
       setAirnowData(airdata);
       setAirnowMarkers(airdata);
    };
    const setBreezometer = async (lngLat) => {
        const breezometer = await getBreezometer(lngLat,map.getZoom()).then(rez => rez.json());
        console.log(breezometer);
    }
    map.on('click', (event) => {
        center = [event.lngLat.lng, event.lngLat.lat]
        map.flyTo({center: center})
        setAirData(event.lngLat);
        setBreezometer(event.lngLat);
    })

    // extract zipcode var from click-event
    // send zipcode var to AirnowAPI
    // return results

    /*
        map.on('load', () => {
            // make an initial directions request that
            // starts and ends at the same location
            getRoute(center);

            // Add starting point to the map
            map.addLayer({
                id: 'point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: start
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            });
            // this is where the code from the next step will go
        });
    */

}

// create a function to make a directions request
async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${center[0]},${center[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        {method: 'GET'}
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
            }
        });
    }
    // add turn instructions here at the end
}

export function getGoButton() {
    //language=HTML
    return `
        < button
        id = "go-button" > Go < /button>`
}

export function setGoButtonEvent() {
    $("#app").on("click", "#go-button", function () {
        console.log("go-button");
    })
}
function setAirnowData(airdata) {
    //language=HTML
    const metadata = `
            <div class="col-4">
                <h3>Date</h3>
                <p>${airdata[0].DateObserved}</p>
                <h3>Hour</h3>
                <p>${airdata[0].HourObserved}</p>
                <h3>Reporting Area</h3>
                <p>${airdata[0].ReportingArea} ${airdata[0].StateCode}</p>
            </div>
        `
    const airDataElements = airdata.map((data) => {
        //language=HTML
        return `
                <div class="col-3"><h3>${data.ParameterName}</h3>
                    <h4>Current Quality</h4>
                    <p>${data.Category.Name}</p>
                    <h4>Air Quality Index</h4>
                    <p>${data.AQI}</p>
                </div>`
    })
    $('#airnowresults').empty().append(metadata, airDataElements);
}
function setAirnowMarkers(airdata){
    const geojson = {
        type: 'FeatureCollection',
        features: airdata.map((data) => {
           return {
            type: 'Feature',
                geometry: {
                type: 'Point',
                    coordinates: [data.Longitude, data.Latitude]
            },
            properties: {
                title: 'Mapbox',
                    description: data.ReportingArea
            }
        }})
    };
    // add markers to map
   setMarkers(geojson)
console.log($('.marker'))
}
function setMarkers(geojson){
    $('.marker').remove();
    for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
    }
}