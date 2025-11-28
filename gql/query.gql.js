const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLBoolean, GraphQLString, GraphQLInt} = require('graphql')
const { findAllUniversity } = require('../resolvers/university.resolvers')
const { UniversityResultType, DepartmentResultType, YearAcademicResultYear, moduleReturnsResult, TeacherResultType } = require('./schema.gql')
const { getAllDepertement } = require('../resolvers/deparetement.resolvers')
const { getAllSectionByDepartementId, getAllSectionByDepartementIdNiveau } = require('../resolvers/section.resolvers')
const { getAcadimicYearByDepartementId } = require('../resolvers/yearAcadimic.resolvers')
const { getAllModules } = require('../resolvers/module.resolvers')
const { getAllProfeseurByDepartementId } = require('../resolvers/profeseur.resolvers')


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
        getAllSectionByDepartementId: {
            type : DepartmentResultType,
            args:{
                departementId : { type : GraphQLID},
                AcadimicYearId: { type : GraphQLID},
            },
            resolve : getAllSectionByDepartementId
        },
        getAcadimicYearByDepartementId : {
            type : new GraphQLList(YearAcademicResultYear),
            args : {
                deparetementId : { type : GraphQLID }
            },
            resolve : getAcadimicYearByDepartementId
        },
        getAllModules : {
            type : moduleReturnsResult,
            args : {
                page : { type : GraphQLInt } ,
                limit : { type : GraphQLInt } ,
                departementId : { type : GraphQLID }
            },
            resolve : getAllModules
        },
        getAllProfeseurByDepartementId : {
            type: new GraphQLList(TeacherResultType),
            args: {
                departementId: { type: GraphQLID },
                page: { type: GraphQLInt },
                limit: { type: GraphQLInt }
            },
            resolve: getAllProfeseurByDepartementId
        },
        getAllSectionByDepartementIdNiveau: {
            type : DepartmentResultType,
            args:{
                departementId : { type : GraphQLID},
                AcadimicYearId: { type : GraphQLID},
                Niveaux : { type : GraphQLString},
            },
            resolve : getAllSectionByDepartementIdNiveau
        },
    }
})


module.exports = QueryType