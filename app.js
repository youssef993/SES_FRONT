const { ObjectId } = require('bson');
const express = require('express');
var formidable = require('formidable');

var fs = require('fs');
//PATH OBJECT 
const path = require('path')
const app = express();
const port = 8070;
var url = 'mongodb://localhost:27017'
/******************APP USING************************ */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authenticated");
  res.header('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});


/**********
 ********************** SECURITY APPLICATION
 */
/*******************Login System******************* */
function  requireLogin(req, resg, next) {

  const token = req.headers.authenticated;

console.log(token);
      var MongoClient = require('mongodb').MongoClient;
  
      MongoClient.connect(url,function(err,db){
          if (err) {
              throw err;
          }
  
          var dbo = db.db('SIAMEDB');
  
          dbo.collection('users').findOne({ _id:ObjectId(token) },function(err,response){
            console.log(response);
            
            if (response) {
                

                next();
            } else {
                resg.send({ success:false, message:'access denied' })
            }

          })
        })}
/****************** apply the `requireLogin` middleware to all*********** */
app.all("/app/*", requireLogin, function(req, res, next) {
  next();
});
/*************************ADD USER****************************** */
app.post('/app/users', (req,res) =>{ 
  let body = [];
  let requestBody = {};
  req.on('data', (chunk) => {
      body.push(chunk);
  }).on('end', () => {
      body = Buffer.concat(body).toString();
      try {
          requestBody = JSON.parse(body);
          data = requestBody;
          console.log(data);
          var resonse = { success: true, data: requestBody }
          var MongoClient = require('mongodb').MongoClient;
          MongoClient.connect(url, function (err, db) {
              if (err) {
                  throw err;
              }
              var dbo = db.db('SIAMEDB');
              dbo.collection('users').insertOne(data, function (err, resi) {
                  if (err) throw err;
                  console.log("1 data inserted");

                  res.send(resonse);
              })

          })
      } catch (err) {

      } })


});

/*******************************AUTHENTIFIER************ */
app.post('/auth', (req,res) =>{
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

  let body = [];
  let requestBody = {};

  req.on('data', (chunk) => {
      body.push(chunk);
  }).on('end', () => {
      body = Buffer.concat(body).toString();
      try {
          requestBody = JSON.parse(body);
          console.log(requestBody);

          var email = requestBody.email;
          var password = requestBody.password;


          var MongoClient = require('mongodb').MongoClient;
          var url = 'mongodb://localhost:27017';

          MongoClient.connect(url, function (err, db) {
              if (err) {
                  throw err;
              }

              var dbo = db.db('SIAMEDB');
              console.log("ddddddddd"+dbo);

              dbo.collection('users').findOne({ email: email, password: password },(err, response)=> {
                console.log(response);
                  if (response) {
                    console.log(response);
                      res.send({ success: true, token: response._id, role: response.role })
                  } else {
                    console.log("errrr");
                      res.send({ success: false, token: null })
                  }



              })
          })





      } catch (e) {

      }

  })


});
/**************************************list user************* */
app.get('/app/listuser',(req,res)=>{
  const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err);
      }
      dbo= db.db('SIAMEDB');
      dbo.collection('users').find().toArray((err,resf)=>{
        res.send(resf);
      })
    })
})
/*********************UpdateUser********************* */
app.put("/app/updateUser",(req,res)=>{
  body=[];
  reqbody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  }).on('end',()=>{
    body = Buffer.concat(body).toString();
    reqbody= JSON.parse(body);
    const id= reqbody.id;
    const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if (err) {
        throw(err);
      }
      dbo = db.db('SIAMEDB');
      
          dbo.collection('users').updateOne({_id: ObjectId(id)},{$set: reqbody},(err,resu)=>{
            res.send({message:"object updated"});
          })
        })
     
  })
})
/******************DeleteUser************************* */
app.delete('/app/deleteUser/:id',(req,res)=>{
  id=req.params.id
  console.log(id);
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
   
        dbo.collection('users').deleteOne({_id:ObjectId(id)},(err,resd)=>{
          res.send({success:true,message:'object deleted'});
        })
      
   
})})
/**********
 ********************** SECURITY APPLICATION
 */

 
/**********
 ********************** APPLICATION
 */
