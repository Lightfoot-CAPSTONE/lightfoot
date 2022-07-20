import {AIRNOW, EPA_AQS_API} from "../keyfile.js";

export default function getEpaAqsApi() {
    fetch(`https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=78602&distance=25&API_KEY=${EPA_AQS_API}`)
        .then(rez=>rez.json())
        .then(data=>console.log(data))
}


