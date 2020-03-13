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

// Connect to MongoDB using Mongoose
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Use middleware returned by the graphqlHTTP function to respond to requests
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT || 3000);