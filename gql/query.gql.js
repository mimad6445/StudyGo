const {GraphQLObjectType,GraphQLList,GraphQLID, GraphQLBoolean, GraphQLString, GraphQLFloat} = require('graphql')
const { findAllUniversity } = require('../resolvers/university.resolvers')
const { UniversityResultType, DepartmentResultType, YearAcademicResultYear } = require('./schema.gql')
const { getAllDepertement } = require('../resolvers/deparetement.resolvers')
const { getAllSectionByDepartementId } = require('../resolvers/section.resolvers')
const { getAcadimicYearByDepartementId } = require('../resolvers/yearAcadimic.resolvers')


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
        Hello : {
            type : GraphQLString,
            resolve : ()=>{
                return "Hello nI"
            }
        }
    }
})


module.exports = QueryType