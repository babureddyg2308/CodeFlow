import jwt from "jsonwebtoken"

const verifyTokenAnonymous = async (req, res, next) =>{
    const token = req.cookies.token;

    if(!token) {
        return next();
    }
    jwt.verify(token , process.env.JWT_KEY, (err, data) =>{
        if(err){
            return res.status(401).send({message : "You are unauthorized"})
        }
        req._id = data._id;
        next();
    })
}

export default verifyTokenAnonymous;
