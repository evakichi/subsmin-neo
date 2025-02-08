import * as fs from "fs";
import axis from 'axios';
const inputToken = fs.readFileSync("/home/evakichi/token.json", 'utf-8');
const tokenString = JSON.parse(inputToken);
const baseURL = "https://api.odpt.org/api/v4/odpt:";
const urls = {
    railway: baseURL + "Railway",
    station: baseURL + "Station",
    railwayFare: baseURL + "RailwayFare",
    trainInformation: baseURL + "TrainInformation",
    stationTimetable: baseURL + "StationTimetable",
    trainTimetable: baseURL + "TrainTimetable",
};
const parameters = {
    "odpt:operator": "odpt.Operator:MIR",
    "acl:consumerKey": tokenString.token
};
railway(urls.railway, parameters);
function railway(url, parameters) {
    axis.get(url, { params: parameters })
        .then((response) => {
        console.log(response.data);
        //document.body.innerHTML=JSON.stringify(response.data);
    });
}
;
function getNextTrain(trainData) {
    let stationOrder = [];
    let stationIndex = 0;
    for (let station of trainData.railway[0]['odpt:stationOrder']) {
        stationOrder[stationIndex] = station;
        console.log(stationOrder[stationIndex++]);
    }
}
;
document.body.innerHTML = "test";
