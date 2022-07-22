import {AIRNOW} from "./keyfile.js";
//API provides air quality data

export default function getAirNowApi() {
    fetch(`https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=78602&distance=25&API_KEY=${AIRNOW}`)
        .then(rez=>rez.json())
        .then(data=>console.log(data))
}

export async function getAirNowByLatLong(coordinates) {
    return await fetch(`https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json&latitude=${coordinates.lat}&longitude=${coordinates.lng}&distance=50&API_KEY=${AIRNOW}`)
   /*     .then(rez=>rez.json())
        .then(data=>console.log(data))*/
}