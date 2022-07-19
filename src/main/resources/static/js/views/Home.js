import getMapbox, {
    getGeocoder,
    setGeocoderEvent,
    setGoButtonEvent,
    setMapLoadEvent
} from "../Mapbox.js";
import getAirNowApi from "./AirNowApi.js";
export default function Home(props) {
    console.log("The frontend did it. HER FAULT");
    //language=HTML
    return `<div id="map" style="min-height: 600px;"></div>
    `;
}
export function HomeEvents(){
    getAirNowApi();
    getMapbox();
    setGoButtonEvent();
    setEndButtonEvent();
    getGeocoder();
    setGeocoderEvent();
    setMapLoadEvent();
}

