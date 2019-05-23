const express = require("express");
const upload = require("./upload");
const cors = require("cors");

const path =require('path');
const multer =require('multer');
const fs = require('fs');


const server = express();
__dirname = 'C:/Users/LuiggiVargas/Documents/AMDconsultores/SUNASS-ULTIMOSCAMBIOS/server/subidas/';

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post("/upload", upload);

let storage = multer.diskStorage({
  destination:(req,file,cb)=>{

    var indexFoler = file.originalname.indexOf( '_' ); 
    var folder = file.originalname.substring( 0, indexFoler );
    cb(null,'./subidas/'.concat( folder, '/' ))
  },
  filename:(req, file,cb)=>{
    cb(null, Date.now()+'-'+file.originalname);
  }
});
const subidas = multer({storage});

server.post('/subir', subidas.single('file'), (req, res) => {
  console.log( req );
  return res.send(req.file);
})

server.get('/ver/:carpeta', function(req, res, next) {
  carpeta =req.params.carpeta;
   fs.readdir(`./subidas/${carpeta}`, function(err, files) {
  console.log(files);
  res.json(files)       
  });
});

server.get('/bajar/:carp/:id', function(req,res,next){
  filename =req.params.id;
  carpeta =req.params.carp;
  filepath = __dirname+'/'+carpeta+'/'+filename;
  res.sendFile(filepath);

});


server.delete('/:carp/:id',  (req, res) => {
  filename =req.params.id;
  carpeta =req.params.carp;
  fs.unlink(__dirname+carpeta+'/'+filename, (err) => {
    if (err) throw err;
    res.json(true) 

  });
  });

server.listen(8000, () => {
  console.log("Server started!");
});

