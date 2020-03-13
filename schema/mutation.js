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
                year: {type: new GraphQLNonNull(GraphQLInt)},
                directorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent, args) => {
                const {title, year, directorId} = args;

                // Create and store a new Movie document in db
                const movie = new Movie({title, year, directorId});
                return movie.save();
            }
        },
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const {name} = args;

                // Create and store a new Director document in db
                const director = new Director({name});
                return director.save();
            }
        },
        deleteMovie: {
            type: GraphQLInt,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args) {
                // Using async function because null is returned if the return statement is inside a callback

                // Delete movie record with given id from db
                let result = await Movie.deleteOne({_id: args.id});
                return result.deletedCount;
            }
        }
    }
});

module.exports = Mutation;