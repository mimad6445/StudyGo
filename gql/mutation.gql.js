const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLInt , GraphQLString , GraphQLNonNull ,GraphQLInputObjectType} = require('graphql');
const { createAdmin, loginUser } = require('../resolvers/user.resolvers');
const { AuthPayloadResultType, UniversityResultType, ErrorType, DepartmentResultType } = require('./schema.gql');
const { adminInput, universityInput, departementInput } = require("./input.gql");
const { AddUniversity, DeleteUniversity, UpdateUniversity } = require('../resolvers/university.resolvers');
const { CreateDepartement } = require('../resolvers/deparetement.resolvers');

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
                password : { type : GraphQLString},
                role : { type : GraphQLString }
            },
            resolve : loginUser
        },
        AddUniversity : {
            type : UniversityResultType,
            args :{
                universityInput : { type : universityInput }
            },
            resolve : AddUniversity
        },
        UpdateUniversity : {
            type : UniversityResultType,
            args :{
                universityInput : { type : universityInput }
            },
            resolve : UpdateUniversity
        },
        DeleteUniversity: {
            type : ErrorType,
            args : {
                id : { type : GraphQLID}
            },
            resolve : DeleteUniversity
        },
        CreateDepartement : {
            type : DepartmentResultType,
            args : {
                departementInput : { type : departementInput}
            },
            resolve : CreateDepartement
        }
    },
});

module.exports = Mutation;