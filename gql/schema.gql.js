const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLUnionType,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLFloat
} = require('graphql');

/* ============================
   BASE TYPES --
============================ */

const ErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: {
        Errorcode: { type: GraphQLInt },
        message: { type: GraphQLString },
    },
});

const PaginationType = new GraphQLObjectType({
    name : "pagination",
    fields : {
        total : { type : GraphQLInt },
        page : { type : GraphQLInt },
        limit : { type : GraphQLInt },
        totalPages : { type : GraphQLInt },
    }
})

const FileType = new GraphQLObjectType({
    name: 'File',
    fields: {
        id : { type : GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        path: { type: GraphQLString },
    },
});

/* ============================
   ACCOUNT / AUTH
============================ */

const AccountType = new GraphQLObjectType({
    name: "Account",
    fields: () => ({
        id : { type : GraphQLID },
        fullName : { type: GraphQLString },
        email: { type: GraphQLString },
        emailUniversity: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLString },
        isActive: { type: GraphQLString },
        isEmailVerified: { type: GraphQLString },
    }),
});

const AuthPayloadType = new GraphQLObjectType({
    name: 'AuthPayload',
    fields: {
        token: { type: new GraphQLNonNull(GraphQLString) },
        user: { type: new GraphQLNonNull(AccountType) },
    },
});

const AuthPayloadResultType = new GraphQLUnionType({
    name: 'AuthPayloadResult',
    types: [AuthPayloadType, ErrorType],
    resolveType(value) {
        if (value.message) {
            return 'Error';
        }
        return 'AuthPayload';
    },
});

/* ============================
   STUDENT
============================ */

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: () => ({
        id : { type : GraphQLID },
        fullName: { type: GraphQLString },
        StudentCard: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        gender: { type: GraphQLString },
        address: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        bloodGroup: { type: GraphQLString },
        status: { type: GraphQLString },
        userId: { type: AccountType },
        servers: { type: new GraphQLList(GraphQLString) }
    })
});

const StudentResultType = new GraphQLUnionType({
    name: 'StudentResult',
    types: [StudentType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return StudentType;
    },
});

/* ============================
   MODULE
============================ */

const ModuleType = new GraphQLObjectType({
    name: "Module",
    fields: {
        id : { type : GraphQLID },
        name: { type : GraphQLString },
        code: { type : GraphQLString }, // optional, e.g., "CS101"
        Coef : { type : GraphQLInt },
        Credites : { type : GraphQLInt },
        VHS : { type : GraphQLInt },
        VHS_Cours: { type : GraphQLFloat },
        VHS_TD: { type : GraphQLFloat },
        VHS_TP: { type : GraphQLFloat },
        Mode_evaluation : { type : new GraphQLObjectType({ name : "ModeEnseignement",fields :{ Continue : { type : GraphQLInt }, Examen : { type : GraphQLInt } } } )},
        Mode_enseignement : { type : GraphQLString },
        Niveau : { type : GraphQLString },
        Semestre : { type : GraphQLString },
        files: { type: new GraphQLList(FileType) }
    }
});

const ModuleResultType = new GraphQLUnionType({
    name: 'ModuleResult',
    types: [ModuleType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return ModuleType;
    }
});

const moduleReturns = new GraphQLObjectType({
    name : "ModulePagination",
    fields : {
        data: { type : new GraphQLList(ModuleType)},
        pagination: { type : PaginationType }
    }
})

const moduleReturnsResult = new GraphQLUnionType({
    name : "ModulePagResult",
    types : [moduleReturns,ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return moduleReturns;
    }
})
/* ============================
   TEACHER
============================ */

const TeacherType = new GraphQLObjectType({
    name: "Teacher",
    fields: () => ({
        id : { type : GraphQLID },
        dateOfBirth: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        address: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        degree: { type: GraphQLString },
        status: { type: GraphQLString },
        linkedIn: { type: GraphQLString },
        researchArea: { type: GraphQLString },
        bloodGroup: { type: GraphQLString },
        userId: { type: AccountType },
        Modules: { type: ModuleType },
        files: { type: new GraphQLList(FileType) },
    })
});

const TeacherResultType = new GraphQLUnionType({
    name: "TeacherResult",
    types: [TeacherType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return TeacherType;
    }
});

/* ============================
   SCHEDULE
============================ */

