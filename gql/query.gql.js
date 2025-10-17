const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLBoolean, GraphQLString, GraphQLFloat} = require('graphql')


const QueryType = new GraphQLObjectType({
    name : "Query",
    fields : {

    }
})


module.exports = QueryType