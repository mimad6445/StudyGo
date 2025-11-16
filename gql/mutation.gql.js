const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLInt , GraphQLString , GraphQLNonNull ,GraphQLInputObjectType} = require('graphql');
const { createAdmin, loginUser } = require('../resolvers/user.resolvers');
const { AuthPayloadResultType, UniversityResultType, ErrorType, DepartmentResultType, SectionResultType, YearAcademicResultYear, ModuleResultType } = require('./schema.gql');
const { adminInput, universityInput, departementInput, SectionInput, moduleInput } = require("./input.gql");
const { AddUniversity, DeleteUniversity, UpdateUniversity } = require('../resolvers/university.resolvers');
const { CreateDepartement } = require('../resolvers/deparetement.resolvers');
const { CreateSection } = require('../resolvers/section.resolvers');
const { addAcadimicYear } = require('../resolvers/yearAcadimic.resolvers');
const { CreateModule } = require('../resolvers/module.resolvers');

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
                universityId : { type : GraphQLID },
                departementInput : { type : departementInput}
            },
            resolve : CreateDepartement
        },
        CreateSection : {
            type: SectionResultType,
            args : {
                departementId :{ type : GraphQLID },
                SectionInput : { type : SectionInput }
            },
            resolve : CreateSection
        },
        addAcadimicYear : {
            type : YearAcademicResultYear,
            args : {
                startYear : { type : GraphQLString },
                endYear: { type : GraphQLString },
                semester: { type : GraphQLInt },
                departementId: { type : GraphQLID }
            },
            resolve : addAcadimicYear
        },
        CreateModule : {
            type : ModuleResultType,
            args : {
                departementId : { type : GraphQLID },
                moduleInput : { type : moduleInput }
            },
            resolve : CreateModule
        }
    },
});

module.exports = Mutation;