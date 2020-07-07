# XML Endpoint parallel hitter
## Description
A Little tool that I developed in a project where I needed to hit an endpoint 'n' times in parallel and save de response from the endpoint in a DB.


## Languagues & Tools
- Node.js
- NPM
- Typescript
- NestJS
- Docker


## How to Use

 1. Run `npm i` in the root path of the project.
 2. Run `docker-compose up -d` 
 3. `Modify/Add` your `xml` request in the `input_files` folder
 4. `Modify` the `xml` names at the file `xml-files-names.txt` in the `input_files`
 5. Run the backend of the project with `npm start`
 6. Do a get to hostname:3000/test
 7. Check for the responses of the requests in a mongo db client
