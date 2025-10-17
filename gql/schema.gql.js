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
        message: { type: GraphQLString },
    },
});

const StudentType = new GraphQLObjectType({
    name : "Student",
    fields : {
        fullName : { type : GraphQLString },
        StudentCard : { type : GraphQLString },
        email : { type : GraphQLString },
        password : { type : GraphQLString}
    }
})