GraphQL server for the movie list app at [this repository](https://aravindh-snr.github.io/graphql-movie-list-app/).

The server, built using express-graphql, responds to queries and performs mutations by communicating with MongoDB via Mongoose.

To run the server locally:
1. Clone the respository
2. Install the dependencies by running npm install
3. Install MongoDB locally or create a free cluster in MongoDB Atlas, and assign the URI to the variable db in app.js
4. Run npm start