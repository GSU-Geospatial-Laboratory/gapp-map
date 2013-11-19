# Greater Atlanta Pollinator Partnership Map

This application allows interested users to collect and submit location information on pollinator gardens in the Atlanta area.

### Application Framework

This is a full stack JavaScript application, with the frontend functioning as a single page app.

#### Backend

The application uses nodejs and mongodb as a backend.  The backend primarily consists of an api which services the single page app.  Users can add pollinator gardens which are then stored in mongodb.  Images can also be attached to pollinator gardens.  These are stored on Amazon S3.  The application is setup to be hosted on Heroku

#### Frontend

The frontend consists of a single page mapping application built on AngularJS and LeafletJS.  Routes are controlled in public/js/app.js.  Controllers for specific actions are in public/js/controllers.js . 

This project utilizes grunt for build.

Run

    grunt

to concatenate and minify javascript
