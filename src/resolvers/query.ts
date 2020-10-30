import { IResolvers } from "graphql-tools";
import JWT from "../utils/jwt";
import bcrypt from "bcryptjs";

const query: IResolvers = {
    Query: {
        users: async (_, __, { db }) => await db.collection('users').find().toArray(),
        login: async (_, { cor, pwd }, { db }) => {
            const u = await db.collection('users').findOne({ cor })
            if (!u) return { tk: 'No existe el usuario cor' }

            if (!bcrypt.compareSync(pwd, u.pwd)) return { tk: 'No existe el usuario pwd' }
            delete u.pwd
            return { tk: new JWT().sign({ u }) }
        },
        me: (_, __, { tk }) => {
            let inf: any = new JWT().verify(tk)
            return { ...inf.dt.u }
        }
    }
}

export default query;
