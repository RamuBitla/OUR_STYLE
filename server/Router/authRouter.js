const router = require('express').Router();
const {User} = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

// Validation function
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("E-Mail"),
        password: Joi.string().required().label("Password"),
    });

    return schema.validate(data);
}

// LOGIN ROUTER
router.post('/login', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});
        const user = await User.findOne({email: req.body.email});
        if(!user)
            return res.status(401).send({message: "Invalid Email or Password"});

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
            return res.status(401).send({message: "Invalid Email or Password"});

        // Assuming `generateAuthToken` is a function to generate JWT token
        const token = await generateAuthToken();
        res.status(200).send({data: token, message: "Logged In Successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;























// const router = require('express').Router();
// const {User} = require('../models/user');
// const Joi = require('joi');
// const bcrypt = require('bcrypt');


// // LOGIN ROUTER
// router.post('/login', async (req, res) => {
//     try {
//         const {error} = validate(req.body);
//         if(error)
//             return res.status(400).send({message: error.detail[0].message});
//         const user = await User.findOne({email: req.body.email});
//         if(!user)
//             return res.status(401).send({message: "Invalid Email or Password"})

//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         if(!validPassword)
//             return res.status(401).send({message: "Invalid Email or Password"});

//         const token = await generateAuthToken();
//         res.status(200).send({data: token, message: "Logged In Successfully"})
//     } catch (error) {
//         res.status(500).send({message: "Internal Server Error"});
//     }
// })

// const validate = (data) => {
//     const Schema = Joi.object({
//         EMail: Joi.string().email().required().label("E-Mail"),
//         password: Joi.string().password().required().label("Password"),
//     })

//     return Schema.validate(data);
// }