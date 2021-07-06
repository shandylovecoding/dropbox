const express = require('express')
const fs =require('fs')
const upload = require('express-fileupload');
const path = require('path')
const app = express();


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(upload())

app.use(express.static("public"))
app.use(express.static("uploads"))

const uploadDir =__dirname + path.sep+ 'uploads';
console.log(uploadDir);

let db = []
let caches = {}

function writeFile(name, body){
  return new Promise((resolve,reject)=>{
    fs.writeFile(uploadDir+path.sep+name,body,(err)=>{
      if(err){
        return reject(err)
      }else{
        resolve(name)
      }
    })
  }).then(readFile)
}

function readFile(file){
  return new Promise((resolve,reject)=>{
    fs.readFile(uploadDir + path.sep + file,(err,body)=>{
      if(err){
        return reject(err)
      }else{
        resolve(body)
      } 
    })
  })
}

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})


// app.post('/upload', function(req, res) {
//   let sampleFile;
//   let uploadPath;
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//   db.push(req.files.sampleFile.name)

//   // const file = new File(req.files)
//   sampleFile = req.files.sampleFile;
//   uploadPath = __dirname + '/uploads/' + sampleFile.name;

//   sampleFile.mv(uploadPath, function(err) {
//     if (err)
//       return res.status(500).send(err);  
//   });
//   res.redirect('/')
// });
app.post('/upload',(req,res)=>{
  console.log(req.files.sampleFile.name);
  console.log("File Uploading..");
  let fileName =req.files.sampleFile.name
  let fileData =req.files.sampleFile.data

  caches[fileName] = writeFile(fileName, fileData)
  caches[fileName]
    .then(()=>{
      console.log("FileName",fileName);
      console.log("FileData", caches[fileName]);
      res.cookie(fileName, caches[fileName])
      console.log(caches);
      res.redirect('/')
    })

})

app.get('/files', (req,res)=>{
  res.status(200).send(caches)
})

app.get('/upload/:id',function(req,res){
res.sendFile(__dirname+`/uploads/${req.params.id}`)
})

app.get('/download/:id', function(req, res){
  var id = req.params.id;
  res.download(__dirname + '/uploads/' +id)
})

app.get('/delete/:id', function(req, res){
  var id = req.params.id;
  let uploadPath = __dirname + '/uploads/' +id
  console.log(caches[id]);
  // db.splice(db.indexOf(id),1)
  delete caches[id]
  fs.unlink(uploadPath, function() { 
    res.redirect('/')
  })   
})

app.listen(8000,()=>{
    console.log("listen to the port")
})