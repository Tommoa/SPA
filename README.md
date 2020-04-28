# Splunk Profiling Application Documentation

## Overview

## Directory Structure

Within SPA's root directory, you should see the following structure
```
+-- appserver
	+-- static
		+-- css
			--- alerts.css
			--- common.css
			--- configure.css
			--- loader.css
			--- modal.css
			--- quicksand.css
		+-- images
		+-- js
			+-- api
				--- api.js
				--- polling.js
			+-- helper
				--- helper.js
			+-- view
				--- blacklistview.js
				--- configure.js
				--- contactlistview.js
				--- searchbyidview.js
				--- searchbyMACview.js
			--- date.js
			--- modal.js
			--- retrieveProfiles.js
+-- bin
+-- blacklists
+-- contacts_csv
+-- default
	+-- data
		+-- ui
			+-- nav
				--- default.xml
			+-- views
				--- BlackList.xml
				--- ConfigureAPI.xml
				--- ContactList.xml
				--- SearchByID.xml
				--- SearchByMAC.xml
		--- app.conf
		--- collections.conf
		--- transforms.conf
+-- local
+-- lookups
+-- metadata
+-- static
+-- test
	--- test.js
--- README.md
```

### CSS
Each CSS file contains styling for modules which may be shared across multiple XML pages. A new CSS file should be created if the additional content is unique compared to the other existing CSS files. XML pages sharing the same styling should share the same unified CSS (e.g. common.css). A new CSS file should only be created for a page if the styling is unique to that page.

### Javascript
SPA uses ES6 and follows the Airbnb standards for code styling. Require.js is used for module handling. These files can be found in the /SPA/static/js/ folder which are further categorised into subfolders.


api
- Any scripts handling the interactions between TIM and SPA can be found in this folder.


helper
- helper.js contains functions which may be called by multiple views or other directories.


view
- Each XML file has its own js file with scripts unique to that view.
- A new js file containing unique scripts should be created for new XML files. If the functions are common, these should be refactored out into its own js file, or into helper.js.

### XML
The XML files can be found in the /SPA/default/data/views/ folder. Each file reflects a page in SPA. Links to these pages can be added to the taskbar within SPA by adding references in default.xml found under /SPA/default/data/nav/.


### Unit Tests

## Prerequisites

- Ensure you have downloaded the relevant datasets
- Ensure the root directory name is SPA

## Local Deployment

Assuming the default location for installation of Splunk Enterprise was chosen, direct yourself to
> C:\Program Files\Splunk\etc\apps\\$app-name\$

It is highly recommended that you open the root directory in your favourite editor (e.g. Visual Studio Code). Please note that to make any changes to the codebase locally, you will firstly need to open your editor with administrator permissions.

Start Splunk Enterprise as you normally would. Redirect yourself to the relevant application e.g.
> http://localhost:`<PORT>`/en-US/app/$app-name$

Any changes made to the files in the <b>static</b> directory in the codebase won't be reflected in the application under you redirect to this URL and hit the "Bump Version" button. This will simply refresh the static files in the browser.
> http://localhost:`<PORT>`/en-US/\_bump

Any other changes made will require you to redirect to the following URL. Hit the refresh button on the page to update the browser session.
>http://localhost:`<PORT>`/en-US/debug/refresh

If you haven't already please go through the following tutorial to get comfortable with how Splunk web development operates.
> http://dev.splunk.com/view/webframework-tutorials/SP-CAAAEQ8
