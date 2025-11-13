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

const AccountType = new GraphQLObjectType({
    name : "Account",
    fields : ()=>({
        email : { type : GraphQLString },
        emailUniversity : { type : GraphQLString },
        phoneNumber : { type : GraphQLString },
        password: { type : GraphQLString },
        role: { type : GraphQLString },
        isActive: { type : GraphQLString },
        isEmailVerified: { type : GraphQLString },
    })
})

const StudentType = new GraphQLObjectType({
    name : "Student",
    fields : ()=>({
        fullName: { type : GraphQLString },
        StudentCard : { type : GraphQLString },
        dateOfBirth : { type : GraphQLString },
        gender : { type : GraphQLString },
        address : { type : GraphQLString },
        profileImage : { type : GraphQLString },
        bloodGroup : { type : GraphQLString },
        status : { type : GraphQLString },
        userId : { type : AccountType },
        servers : { type : GraphQLList(GraphQLString) }
    })
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

const ModuleType = new GraphQLObjectType({
    name : "Module",
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

const TeacherType = new GraphQLObjectType({
    name : "Teacher",
    fields:()=>({
        fullName: { type : GraphQLString },
        dateOfBirth :{ type : GraphQLString },
        gender : { type : GraphQLString },
        designation : { type : GraphQLString },
        address : { type : GraphQLString },
        profileImage : { type : GraphQLString },
        degree : { type : GraphQLString },
        status : { type : GraphQLString },
        linkedIn : { type : GraphQLString },
        researchArea : { type : GraphQLString },
        bloodGroup : { type : GraphQLString },
        userId : { type : AccountType },
        Modules : { type : ModuleType },
        files : [{ type : mongoose.Types.ObjectId , ref : "file"}],
    })
})

const TeacherResultType = new GraphQLUnionType({
    name : "TeacherResult",
    types : [TeacherType,StudentType],
    resolveType(value){
        if(value.message){
            return 'Error'
        }
        return 'Professeur'
    }
})

const ScheduleType = new GraphQLObjectType({
    name : "Schedule",
    fields :{
        // title: { type: String, required: true },
        // description: { type: String },
        // startTime: { type: Date, required: true },
        // endTime: { type: Date, required: true },
        // sectionId: { type: mongoose.Types.ObjectId, ref: "Section", required: true },
        // files: [{ type: mongoose.Types.ObjectId, ref: "file" }],
    }
})

const yearAcadimicType = new GraphQLObjectType({
    name : "yearAcadmic",
    fields : ()=>({
        startYear: { type : GraphQLInt },
        endYear: { type : GraphQLInt },
        isCurrent: { type : GraphQLInt },
        semester: { type : GraphQLInt },
        // departementId: { type : GraphQLInt },
    })
})

const GroupType = new GraphQLObjectType({
    name : 'Group',
    fields : {
        name: { type : GraphQLString },
        description: { type : GraphQLString },
        members: { type : new GraphQLList(StudentType)},
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
        yearAcadimic : { type : yearAcadimicType },
        System : { type: GraphQLString },
        Niveaux : { type: GraphQLString },
        isSpeciality : { type : GraphQLBoolean },
        professeur : { type : GraphQLList(ProfOfSections)},
        serverId : { type : GraphQLString },
        users : { type : new GraphQLList(StudentType)},
        Groups : { type : new GraphQLList(GroupType)},
        Schedule : { type : ScheduleType },
        files : { type : FileType },
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