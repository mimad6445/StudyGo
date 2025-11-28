const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLFloat
} = require('graphql');


const adminInput = new GraphQLInputObjectType({
    name: "AdminInput",
    fields: {
        fullName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    }
})

const universityInput = new GraphQLInputObjectType({
    name : "UniversityInput",
    fields : {
        logo : { type: GraphQLString },
        establishedYear : { type: GraphQLNonNull(GraphQLString) },
        name : { type: GraphQLNonNull(GraphQLString) },
        code: { type: GraphQLNonNull(GraphQLString) },
        address : { type: GraphQLNonNull(GraphQLString) },
        phoneNumber : { type: GraphQLString },
        emailUniversity : { type: GraphQLString },
        password : { type: GraphQLString },
    }
})

const departementInput =  new GraphQLInputObjectType({
    name : "DepartementInput",
    fields : {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        location : { type: GraphQLString },
        establishedYear : { type: GraphQLString },
        email :  { type: GraphQLString },
        emailUniversity : { type: GraphQLString },
        phoneNumber : { type: GraphQLString },
        password : { type: GraphQLString }
    }
})

const SectionInput = new GraphQLInputObjectType({
    name : "SectionInput",
    fields : {
        yearAcadimic : { type: GraphQLID},
        System : { type: GraphQLString },
        CapacityMin : { type : GraphQLInt },
        CapacityMax : { type : GraphQLInt },
        Niveaux : { type: GraphQLString },
        isSpeciality : { type: GraphQLBoolean },
        name : { type : GraphQLString }
    }
})

const moduleInput = new GraphQLInputObjectType({
    name : "moduleIbput",
    fields : {
        name: { type : GraphQLString },
        code: { type : GraphQLString }, // optional, e.g., "CS101"
        Coef : { type : GraphQLInt },
        Credites : { type : GraphQLInt },
        VHS : { type : GraphQLInt },
        VHS_Cours: { type : GraphQLFloat },
        VHS_TD: { type : GraphQLFloat },
        VHS_TP: { type : GraphQLFloat },
        Mode_evaluation : { type : new GraphQLInputObjectType({ name : "ModeEnseignementInput",fields :{ Continue : { type : GraphQLInt }, Examen : { type : GraphQLInt } } } )},
        Mode_enseignement : { type : GraphQLString },
        Niveau : { type : GraphQLString },
        Semestre : { type : GraphQLString },
    }
})

const profeseurInput = new GraphQLInputObjectType({
    name : "profeseutInput",
    fields : {
        fullName : { type : GraphQLNonNull(GraphQLString) },
        email : { type : GraphQLString },
        emailUniversity : { type : GraphQLString },
        password : { type : GraphQLNonNull(GraphQLString) },
        contact : { type : GraphQLNonNull(GraphQLString) },
        dateOfBirth : { type : GraphQLNonNull(GraphQLString) },
        address : { type : GraphQLNonNull(GraphQLString) },
        bloodGroup : { type : GraphQLString },
        researchArea : { type : GraphQLString },
        linkedIn : { type : GraphQLString },
        status : { type : GraphQLString },
        degree : { type : GraphQLNonNull(GraphQLString) },
        designation : { type : GraphQLNonNull(GraphQLString) },
        gender : { type : GraphQLNonNull(GraphQLString) }
    }
})

const roomInput = new GraphQLInputObjectType({
    name : "roomInput",
    fields : {
        name: { type: GraphQLNonNull(GraphQLString) },
        BuildingName: { type: GraphQLString },
        capacity: { type: GraphQLString },
        type : { type : GraphQLNonNull(GraphQLString) },
        facilities : { type : GraphQLList(GraphQLString) }
    }
})

module.exports = {
    adminInput,
    universityInput,
    departementInput,
    SectionInput,
    moduleInput,
    profeseurInput,
    roomInput
}