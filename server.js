const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const port = 2023;
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())

//require('dotenv').config()


const MongoClient = require("mongodb").MongoClient;

const uril = "mongodb+srv://ukosaviour21:hQbvrVWTg19DcavX@cluster0.j4lrdgf.mongodb.net/?retryWrites=true&w=majority";
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



app.listen(process.env.port || port, ()=>{
console.log(`i am running on port ${port}, come and fuck me!`);
})