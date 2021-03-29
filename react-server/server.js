// Imports
const express = require('express');
const multiparty = require('multiparty');
const app = express();
const port = 5000;
const cors = require('cors');
// const fs = require('fs');
const fs = require('fs-extra')
const folder = './files/';
// CORS configurations
app.use(cors());
// Endpoints
app.post('/upload', (req, res) => {
    // initiate multiparty
    const form = new multiparty.Form();
    
    // parse req form data
    return form.parse(req, (err, fields, files) => {
        // error handling
        if (err) {
             return res.status(400).send({error: err });
        }
  
        // path
        const { path } = files.file[0];
   
        // get the temp file name from the tmp folder
//        let filename = path.split('/');
        let filename = path.split('\\');
        filename = filename[filename.length - 1];
        console.log("filename="+filename);
        console.log("folder="+folder);
        // move file into folder
        // return fs.rename(path, `${folder}${filename}`, error => {
        //      // error handling for moving
        //      if (error) {
        //           return res.status(400).send({ error });
        //      }
        //      return res.status(200).send({ file: filename });
        // });
        return fs.move(path, `${folder}${filename}`, function (err) {
            if (err) return console.error(err)
            console.log("success!")
           })
    });
});
// Listen
app.listen(port, () => console.log(`Listening on port ${port}`));