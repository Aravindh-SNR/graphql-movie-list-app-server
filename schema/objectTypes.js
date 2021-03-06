// GraphQL Custom Object Types

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');

// Mongoose models
const Movie = require('../models/movie');
const Director = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        year: {type: GraphQLInt},
        director: {
            type: DirectorType,
            resolve: (parent, args) => {
                // Return director of the given movie
                return Director.findById(parent.directorId);
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parent, args) => {
                // Return list of movies directed by the given director
                return Movie.find({directorId: parent.id}).sort({year: 1});
            }
        }
    })
});

module.exports = {MovieType, DirectorType};