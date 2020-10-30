import { IResolvers } from "graphql-tools";
import bcrypt from "bcryptjs";
import { Datetime } from "../utils/datetime";

const mutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }): Promise<any> {
            const lastUser = await db.collection('users').find().limit(1).sort({ createdAt: -1 }).toArray()
            user.id = lastUser.length === 0 ? 1 : lastUser[0].id + 1

            user.createdAt = new Datetime().getCurrentDateTime()
            user.pwd = bcrypt.hashSync(user.pwd);
            db.collection('users').insertOne(user)
            return user;
        }
    }
}

export default mutation;
