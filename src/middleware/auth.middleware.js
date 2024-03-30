import jwt from 'jsonwebtoken';
import User from "../model/user.model.js"

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token){
            return res.status(401).json({ statusCode : 401, message: 'No token provided' });
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id);
    
        if(!user){
            res.status(401).send('Invalid Access Token');
        }
    
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({statusCode: 401, message : error || "Invalid Access Token." })
        
    }
}


export default verifyJWT;