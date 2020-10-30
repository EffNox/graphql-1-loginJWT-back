import jwt from "jsonwebtoken";

class JWT {
    private secretKey = process.env.JWT_KEY + '';
    sign(dt: any): string {
        return jwt.sign({ dt }, this.secretKey, { expiresIn: 24 * 60 * 60 });
    }
    verify(tk: string) {
        try {
            return jwt.verify(tk, this.secretKey)
        } catch (er) {
            return null;
        }
    }
}

export default JWT
