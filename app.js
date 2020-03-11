const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

// Allow cross-orgin requests
app.use(cors());

// Get MongoDB URI from the config folder
const db = config.get('mongoURI');

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(console.log);

// Use middleware returned by the graphqlHTTP function to respond to requests
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listening for requests on port 4000');
});