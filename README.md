# g2i-node-sample
The node sample project for g2i interview
https://gist.github.com/severnsc/c0624fb92816c694b3b44a52c3ef59c4

GET /acronym?from=50&limit=10&search=:search
▶ returns a list of acronyms, paginated using query parameters
▶ response headers indicate if there are more results
▶ returns all acronyms that fuzzy match against :search

GET /acronym/:acronym
▶ returns the acronym and definition matching :acronym

GET /random/:count?
▶ returns :count random acronyms
▶ the acronyms returned should not be adjacent rows from the data

POST /acronym
▶ receives an acronym and definition strings
▶ adds the acronym definition to the db

PUT /acronym/:acronym
▶ receives an acronym and definition strings
▶ uses an authorization header to ensure acronyms are protected
▶ updates the acronym definition to the db for :acronym

DELETE /acronym/:acronym
▶ deletes :acronym
▶ uses an authorization header to ensure acronyms are protected

as per instructed from here https://gist.github.com/TejasQ/686e08eeab91f78ea2d946d7766a508c

secondary example to build https://gist.github.com/severnsc/e09f4f8742b7dd91af9c422d6f210a57

## How to run
Navigate to the top level directory in terminal and execute the following.
```
node app.js
```

### How to test
In the postman directory there is an included postman that is fully
setup to execute all the included api endpoints including both the
success and fail cases for authorization on the put and delete
endpoints

Resources

https://github.com/louischatriot/nedb#counting-documents
https://github.com/bajankristof/nedb-promises
https://github.com/afteracademy/nodejs-backend-architecture-typescript
https://expressjs.com/en/guide/using-middleware.html

full jwt example
https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
https://hackernoon.com/setting-up-node-js-with-a-database-part-1-3f2461bdd77f
https://www.sderosiaux.com/articles/2015/02/09/creating-an-api-with-nodejs-expressjs-nedb-and-mongodb/
https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/
https://medium.com/swlh/step-by-step-building-your-first-node-js-project-45489f15aaa1
https://www.freecodecamp.org/news/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2/

```
Hey Ben, 

Thanks so much for your interest in G2i! Based on your application we think that you are a great match for what we're looking for. We would love to invite you to complete our vetting process and join the G2i platform. 

Here are the next steps with a timeline for each: 

- (ASAP) Schedule a call with a member of the Developer Success Team here: https://calendly.com/g2i-developer-success. 
This call is our way of getting to know you and what you're looking for so we can ensure that your experience with G2i is the best it can possibly be. 

- (ASAP) Review the instructions for our code challenge here: https://gist.github.com/severnsc/c0624fb92816c694b3b44a52c3ef59c4 
Feel free to get started on this immediately. You can complete either the React/React Native or Node.js challenge. You do not have to do both. 

- (In 7 days) Upload your completed code challenge at https://code-uploader.g2i.co/code-upload/upload 

After you complete all of the steps and assuming all goes well we will onboard you into G2i and get you set up to find your next job! If you have any questions please let me know by responding to this email. We have dozens of jobs we are looking to fill right now so time is of the essence! 

Thanks, 
Kevin Gordon
{#HS:1458899149-9824#}   
```