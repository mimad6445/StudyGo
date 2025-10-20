const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLUnionType,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLFloat
} = require('graphql');

const ErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: {
        code : { type: GraphQLInt },
        message: { type: GraphQLString },
    },
});

const FileType = new GraphQLObjectType({
    name : 'file',
    fields : {
        name : { type : GraphQLString },
        type : { type : GraphQLString },
        path : { type : GraphQLString },
    }
})

const StudentType = new GraphQLObjectType({
    name : "Student",
    fields : {
        fullName : { type : GraphQLString },
        StudentCard : { type : GraphQLString },
        email : { type : GraphQLString },
    }
})

const StudentResultType = new GraphQLUnionType({
    name: 'StudentResult',
    types: [StudentType, ErrorType],
    resolveType(value) {
        if (value.message) {
            return 'Error';
        }
        return 'Student';
    },
})

const ProfesseurType = new GraphQLObjectType({
    name : "Professeur",
    fields:{
        fullName : { type : GraphQLString},
        email : { type : GraphQLString},
    }
})

const ProfesseurResultType = new GraphQLUnionType({
    name : "ProfesseurResult",
    types : [ProfesseurType,StudentType],
    resolveType(value){
        if(value.message){
            return 'Error'
        }
        return 'Professeur'
    }
})

const ModuleType = new GraphQLObjectType({
    name : 'Module',
    fields : {
        name: { type: GraphQLString },
        code: { type: GraphQLString }, // optional, e.g., "CS101"
        Coef : { type : GraphQLInt },
        Credites : { type : GraphQLInt },
        files: { type : GraphQLList(FileType)}
    }
})

const ModuleResultType = new GraphQLUnionType({
    name : 'ModuleResult',
    types : [ModuleType, ErrorType],
    resolveType(value){
        if(value.message){
            return 'Error'
        }
        return 'Module'
    }
})

const ProfOfSections = new GraphQLObjectType({
    name : 'ProfSection',
    fields : {
        data : { type : ProfesseurType },
        module : { type : ModuleType}
    }
})

const SectionType = new GraphQLObjectType({
    name : 'Section',
    fields :{
        yearAcadimic : { type : GraphQLString },
        System : { type: GraphQLString },
        Niveaux : { type: GraphQLString },
        isSpeciality : { type : GraphQLBoolean },
        professeur : { type : GraphQLList(ProfOfSections)},
        serverId : { type : GraphQLString }
    }
})

const SectionResultType = new GraphQLUnionType({
    name : 'SectionResult',
    types : [SectionType,ErrorType],
    resolveType(value){
        if(value.message){
            return 'Error'
        }
        return 'Section'
    }
})

const depertamentType = new GraphQLObjectType({
    name : "Departement",
    fields : {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        location : { type : GraphQLString },
        sections : { tupe : GraphQLList(SectionType)},
        email : { type: GraphQLString },
        password : { type: GraphQLString }
    }
})

const departementResultType = new GraphQLUnionType({
    name : "DepartementResult",
    types : [depertamentType , ErrorType],
    resolveType(value) {
        if (value.message) {
            return 'Error';
        }
        return 'Departement';
    },
})

const UniversityType = new GraphQLObjectType({
    name : 'University',
    fields : {
        name : { type : GraphQLString },
        code: { type: GraphQLString },
        address : { type : GraphQLString },
        phoneNumber : { type : GraphQLString },
        logo : { type : GraphQLString },
        emailUniversity : { type : GraphQLString },
        email : { type : GraphQLString },
        password : { type : GraphQLString }
    }
})

const UniversityResultType = new GraphQLUnionType({
    name : "UniversityResult",
    types: [UniversityType, ErrorType],
    resolveType(value) {
        if (value.message) {
            return 'Error';
        }
        return 'University';
    },
})


module.exports = {
    UniversityResultType,
    departementResultType,
    SectionResultType,
    ModuleResultType,
    ProfesseurResultType,
    StudentResultType
}