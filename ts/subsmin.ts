import * as fs from "fs";
import * as yargs from "yargs";
import axis from 'axios';
	

type TokenString={
	token:string;
};

const inputToken:string = fs.readFileSync("/home/evakichi/token.json",'utf-8');
const tokenString:TokenString = JSON.parse(inputToken);
function getNextTrain(trainTimeTable:any,stationTimeTable:any,station:any,railway:any,trainInformation:any,railwayFare:any){
	 console.log(trainTimeTable);
	 console.log(stationTimeTable);
	 console.log(station);
	 console.log(railway);
	 console.log(trainInformation);
	 console.log(railwayFare);
};
function getRailwayFare(token:string,trainTimeTable:any,stationTimeTable:any,station:any,railway:any,trainInformation:any){
	axis.get("https://api.odpt.org/api/v4/odpt:RailwayFare",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 getNextTrain(trainTimeTable,stationTimeTable,station,railway,trainInformation,response.data);
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
function getTrainInformation(token:string,trainTimeTable:any,stationTimeTable:any,station:any,railway:any){
	axis.get("https://api.odpt.org/api/v4/odpt:TrainInformation",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 getRailwayFare(token,trainTimeTable,stationTimeTable,station,railway,response.data);
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
function getRailway(token:string,trainTimeTable:any,stationTimeTable:any,station:any){
	axis.get("https://api.odpt.org/api/v4/odpt:Railway",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 getTrainInformation(token,trainTimeTable,stationTimeTable,station,response.data);
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

function getStation(token:string,trainTimeTable:any,stationTimeTable:any){
	axis.get("https://api.odpt.org/api/v4/odpt:Station",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 getRailway(token,trainTimeTable,stationTimeTable,response.data);
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

function getStationTimeTable(token:string,trainTimeTable:any){
	axis.get("https://api.odpt.org/api/v4/odpt:StationTimetable",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 getStation(token,trainTimeTable,response.data); 
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

function getTrainTimeTable(token:string){
	axis.get("https://api.odpt.org/api/v4/odpt:TrainTimetable",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": token,
			 }
		 })
		 .then((response)=>{
			 getStationTimeTable(token,response.data); 
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

getTrainTimeTable(tokenString.token);
