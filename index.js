const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {GraphQLSchema} = require("graphql");
const { graphqlUploadExpress } = require('graphql-upload-ts');

const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const connectDB = require('./config/connectDB');
const verifyToken = require('./middleware/virefytoken')

connectDB();

const QueryType = require("./gql/query.gql");
const MutationType = require("./gql/mutation.gql");

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/graphql",graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 6 }),
    graphqlHTTP(async(req) => {
        const authHeader = req.headers["authorization"];
        let user = null;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            user = await verifyToken(token);
        }
        return {
            schema,
            graphiql: true,
            context: {
                user, 
                req
            },
        };
    })
);

app.use((err, req, res, next) => {
    if (err && err.message.includes("File truncated")) {
        return res.status(400).json({ error: "File too large!" });
    }
    if (err && err.message.includes("Exceeded")) {
        return res.status(400).json({ error: "Too many files uploaded!" });
    }
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});