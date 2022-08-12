import {BREEZOMETER_API} from "./keyfile.js";

export async function getBreezometer(coordinates,zoomlevel) {
    return await fetch(`https://tiles.breezometer.com/v1/air-quality/breezometer-aqi/current-conditions/${zoomlevel}/${parseInt(coordinates.lat)}/${parseInt(coordinates.lng)}.png?key=${BREEZOMETER_API}&breezometer_aqi_color=indiper`,
    {mode:'no-cors'})
}