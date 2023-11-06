const regexEmail = /\S+@\S+\.\S+/;

const validatePassword = (password) => {
   return password.length >= 6 && password.length <= 25
}
const validateUsername = (username) => {
   return username.length >= 5 && username.length <= 20
}


export const loginValidation = (req, res, next) => {
   if(!req.body) {
      return res.status(403).send('No form data provided')
   }
   if (req.body.email && !regexEmail.test(req.body.email)) {
      return res.status(403).send('Please enter a valid email')
   }
   if(req.body.password && !validatePassword(req.body.password)) {
      return res.status(403).send('Password should contain from 6 to 25 characters')
   }

   return next();
};

export const registerValidation = (req, res, next) => {
   if(!req.body) {
      return res.status(403).send('No form data provided')
   }
   if(req.body.username && !validateUsername(req.body.username)) {
      return res.status(403).send('Username should contain from 5 to 20 characters')
   }
   if (req.body.email && !regexEmail.test(req.body.email)) {
      return res.status(403).send('Please enter a valid email')
   }
   if(req.body.password && !validatePassword(req.body.password)) {
      return res.status(403).send('Password should contain from 6 to 14 characters')
   }

   return next();
};

