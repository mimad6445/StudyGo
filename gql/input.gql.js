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
        phoneNumber : z.string(),
        emailUniversity : z.string(),
    }
})


module.exports = {
    adminInput
}