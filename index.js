process.env.NODE_ENV = "dev";
const config = require('config');
const request = require('request');
const opts = require('node-getopt').create([
	['s','start=s','start time - format 00:00'],
	['e','end=e','end time - format 00:00'],
	['d','date=d','date - format DD-MM-YYYY'],
	['h','help','display the help'],
	['p','project=p','project name']
])
.bindHelp()
.parseSystem();

module.exports = {
	authenticate,
	timeEntry,
	send
};

const result  = timeEntry(config.get(opts.options.project),opts.options.start,opts.options.end,opts.options.date);

if(result.body.time_entry){
	
	send(result);
}

function authenticate (){
	const req = {
		auth: {
			user: config.get("name"),
			pass: config.get("password")
		},
		method: 'get',
		url: "https://www.toggl.com/api/v8/me",
		json: true,

	};
	request(req,response => {console.log(response.body);});
}

function setTimezoneString(date){
 	return date.toISOString().replace('Z',config.get('timezone'));//"+03:00"
}


//authenticate();
//time  format 00:00
//date formay DD-MM-YYYY
function timeEntry(pid,start,end,date){

	if(!start && !end && !date && !pid){
		throw Exception('At least one value must be defined');
	}
	let primar = new Date();
	
	if(date){
		const tmpDateArray = date.split("-");
		primar.setYear(tmpDateArray[2]);
		primar.setMonth(tmpDateArray[1] - 1);
		primar.setDate(tmpDateArray[0]);
	}

	//deep copy the date
	let startDate = new Date(primar.valueOf());
	let endDate = new Date(primar.valueOf());

	if(start){
		const tmpStartArray = start.split(":");
		startDate.setUTCHours(tmpStartArray[0],tmpStartArray[1]);
	}

	if(end){
		const tmpEndArray = end.split(":");
		endDate.setUTCHours(tmpEndArray[0],tmpEndArray[1]);
	}

	const duration = Math.abs(endDate - startDate) / 1000;
	
	const req = {
		auth: {
			user: config.get('api_token'),
			pass: 'api_token'
		},
		uri: "https://www.toggl.com/api/v8/time_entries",
		json:true,
		method: "POST",
		"body": {
			"time_entry": {
				created_with: config.get('app_name'),
				pid: pid,
				start: setTimezoneString(startDate),
				duration: duration ,
				end:setTimezoneString(endDate)
			}
		}

	};
	return req;
}

function send(data){
	console.log('data');
	const req = Object.assign({},data);
	request(req,(err,response,data) => {
		if(err) {
			console.log(err);
			throw err;
		}

	 	var statusCode = response.statusCode;
	 	if (statusCode >= 200 && statusCode < 300) {
      		console.log('request success',data);
    	}
    	else{
    		console.log('request failed',statusCode,data);
    	}
	});

}
