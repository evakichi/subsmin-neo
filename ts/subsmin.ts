import * as fs from "fs";
import axis from 'axios';
	

type TokenString={
	token:string;
};

type TrainData={
	 trainTimeTable?:any;
	 stationTimeTable?:any;
	 station?:any;
	 railway?:any;
	 trainInformation?:any;
	 railwayFare?:any;
};

type StationTitle={
      en: string;
      ja: string;
      ko: string;
      'zh-Hans': string;
      'zh-Hant': string;
};

type StationOrder={
    'odpt:index': number;
    'odpt:station': string;
    'odpt:stationTitle': StationTitle;
};

const inputToken:string = fs.readFileSync("/home/evakichi/token.json",'utf-8');
const tokenString:TokenString = JSON.parse(inputToken);
type Parameters={
	"odpt:operator": string;
	"acl:consumerKey": string;
};
const baseURL:string ="https://api.odpt.org/api/v4/odpt:";
type URLs={
	railway:string;
	station:string;
	railwayFare:string;
	trainInformation:string;
	stationTimetable:string;
	trainTimetable:string;
};
const urls:URLs ={
	railway:baseURL+"Railway",
	station:baseURL+"Station",
	railwayFare:baseURL+"RailwayFare",
	trainInformation:baseURL+"TrainInformation",
	stationTimetable:baseURL+"StationTimetable",
	trainTimetable:baseURL+"TrainTimetable",
};

const parameters={
	"odpt:operator":"odpt.Operator:MIR",
	"acl:consumerKey":tokenString.token
};

railway(urls.railway,parameters);

function railway(url:string,parameters:Parameters){
	axis.get(url,{params: parameters})
		 .then((response)=>{
			 console.log(response.data);
			 //document.body.innerHTML=JSON.stringify(response.data);
		 })
};

function getNextTrain(trainData:TrainData){
	 let stationOrder: StationOrder[]=[];
	 let stationIndex = 0;
	 for ( let station of trainData.railway[0]['odpt:stationOrder'] ){
		stationOrder[stationIndex] = station;
		console.log(stationOrder[stationIndex++]);

	 }
};
document.body.innerHTML="test";
