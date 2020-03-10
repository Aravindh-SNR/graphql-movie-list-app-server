// GraphQL Mutations

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull} = require('graphql');
const {MovieType, DirectorType} = require('./objectTypes');

// Mongoose models
const Movie = require('../models/movie');
const Director = require('../models/director');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                directorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent, args) => {
                const {title, genre, directorId} = args;

                // Create and store a new Movie document in MongoDB
                const movie = new Movie({title, genre, directorId});
                return movie.save();
            }
        },
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const {name, age} = args;

                // Create and store a new Director document in MongoDB
                const director = new Director({name, age});
                return director.save();
            }
        }
    }
});

module.exports = Mutation;