const ScheduleType = new GraphQLObjectType({
    name: "Schedule",
    fields: {
        title: { type: GraphQLString },
    }
});

/* ============================
   YEAR ACADEMIC
============================ */

const YearAcademicType = new GraphQLObjectType({
    name: "YearAcademic",
    fields: () => ({
        id : { type : GraphQLID },
        startYear: { type: GraphQLInt },
        endYear: { type: GraphQLInt },
        isCurrent: { type: GraphQLInt },
        semester: { type: GraphQLInt },
    })
});

const YearAcademicResultYear = new GraphQLUnionType({
    name : "YearAcadimicResult",
    types: [YearAcademicType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return YearAcademicType;
    }
})

/* ============================
   GROUP
============================ */

const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: {
        id : { type : GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        members: { type: new GraphQLList(StudentType) },
    }
});

/* ============================
   PROF - MODULE - SECTION
============================ */

const Assignments = new GraphQLObjectType({
    name: 'ProfSection',
    fields: {
        id : { type : GraphQLID },
        sectionId : { type : GraphQLID },
        teacher : { type : GraphQLID },
        module : { type : GraphQLID },
        type : { type : GraphQLString }
    }
});

const SectionType = new GraphQLObjectType({
    name: 'Section',
    fields: {
        id : { type : GraphQLID },
        yearAcademic: { type: YearAcademicType },
        System: { type: GraphQLString },
        CapacityMin : { type : GraphQLInt },
        CapacityMax : { type : GraphQLInt },
        Niveaux: { type: GraphQLString },
        isSpeciality: { type: GraphQLBoolean },
        Assignments: { type: new GraphQLList(Assignments) },
        serverId: { type: GraphQLString },
        users: { type: new GraphQLList(StudentType) },
        Groups: { type: new GraphQLList(GroupType) },
        Schedule: { type: ScheduleType },
        files: { type: FileType },
    }
});

const SectionResultType = new GraphQLUnionType({
    name: 'SectionResult',
    types: [SectionType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return SectionType;
    }
});

/* ============================
   ROOM & DEPARTMENT
============================ */

const RoomType = new GraphQLObjectType({
    name: "Room",
    fields: {
        id : { type : GraphQLID },
        name: { type: GraphQLString },
        BuildingName: { type: GraphQLString },
        capacity: { type: GraphQLString },
        type: { type: GraphQLString },
        facilities: { type: new GraphQLList(GraphQLString) }
    }
});

const RoomResultType = new GraphQLUnionType({
    name: "RoomResult",
    types: [RoomType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return RoomType;
    }
});

const DepartmentType = new GraphQLObjectType({
    name: "Department",
    fields: {
        id : { type : GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        location: { type: GraphQLString },
        establishedYear: { type: GraphQLString },
        universityId: { type: GraphQLID },
        rooms: { type: RoomType },
        sections: { type: new GraphQLList(SectionType) },
        modules: { type: new GraphQLList(ModuleType) },
        userId: { type: AccountType },
        yearAcademic : { type : new GraphQLList(YearAcademicType)}
    }
});

const DepartmentResultType = new GraphQLUnionType({
    name: "DepartmentResult",
    types: [DepartmentType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return DepartmentType;
    },
});

/* ============================
   UNIVERSITY
============================ */

const UniversityType = new GraphQLObjectType({
    name: 'University',
    fields: {
        id : { type : GraphQLID },
        name: { type: GraphQLString },
        code: { type: GraphQLString },
        address: { type: GraphQLString },
        logo: { type: GraphQLString },
        establishedYear: { type: GraphQLString },
        emailUniversity: { type: GraphQLString },
        departements: { type: new GraphQLList(DepartmentType) },
    }
});

const UniversityResultType = new GraphQLUnionType({
    name: "UniversityResult",
    types: [UniversityType, ErrorType],
    resolveType(value) {
        if (value.message) return ErrorType;
        return UniversityType;
    },
});

/* ============================
   EXPORTS
============================ */

module.exports = {
    ErrorType,
    AuthPayloadResultType,
    StudentResultType,
    ModuleResultType,
    TeacherResultType,
    SectionResultType,
    DepartmentResultType,
    UniversityResultType,
    StudentType,
    TeacherType,
    ModuleType,
    SectionType,
    UniversityType,
    YearAcademicResultYear,
    moduleReturnsResult,
    RoomResultType
};
