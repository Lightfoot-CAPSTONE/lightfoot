import getMapbox, {
    getGeocoder,
    setGeocoderEvent,
    setGoButtonEvent,
    setMapLoadEvent
} from "../Mapbox.js";

export default function Home(props) {
    console.log("The frontend did it. HER FAULT");
    //language=HTML
    return `
        <div id="map" style="min-height: 600px;"></div>

        <div id="airnowresults" class="row" style="height: 50px;"></div>
    `;
}

export function HomeEvents() {
    getMapbox();
    getGeocoder();
    setGeocoderEvent();
    setMapLoadEvent();
}

