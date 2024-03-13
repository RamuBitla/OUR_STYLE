const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, "Please enter your name"] },
  email: {
    type: String,
    unique: [true, "This Email has already exists"],
    required: [true, "Please enter an Email"],
  },
  phoneNo: {
    type: String,
    minlength: 10,
    maxlength: 12,
    required: [true, "Phone number is required."],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Password is required."],
    select: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().required().label("fullName"),
    email: Joi.string().email().required().label("email"),
    phoneNo: Joi.string().min(10).max(12).required().label("PhoneNo"),
    password: Joi.string().min(8).required().label("Password"),
  });

  return schema.validate(data);
};

module.exports = { User, validate };


















// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: [true, "please enter your name"] },
//   email: {
//     type: String,
//     unique: [true, "This Email has already exists"],
//     required: [true, "Please enter an Email"],
//   },
//   phoneNo: {
//     type: Number,
//     minlength: 10,
//     maxlength: 12,
//     required: [true, "Phone number is required."],
//   },

//   password: {
//     type: String,
//     minlength: [8, "Password must be atleast 8 characters"],
//     required: true,
//     select: false,
//   },
// });


// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: "2d"});
//     return token
// };

// const User = mongoose.model('user', userSchema);

// const validate = (data) => {
//     const Schema = joi.object({
//         username: joi.string().required().label("Username"),
//         EMail: joi.string().email().required().label("E-Mail"),
//         phoneNo: joi.string().number().required().label("Phone Number"),
//         password: joi.string().password().required().label("Password"),
//     })

//     return Schema.validate(data);
// }

// module.exports = (User, validate);