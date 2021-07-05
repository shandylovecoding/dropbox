const express = require('express')
const upload = require('express-fileupload')
const app = express();


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(upload())

app.use(express.static("public"))

const db = []


app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  db.push(req.files.sampleFile.name)

  console.log(req.files);
  // const file = new File(req.files)
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);  
  });
  res.redirect('/')
});

app.listen(8000,()=>{
    console.log("listen to the port")
})