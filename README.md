# Splunk Profiling Application Documentation

## Overview

## Directory Structure

Open the application - within the root directory you should see the following structure
```
+-- appserver
	+-- static
	+-- css
		+-- searchbyidstyling.css
	+-- js
		+-- searchbyidview.js
		+-- baseclass.js
+-- bin
+-- default
	+-- data
	+-- ui
		+-- nav
			+-- default.xml
		+-- views
			+-- SearchByID.xml
	+-- app.conf
+-- local
+-- lookups
+-- metadata
+-- README.md
``` 

### Prerequisites

- Ensure you have downloaded the relevant datasets
- Ensure the root directory name is SPA

### Local Deployment

Assuming the default location for installation of Splunk Enterprise was chosen, direct yourself to
> C:\Program Files\Splunk\etc\apps\\$app-name\$

It is highly recommended that you open the root directory in your favourite editor (e.g. Visual Studio Code). Please note that to make any changes to the codebase locally, you will firstly need to open your editor with administrator permissions.

Start Splunk Enterprise as you normally would. Redirect yourself to the relevant application e.g.
> http://localhost:8000/en-US/app/$app-name$

Any changes made in the codebase won't be reflected in the application under you redirect to this URL and hit the "Bump Version" button. This will simply refresh the static files in the browser. 
> http://localhost:8000/en-US/_bump

If you haven't already please go through the following tutorial to get comfortable with how Splunk web development operates.
> http://dev.splunk.com/view/webframework-tutorials/SP-CAAAEQ8
 
