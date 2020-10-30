import express from 'express';
import compression from 'compression';
// import cors from 'cors';
import schema from './src/schema';
import { ApolloServer } from 'apollo-server-express';
// import expressPlayGround from "graphql-playground-middleware-express";
import { createServer } from 'http';
import Database from './src/utils/db';
const { parsed: { PORT, GQL, DB } } = require('dotenv').config()

async function init() {
    const app = express();

    // app.use('*', cors());

    app.use(compression());

    const db = await new Database().init(DB)
    const context: any = async ({ req, connection }: any) => {
        const tk = req?.headers?.authorization ? req?.headers?.authorization : connection?.authorization;
        return { db, tk }
    }
    const server = new ApolloServer({ schema, introspection: true, context, playground: !0 });

    server.applyMiddleware({ app, path: '/gql' })
    // app.get('/', expressPlayGround({ endpoint: '/graphql' }))

    const httpServer = createServer(app);
    httpServer.listen(PORT, () => console.log(GQL));
}

init();