/******************Add COMPSANT************************ */
app.post ('/app/ajout', (req, res)=>{
  var body=[]
  var reqBody={}
  req.on('data',(chunk)=>{
    body.push(chunk);}).on('end',()=>{
      body = Buffer.concat(body).toString();
      reqBody=JSON.parse(body);
      var obj= {
        article: reqBody.article,
        ID1 : reqBody.ID1,
        disp : true,
      }
      var data =obj;
      resp={success : true, data: obj} ;
      var ID1=reqBody.ID1;
      const {MongoClient} =require('mongodb');
        MongoClient.connect(url,(err,db)=>{
        if(err){ throw(err)}
        dbo =db.db('SIAMEDB');
        dbo.collection('composants').findOne({ID1:ID1},(err,resfo)=>{
          if(resfo){
            res.send({success:false,message:'ID1 existant!!!'});
          }else{dbo.collection('composants'). insertOne(obj, (err, resI)=>{ res.send(resp);})}
        })        
      })})})
      /******************UPDATE COMPOSANT************************ */
app.put('/app/update',(req,res)=>{
  body =[]; 
  reqbody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  } ).on('end',()=>{
    body=Buffer.concat(body).toString();
    reqbody=JSON.parse(body);
    id= reqbody.id;
    disp = reqbody.disp;
   if(disp) {
     const{MongoClient}=require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err)
      }
      reqbody.disp = false;
      dbo=db.db('SIAMEDB');
      dbo.collection('composants').updateOne({_id:ObjectId(id)},{$set:reqbody},(err,resu)=>{
        res.send({success:true,message:'object updated'})
      })      
    })}else{
      res.send({success:false,message:'OBJECT COULD NOT UPDATED!!!'})
    }
  })
})
/********************DELETE COMPOSANT************************ */
app.delete('/app/delete/:id',(req,res)=>{
  id=req.params.id
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
    dbo.collection('composants').findOne({_id:ObjectId(id)},(err,resf)=>{console.log(resf);
      if(resf){
        dbo.collection('composants').deleteOne({_id:ObjectId(id)},(err,resd)=>{
          res.send({success:true,message:'object deleted'});
        })
      }else{
        res.send({success:false,message:'object dosen t exist!!!'});
      }
  
  }) 
})})
/**************ADD PRODUIT ORIGINE********************* */
app.post('/app/produitor',(req,res)=>{
  body=[];
  reqbody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  }).on('end', ()=>{
    body= Buffer.concat(body).toString();
    reqbody= JSON.parse(body);
    obj={
      produit: reqbody.produit,
      id3: null,
      composants: [],
      ordreDeFabrication:null,
      statut: null
    }
    data = obj;
    const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      
      dbo = db.db('SIAMEDB');
      dbo.collection('produit').findOne({produit:obj.produit},(err,resf)=>{
        if(resf){
          res.send({success:false, message:"PRODUIT EXISTENT!!!"})
        }else{
          dbo.collection('produit').insertOne(obj, (err, resi)=>{
            console.log(obj);
            res.send({success: true, message: "object added"})
        
      })
        }
      })
      
})

  })
})
/*******************GET LIST PRODUIT ORIGINE************************ */
app.get('/app/listproduit',(req,res)=>{
  const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err);
      }
      dbo= db.db('SIAMEDB');
      dbo.collection('produit').find({statut: null}).toArray((err,resf)=>{
        res.send(resf);
      })
    })
})
/******************DELETE PRODUIT ORIGINE******************* */
app.delete('/app/app/deleteprod/:id',(req,res)=>{
  id=req.params.id
  console.log(id);
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
    dbo.collection('produit').findOne({_id:ObjectId(id)},(err,resf)=>{console.log(resf);
      if(resf){
        dbo.collection('produit').deleteOne({_id:ObjectId(id)},(err,resd)=>{
          res.send({success:true,message:'object deleted'});
        })
      }else{
        res.send({success:false,message:'object dosen t exist!!!'});
      }
  
  }) 
})})
/***************ADD PRODUIT Encours******************** */
app.post('/app/addprod',(req,res)=>{
  console.log("add prod");
  body= [];
  reqBody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  }).on('end',()=>{
    body= Buffer.concat(body).toString();
    reqBody= JSON.parse(body);
    obj={
      produit: reqBody.produit,
      id3: null,
      composants: [],
      ordreDeFabrication:reqBody.ordreDeFabrication,
      statut: 'encours'
    }
    data = obj;
   if(obj.ordreDeFabrication!= null) {const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if (err) {
        throw(err);
      }
      dbo = db.db('SIAMEDB');
      dbo.collection('produit').insertOne(obj, (err, resi)=>{
        res.send({success: true, data: obj});
      })

    })
  }else{
    res.send({success: false, message: 'of could not be null!!!'});
  }
  })
})
/*****************AFFECT COMPONENTS To OF***************** */
app.put('/app/updcompprod/:ID1',(req,res)=>{
  ID1= req.params.ID1;
  const {MongoClient} = require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){
      throw(err);
    }
    dbo = db.db('SIAMEDB');
    dbo.collection('composants').findOne({ID1: ID1, disp: true},(err,resf)=>{
      if(resf){
        resf.disp = false
        dbo.collection('composants').updateOne({ID1: ID1},{$set:resf},(err,resu)=>{
          console.log('object updated');
        })
        var body=[]
        var reqBody={}
        req.on('data',(chunk)=>{
           body.push(chunk);}).on('end',()=>{
            body= Buffer.concat(body).toString();
            reqBody= JSON.parse(body);
            id= reqBody.id;
            ID3= reqBody.id3;
                        
            if(ID3){
              resf.disp = true
              dbo.collection('composants').updateOne({ID1: ID1},{$set:resf},(err,resu)=>{
                res.send({success: false, message:'ID3 EXIST COULD NOT ADD DATA'})
              })
            }else{
              console.log(resf);
              reqBody.composants.push(resf);            
            dbo.collection('produit').updateOne({_id:ObjectId(id)}, {$set: reqBody},(err,resu)=>{
              res.send({success: true, message:'composant inserted'})
            })}
           })
      }else{
        res.send({success:false, message:'composant inexitent ou affecter!!!!'})
      }
    })
  })

})
/****************VERIFY COMPOSANTS OF******************* */
app.get('/app/verifsn/:of/:sn',(req,res)=>{
  var of = req.params.of
  var sn= req.params.sn
  if(of != null && sn != null){
    const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw (err);
      }
      dbo = db.db('SIAMEDB');
      dbo.collection('produit').findOne({ordreDeFabrication: of},(err,resf)=>{
        if(resf){
          const comp = resf.composants.find(comp => comp.ID1 == sn );
          if(comp){
            res.send({success: true, message:"component exist!!!"})
          }else{
            res.send({success: false, message:"component dosent exist, please verify your sn!!!"})
          }
        }else{
          res.send({success: false, message:"of dosent exist, please verify your of!!!"})
        }
      })
    })
  
  }else{
    res.send({success: false, message:"OF OR SN NOT VALIDE!!!, PLEASE ENTER AGAIN"})
  }
})
/*********************GET LIST PRODUITS En cours******************************* */
app.get('/app/encours',(req,res)=>{
  const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err);
      }
      dbo= db.db('SIAMEDB');
      dbo.collection('produit').find({statut: 'encours'}).toArray((err,resf)=>{
        res.send(resf);
      })
    })
})
/***********************GET By Produit And OF******************************** */
app.get('/app/verification/:of',(req,res)=>{
  var of = req.params.of
  const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if(err){
        throw(err);
      }
      dbo= db.db('SIAMEDB');
      dbo.collection('produit').findOne({of:of, statut: 'encours'},(err,resf)=>{
        res.send(resf);
      })
    })
})
/***********************UPLOAD IMG**************************** */
app.post("/upload/:imgname", (req, res, next) => { 

    var imgName = req.params.imgname.toString();
                 const form = new formidable.IncomingForm(); 
                    form.parse(req, function(err, fields, files){ 
                      console.log(files);

                        var oldPath = files.operationImg.path; 
                        files.operationImg.name = imgName;
                        var newPath = path.join(__dirname, '/siamefront/public')+ '/'+files.operationImg.name 
                        console.log("iiiiiiiiiiiii");
                        var rawData = fs.readFileSync(oldPath) 
                    
                        fs.writeFile(newPath, rawData, function(err){ 
                            if(err) console.log(err)  
                            return res.send("Successfully uploaded");
                            
                        }) 
                })
}); 
/****************ADD OPERATION**********************/
app.post("/app/ajoutop",(req,res)=>{
  body=[];
  reqbody={};
  console.log("ajout op working");
  req.on('data',(chunk)=>{
    body.push(chunk);
  }).on('end',()=>{
    body= Buffer.concat(body).toString();
    reqbody=JSON.parse(body);
    obj={
      operation:reqbody.operation,
      produit:reqbody.produit,
      of: null,
      imagepath:reqbody.produit+reqbody.operation+reqbody.ordre,
      ordre:reqbody.ordre,
      touv:null,
      tfer:null
    }
    const {MongoClient}= require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if (err) {
        throw(err);
      }
      dbo=db.db('SIAMEDB');
      dbo.collection('operation').findOne({ordre: reqbody.ordre, produit: reqbody.produit},(err, resf)=>{
        if(resf){
          res.send({success: false, message: "order exist in "+reqbody.produit+ "!!!"})
        }else{
          dbo.collection('operation').insertOne(obj,(err,resi)=>{
            res.send({success:true, message:'insertion avec succ'})
          })
        }
      })
      
    })
  }) 
})
/************UPDATE OPERATION*************** */
app.put("/app/modfop",(req,res)=>{
  body=[];
  reqbody={};
  req.on('data',(chunk)=>{
    body.push(chunk);
  }).on('end',()=>{
    body = Buffer.concat(body).toString();
    reqbody= JSON.parse(body);
    const id= reqbody.id;
    const {MongoClient} = require('mongodb');
    MongoClient.connect(url,(err,db)=>{
      if (err) {
        throw(err);
      }
      dbo = db.db('SIAMEDB');
      dbo.collection('operation').findOne({ordre: reqbody.ordre, produit: reqbody.produit,of: null},(err, resf)=>{
        console.log(resf);
        if(resf && resf._id != id){
          res.send({success: false, message: "order exist in "+reqbody.produit+ "!!!"})
        }else{
          dbo.collection('operation').updateOne({_id: ObjectId(id)},{$set: reqbody},(err,resu)=>{
            res.send({message:"object updated"});
          })
        }
      })
    })
  })
})
/*******************DELETE OPERATION*********************** */
app.delete('/app/deleteop/:id',(req,res)=>{
  id=req.params.id
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
    dbo.collection('operation').findOne({_id:ObjectId(id)},(err,resf)=>{console.log(resf);
      if(resf){
        dbo.collection('operation').deleteOne({_id:ObjectId(id)},(err,resd)=>{
          res.send({success:true,message:'object deleted'});
        })
      }else{
        res.send({success:false,message:'object dosen t exist!!!'});
      }
  
  }) 
})})
/***********************GET PRODUIT BY NOM AND OF******************************* */
app.get('/app/production/:produit/:of',(req,res)=>{
  produit= req.params.produit;
  of= req.params.of;
  const  {MongoClient}= require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if (err) {
      throw(err)
    }
    dbo = db.db('SIAMEDB');
    dbo.collection('operation').findOne({of: of},(err,resfo)=>{
      if(resfo){
        dbo.collection('operation').find({produit: produit, of:of, tfer:null}).sort( { ordre: 1 } ).toArray((err,resf)=>{
          res.send(resf);
        })
      }else{
        dbo.collection('operation').find({produit: produit, of:null}).toArray((err,resf)=>{
          resf.map((ope)=>{
            obj={
              operation:ope.operation,
              produit:ope.produit,
              of: of,
              imagepath:ope.imagepath,
              ordre:ope.ordre,
              touv:null,
              tfer:null
            }
            dbo.collection('operation').insertOne(obj,(err,resi)=>{
              console.log("inserted!!!");
            })
          })
      })
      dbo.collection('operation').find({produit: produit, of:of, tfer:null}).sort( { ordre: -1 } ).toArray((err,resf)=>{
        res.send(resf);
      })
    }
  })
  })
})
/******************************Suivie prod************************** */
app.get('/app/Suivieproduction/:produit/:of',(req,res)=>{
  produit= req.params.produit;
  of= req.params.of;
  const  {MongoClient}= require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if (err) {
      throw(err)
    }
    dbo = db.db('SIAMEDB');
        dbo.collection('operation').find({produit: produit, of:of}).sort( { ordre: 1 } ).toArray((err,resf)=>{
          res.send(resf);
        })
  })
})

