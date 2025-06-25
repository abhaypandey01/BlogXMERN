import jwt from 'jsonwebtoken';

const auth = async (req, res, next)=> {
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.json({message: "token missing"})
        }
        //verify token
        jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (error) {
        res.json({message: "invalid token"})
    }
}
export default auth;