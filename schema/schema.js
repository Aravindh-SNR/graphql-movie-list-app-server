const graphql = require('graphql');

const {GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema} = graphql;

// dummy data
const movies = [
    {id: 1, title: 'Avengers', genre: 'Superhero', directorId: 1},
    {id: 2, title: 'Avengers: Age of Ultron', genre: 'Superhero', directorId: 1},
    {id: 3, title: 'Avengers: Infinity War', genre: 'Superhero', directorId: 1},
    {id: 4, title: 'Avengers: Endgame', genre: 'Superhero', directorId: 1},
    {id: 5, title: 'Logan', genre: 'Drama', directorId: 2},
    {id: 6, title: 'Ford v Ferrari', genre: 'Sports', directorId: 2},
    {id: 7, title: 'Fight Club', genre: 'Action', directorId: 3},
    {id: 8, title: 'Seven', genre: 'Crime', directorId: 3}
];

const directors = [
    {id: 1, name: 'Joss Whedon', age: 55},
    {id: 2, name: 'James Mangold', age: 56},
    {id: 3, name: 'David Fincher', age: 57}
];

const Movie = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: Director,
            resolve(parent, args) {
                return directors.find(director => director.id === parent.directorId);
            }
        }
    })
});

const Director = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(Movie),
            resolve(parent, args) {
                return movies.filter(movie => movie.directorId === parent.id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movie: {
            type: Movie,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id === Number(args.id));
            }
        },
        director: {
            type: Director,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id === Number(args.id));
            }
        },
        movies: {
            type: new GraphQLList(Movie),
            resolve(parent, args) {
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(Director),
            resolve(parent, args) {
                return directors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});