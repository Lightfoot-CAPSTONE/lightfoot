import {AIRNOW, EPA_AQS_API, EPA_AQS_EMAIL} from "../keyfile.js";

export default function getEpaAqsApi() {
    fetch(`https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=78602&distance=25&API_KEY=${EPA_AQS_API}`)
        .then(rez=>rez.json())
        .then(data=>console.log(data))
}

/*export function getEpaAqsDataByBox(centerpoint) {
    fetch(`https://aqs.epa.gov/data/api/monitors/byBox?email=${EPA_AQS_EMAIL}&key=${EPA_AQS_API}&param=78602&bdate=20220101&edate=202207211&minlat=33.3&maxlat=33.6&minlon=-87.0&maxlon=-86.7`)
}*/
