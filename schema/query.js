// GraphQL Queries

const {GraphQLObjectType, GraphQLID, GraphQLList} = require('graphql');
const {MovieType, DirectorType} = require('./objectTypes');

// Mongoose models
const Movie = require('../models/movie');
const Director = require('../models/director');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                // Return movie record with given id
                return Movie.findById(args.id);
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                // Return director record with given id
                return Director.findById(args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parent, args) => {
                // Return all the movie records
                return Movie.find().sort({year: 1});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: (parent, args) => {
                // Return all the director records
                return Director.find().sort({name: 1});
            }
        }
    }
});

module.exports = RootQuery;