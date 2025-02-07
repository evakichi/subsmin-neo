"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var axios_1 = require("axios");
var inputToken = fs.readFileSync("/home/evakichi/token.json", 'utf-8');
var tokenString = JSON.parse(inputToken);
function getNextTrain(trainTimeTable, stationTimeTable, station, railway, trainInformation, railwayFare) {
    console.log(trainTimeTable);
    console.log(stationTimeTable);
    console.log(station);
    console.log(railway);
    console.log(trainInformation);
    console.log(railwayFare);
}
;
function getRailwayFare(token, trainTimeTable, stationTimeTable, station, railway, trainInformation) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:RailwayFare", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        getNextTrain(trainTimeTable, stationTimeTable, station, railway, trainInformation, response.data);
    })
        .catch(function (error) {
        console.error("Fail");
        console.error(error);
    })
        .finally(function () {
        //console.log("finish");
    });
}
;
function getTrainInformation(token, trainTimeTable, stationTimeTable, station, railway) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:TrainInformation", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        getRailwayFare(token, trainTimeTable, stationTimeTable, station, railway, response.data);
    })
        .catch(function (error) {
        console.error("Fail");
        console.error(error);
    })
        .finally(function () {
        //console.log("finish");
    });
}
;
function getRailway(token, trainTimeTable, stationTimeTable, station) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:Railway", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        getTrainInformation(token, trainTimeTable, stationTimeTable, station, response.data);
    })
        .catch(function (error) {
        console.error("Fail");
        console.error(error);
    })
        .finally(function () {
        //console.log("finish");
    });
}
;
function getStation(token, trainTimeTable, stationTimeTable) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:Station", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        getRailway(token, trainTimeTable, stationTimeTable, response.data);
    })
        .catch(function (error) {
        console.error("Fail");
        console.error(error);
    })
        .finally(function () {
        //console.log("finish");
    });
}
;
function getStationTimeTable(token, trainTimeTable) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:StationTimetable", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        getStation(token, trainTimeTable, response.data);
    })
        .catch(function (error) {
        console.error("Fail");
        console.error(error);
    })
        .finally(function () {
        //console.log("finish");
    });
}
;
function getTrainTimeTable(token) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:TrainTimetable", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        getStationTimeTable(token, response.data);
    })
        .catch(function (error) {
        console.error("Fail");
        console.error(error);
    })
        .finally(function () {
        //console.log("finish");
    });
}
;
getTrainTimeTable(tokenString.token);
