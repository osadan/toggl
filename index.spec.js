const config = require('config');
describe('first node test',() => {
	const index = require('./index');
	let result; 
	
	beforeEach(()=> {
		request = {
			auth: {
				user: config.get('api_token'),
				pass: 'api_token'
			},
			url: "https://www.toggl.com/api/v8/time_entries",
			method: "POST",
			"body": {
				"time_entry": {
					created_with: config.get('app_name'),
					pid: undefined,
					start: undefined,
					duration:0 ,
					end:undefined
				}
			}
		}
	});

	it('first example',() => {
		expect(true).toBe(true);
	});

	it('should get pid and start and return current day and current time as end',()=>{
		const respone = index.timeEntry('1',"07:30","13:00",null);
		expect(response.body.time_entry.pid).toBe('1');
		expect(response.body.time_entry.created_with).toBe('oss-toggl');
	})
});

//we should add single entry at the beginnig of the day
//and another entry at the end of the day
//if this is the start of the day we will also 
//create lunch break
//if start  or end is missing we will think of it as know
//if both are missing we will throuw an exception