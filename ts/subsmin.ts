import * as fs from "fs";
import * as yargs from "yargs";
import axis from 'axios';

type TokenString={
	token:string;
}
function getStation(){
	const inputToken:string = fs.readFileSync("./token.json",'utf-8');
	const tokenString:TokenString = JSON.parse(inputToken);
	axis.get("https://api.odpt.org/api/v4/odpt:Station",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": tokenString.token,
			 }
		 })
		 .then((response)=>{
			 console.log(response.data);
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

function getStationTimeTable(){
	const inputToken:string = fs.readFileSync("./token.json",'utf-8');
	const tokenString:TokenString = JSON.parse(inputToken);
	axis.get("https://api.odpt.org/api/v4/odpt:StationTimetable",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": tokenString.token,
			 }
		 })
		 .then((response)=>{
			 console.log(response.data);
			 getStation(); 
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

function getTrainTimeTable(){
	const inputToken:string = fs.readFileSync("./token.json",'utf-8');
	const tokenString:TokenString = JSON.parse(inputToken);
	axis.get("https://api.odpt.org/api/v4/odpt:TrainTimetable",
		 {
			 params: {
		 		"odpt:operator": "odpt.Operator:MIR",
				"acl:consumerKey": tokenString.token,
			 }
		 })
		 .then((response)=>{
			 console.log(response.data);
			 getStationTimeTable(); 
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

getTrainTimeTable();
