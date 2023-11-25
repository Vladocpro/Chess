import jwt from "jsonwebtoken";


export const verifyToken = (req,res,next) => {
   let token = req.body.token || req.query.token || req.headers["authorization"];
   if (!token) {
      return res.status(403).send({invalidTokenError: true});
   }
   try {
      token = token.replace(/^Bearer\s+/,"");
      const verifiedToken = jwt.verify(token,process.env.TOKEN_KEY);
      req.user = verifiedToken;
   } catch (err) {
      console.log({invalidTokenError: true})
      return res.status(401).send({invalidTokenError: true});
   }
   return next();
};
