import getMapbox, {
    getGeocoder,
    setGeocoderEvent,
    setGoButtonEvent,
    setMapLoadEvent
} from "../Mapbox.js";

export default function Home(props) {
    console.log("Light of foot, flight of fleet.  Quickly together our progress meet.");
    //language=HTML
    return `
        <div id="map" style="min-height: 600px;"></div>
        <div id="airnowresults" class="row" style="height: 40px;"></div>
    `;
}

export function HomeEvents() {
    getMapbox();
    getGeocoder();
    setGeocoderEvent();
    setMapLoadEvent();
}

