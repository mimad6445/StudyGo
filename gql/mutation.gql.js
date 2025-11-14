const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLInt , GraphQLString , GraphQLNonNull ,GraphQLInputObjectType} = require('graphql');
const { createAdmin, loginUser } = require('../resolvers/user.resolvers');
const { AuthPayloadResultType, UniversityResultType } = require('./schema.gql');
const { adminInput } = require("./input.gql");
const { AddUniversity } = require('../resolvers/university.resolvers');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createGoatAdmin:{
            type :AuthPayloadResultType,
            args : {
                admin : { type: adminInput }
            },
            resolve : createAdmin
        },
        loginUser : {
            type : AuthPayloadResultType,
            args : {
                email : { type : GraphQLString },
                password : { type : GraphQLString}
            },
            resolve : loginUser
        },
        AddUniversity : {
            type : UniversityResultType,
            args :{

            },
            resolve : AddUniversity
        }
    },
});

module.exports = Mutation;