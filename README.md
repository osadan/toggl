##report time in toggle 

This project expose single function in order to register single time entry in toggl . 

rename dev.demo.json to dev.json and add your credentials 
name ,password , apitoken

If you don't know your toggl api. get it in https://toggl.com/app/profile (from the bottom of the page)

Add in default.json your projects including project name and project id 
(if you don't know your project id go to Projects page and select a project in the url copy the id after the 'edit' word  )

In order to add time entry just run the index.js with the following parameters

```
node index.js -s TINE_START -e TIME_END -p PROJECT_NAME -d DATE
```

Time format is HH:MM
Date format is DD-MM-YYYY

I think that's it. 

Other imporvments or suggestions will be welcome
