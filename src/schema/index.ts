import { GraphQLSchema } from "graphql";
import 'graphql-import-node';
import typeDefs from './schema.gql';
import resolvers from './../resolvers/resolversMap';
import { makeExecutableSchema } from "graphql-tools";

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;
