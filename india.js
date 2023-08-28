const MongoClient = require('mongodb').MongoClient;

// Connection details
const mongoUri = 'mongodb+srv://ukosaviour21:password@cluster0.j4lrdgf.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'paflexfirstDb';
const collectionName = 'mycollection';
const client = new MongoClient(mongoUri);
//const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// Sample data to seed
const sampleData = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Alice', age: 25, city: 'Los Angeles' },
  { name: 'Bob', age: 40, city: 'Chicago' }
];

async function seedData() {
  //const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    // Insert data into the collection
    await collection.insertMany(sampleData);
    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    client.close();
  }
}

seedData();