"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var axios_1 = require("axios");
var inputToken = fs.readFileSync("/home/evakichi/token.json", 'utf-8');
var tokenString = JSON.parse(inputToken);
function getNextTrain(trainData) {
    console.log(trainData.trainTimeTable);
    console.log(trainData.stationTimeTable);
    console.log(trainData.station);
    console.log(trainData.railway);
    console.log(trainData.trainInformation);
    console.log(trainData.railwayFare);
}
;
function getRailwayFare(token, trainData) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:RailwayFare", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        trainData.railwayFare = response.data;
        getNextTrain(trainData);
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
function getTrainInformation(token, trainData) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:TrainInformation", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        trainData.trainInformation = response.data;
        getRailwayFare(token, trainData);
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
function getRailway(token, trainData) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:Railway", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        trainData.railway = response.data;
        getTrainInformation(token, trainData);
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
function getStation(token, trainData) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:Station", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        trainData.station = response.data;
        getRailway(token, trainData);
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
function getStationTimeTable(token, trainData) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:StationTimetable", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        trainData.stationTimeTable = response.data;
        getStation(token, trainData);
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
function getTrainTimeTable(token, trainData) {
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:TrainTimetable", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": token,
        }
    })
        .then(function (response) {
        trainData = { trainTimeTable: response.data };
        getStationTimeTable(token, trainData);
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
var trainData;
getTrainTimeTable(tokenString.token, trainData);
