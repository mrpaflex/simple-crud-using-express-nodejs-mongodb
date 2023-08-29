const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = 2023;
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())




const MongoClient = require("mongodb").MongoClient;

const uril = process.env.DB_String;
const dbname = 'mydbsecond';
const client = new MongoClient(uril);
const db = client.db(dbname);

client.connect();
console.log(`connected to mongodb`);

// async function run(){
//     try{

//        await client.connect();
//        console.log(`connected to mongodb`)

//        //const db = await client.db(dbname)
     
//        console.log('connected to database')

    //    await db.collection('allcollect').insertOne({
    //     UserName: 'imoh',
    //     UserQoutes: 'my wife',
    //     likes: 0
    //    })

//  app.get('/', (req, res)=>{
//     //res.send('hello wicked world... have mercy on me');
//     res.sendFile(__dirname + '/index.html')
//     console.log(`running`)
// })

// await app.post('/sendto', (request, response)=>{
//      db.collection('allcollect').insertOne({
//         UserName: request.body.name,
//         UserQoutes: request.body.qoutes,
//         likes: 0

//     })
//     .then(result =>{
//         console.log('data added to collection')
//          response.redirect('/');
//     })
// })
       
    // } catch (error) {
    //     console.error('Error seeding data:', error);
    //   } finally {
    //     client.close();
    //   }
    
    // finally{
    //     await client.close();
    // }
// }

// run();


// app.get('/', (req, res)=>{
//     //res.send('hello wicked world... have mercy on me');
//     res.sendFile(__dirname + '/index.html')
    
// })



 app.post('/sendto', (request, response)=>{
     db.collection('allcollect').insertOne({
        UserName: request.body.name,
        UserQoutes: request.body.qoutes,
        likes:   0
    })
    .then(result =>{
        console.log('data successfully added to collection')
         response.redirect('/');
    })
    .catch(console.error());
})

app.get('/', (req, res)=>{
    db.collection('allcollect').find().toArray()
    .then(data =>{
        res.render('index.ejs', {info: data} )
        //console.log(data);
    })
    .catch(console.error())
})


app.delete('/deleteOnePerson', (req, res)=>{
    db.collection('allcollect').deleteOne({
        UserName: req.body.useName,
       UserQoutes: req.body.useQoute
    })
    .then(data =>{
        console.log('deleted success')
        res.json('successfull')
    })
    .catch(error => console.error(error))
})

app.put('/addlikeToLikes', (req, res)=>{
    db.collection('allcollect').updateOne({
        UserName: req.body.useName,
        UserQoutes: req.body.useQoute,
        likes: req.body.useLikes,
    }, {
        $set: {
            likes: req.body.useLikes +1
        }
    }, {//this lie of code is actually optional
        sort: {_id: -1},//this is to sort the delete in decending order
        upsert: false //it is to check if the data you want to delete exist,if does'nt exit it automatically create one
    })
    .then(data =>{
        res.json('like added');
    })
    .catch(error => console.error(error))
})

app.put('/removelikeFromLikes', (req, res)=>{
    db.collection('allcollect').updateOne({
        UserName: req.body.useName,
        UserQoutes: req.body.useQoute,
        likes: req.body.useLikes,
    }, {
        $set: {
            likes: req.body.useLikes -1
        }
    }, {//this lie of code is actually optional
        sort: {_id: -1},//this is to sort the delete in decending order
        upsert: false //it is to check if the data you want to delete exist,if does'nt exit it automatically create one
    })
    .then(data =>{
        res.json('like remove');
    })
    .catch(error => console.error(error))
})

app.listen(process.env.port || port, ()=>{
console.log(`i am running on port ${port}, come and fuck me!`);
})