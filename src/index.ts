import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typesDefs.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import express from "express";

const app = express();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
await server.start();
app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server),
);
app.listen(8080, () => {
    console.log("sever starting on port 8080");
});
