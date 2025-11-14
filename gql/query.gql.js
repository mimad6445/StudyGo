const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLBoolean, GraphQLString, GraphQLFloat} = require('graphql')
const { findAllUniversity } = require('../resolvers/university.resolvers')
const { UniversityResultType } = require('./schema.gql')


const QueryType = new GraphQLObjectType({
    name : "Query",
    fields : {
        findAllUniversity : {
            type : new GraphQLList(UniversityResultType),
            resolve : findAllUniversity
        },
        Hello : {
            type : GraphQLString,
            resolve : ()=>{
                return "Hello nI"
            }
        }
    }
})


module.exports = QueryType