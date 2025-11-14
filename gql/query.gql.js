const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLBoolean, GraphQLString, GraphQLFloat} = require('graphql')
const { findAllUniversity } = require('../resolvers/university.resolvers')
const { UniversityResultType, DepartmentResultType } = require('./schema.gql')
const { getAllDepertement } = require('../resolvers/deparetement.resolvers')


const QueryType = new GraphQLObjectType({
    name : "Query",
    fields : {
        findAllUniversity : {
            type : new GraphQLList(UniversityResultType),
            resolve : findAllUniversity
        },
        getAllDepertement : {
            type : new GraphQLList(DepartmentResultType),
            resolve : getAllDepertement
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