/****************GET OPERATION ORIGINE********************** */
app.get('/app/listop/:produit',(req,res)=>{
  produit= req.params.produit;

  const  {MongoClient}= require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if (err) {
      throw(err)
    }
    dbo = db.db('SIAMEDB');
   
      dbo.collection('operation').find({produit: produit, of:null}).sort( { ordre: 1 } ).toArray((err,resf)=>{
        res.send(resf);
      })
    
  })
})

/***************GET OPERATION AND AFFECT START DATE*************** */
app.get('/app/productionOperation/:id',(req,res)=>{
  id= req.params.id;
  tou= Date();
  obj={
    touv: tou
  }
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
    dbo.collection('operation').updateOne({_id:ObjectId(id)},{$set: obj},(err,resf)=>{
      console.log(resf);
    })
        dbo.collection('operation').findOne({_id:ObjectId(id)},(err,resd)=>{
          res.send(resd);
        })
     
  
  }) 
})
/**********************UPDATE OPERATION BY SETTING END DATE*************************************** */
app.put('/app/productionoperation/:id',(req,res)=>{
  id= req.params.id;
  tfe= Date();
  obj={
    tfer: tfe
  }
  const{MongoClient}=require('mongodb');
  MongoClient.connect(url,(err,db)=>{
    if(err){throw(err)}
    dbo=db.db('SIAMEDB');
    dbo.collection('operation').updateOne({_id:ObjectId(id)},{$set: obj},(err,resf)=>{
      res.send({success:true, message:"Object updated!!!"});
    })
})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})