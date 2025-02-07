import * as fs from "fs";
import * as yargs from "yargs";
import axis from 'axios';
	

type TokenString={
	token:string;
};

type TrainData={
	 trainTimeTable:any;
	 stationTimeTable:any;
	 station:any;
	 railway:any;
	 trainInformation:any;
	 railwayFare:any;
};

const inputToken:string = fs.readFileSync("/home/evakichi/token.json",'utf-8');
const tokenString:TokenString = JSON.parse(inputToken);
function getNextTrain(trainData:TrainData){
	 console.log(trainData.trainTimeTable);
	 console.log(trainData.stationTimeTable);
	 console.log(trainData.station);
	 console.log(trainData.railway);
	 console.log(trainData.trainInformation);
	 console.log(trainData.railwayFare);
};
function getRailwayFare(token:string,trainData:TrainData){
	axis.get("https://api.odpt.org/api/v4/odpt:RailwayFare",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 trainData.railwayFare=response.data;
			 getNextTrain(trainData);
		 }
		 )
		 .catch((error) =>{
			 console.error("Fail");
			 console.error(error);
		 })
		 .finally(() => {
			 //console.log("finish");
		 });
};
function getTrainInformation(token:string,trainData:TrainData){
	axis.get("https://api.odpt.org/api/v4/odpt:TrainInformation",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 trainData.trainInformation = response.data;
			 getRailwayFare(token,trainData);
		 }
		 )
		 .catch((error) =>{
			 console.error("Fail");
			 console.error(error);
		 })
		 .finally(() => {
			 //console.log("finish");
		 });
};
function getRailway(token:string,trainData:TrainData){
	axis.get("https://api.odpt.org/api/v4/odpt:Railway",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 trainData.railway = response.data;
			 getTrainInformation(token,trainData);
		 }
		 )
		 .catch((error) =>{
			 console.error("Fail");
			 console.error(error);
		 })
		 .finally(() => {
			 //console.log("finish");
		 });
};

function getStation(token:string,trainData:TrainData){
	axis.get("https://api.odpt.org/api/v4/odpt:Station",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 trainData.station = response.data;
			 getRailway(token,trainData);
		 }
		 )
		 .catch((error) =>{
			 console.error("Fail");
			 console.error(error);
		 })
		 .finally(() => {
			 //console.log("finish");
		 });
};

function getStationTimeTable(token:string,trainData:TrainData){
	axis.get("https://api.odpt.org/api/v4/odpt:StationTimetable",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 trainData.stationTimeTable = response.data;
			 getStation(token,trainData); 
		 }
		 )
		 .catch((error) =>{
			 console.error("Fail");
			 console.error(error);
		 })
		 .finally(() => {
			 //console.log("finish");
		 });
};

function getTrainTimeTable(token:string,trainData:TrainData){
	axis.get("https://api.odpt.org/api/v4/odpt:TrainTimetable",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 trainData={trainTimeTable : response.data};
			 getStationTimeTable(token,trainData); 
		 }
		 )
		 .catch((error) =>{
			 console.error("Fail");
			 console.error(error);
		 })
		 .finally(() => {
			 //console.log("finish");
		 });
};

let trainData: TrainData;
getTrainTimeTable(tokenString.token,trainData);
