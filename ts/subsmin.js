"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var axios_1 = require("axios");
function getStation() {
    var inputToken = fs.readFileSync("./token.json", 'utf-8');
    var tokenString = JSON.parse(inputToken);
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:Station", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": tokenString.token,
        }
    })
        .then(function (response) {
        console.log(response.data);
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
function getStationTimeTable() {
    var inputToken = fs.readFileSync("./token.json", 'utf-8');
    var tokenString = JSON.parse(inputToken);
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:StationTimetable", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": tokenString.token,
        }
    })
        .then(function (response) {
        console.log(response.data);
        getStation();
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
function getTrainTimeTable() {
    var inputToken = fs.readFileSync("./token.json", 'utf-8');
    var tokenString = JSON.parse(inputToken);
    axios_1.default.get("https://api.odpt.org/api/v4/odpt:TrainTimetable", {
        params: {
            "odpt:operator": "odpt.Operator:MIR",
            "acl:consumerKey": tokenString.token,
        }
    })
        .then(function (response) {
        console.log(response.data);
        getStationTimeTable();
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
getTrainTimeTable();
