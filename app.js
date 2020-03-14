const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow cross-orgin requests
app.use(cors());

// Use middleware returned by the graphqlHTTP function to respond to requests
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// MongoDB connection string
const db = process.env.mongoURI;

// Connect to MongoDB using Mongoose
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.listen(process.env.PORT || 3000);