const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const fetch = require("node-fetch");

module.exports = {
    
  // =================================  SignUp User  ===============================================
  signup: async (req, res) => {
    try {
      if (req.body.password != req.body.confirmPassword) {
        return res.send({
          responseCode: 404,
          responseMessage: "Password didn't match : Please Try Again",
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password);
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashedPassword,
      });

      const savedUser = user.save((saveError, saveResult) => {
        if (saveError) {
          return res.send({
            responseCode: 500,
            responseMessage: "Internal Server Error",
          });
        } else if (!saveResult) {
          return res.send({
            responseCode: 401,
            responseMessage: "Unable to save data",
          });
        } else {
          return res.send({
            responseCode: 200,
            responseMessage: "Successfully Signup",
            responseResult: saveResult,
          });
        }
      });
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong",
        responseResult: error,
      });
    }
  },

  // ==================================  User Login  ==========================================
  login: async (req, res) => {
    try {
      await User.findOne(
        { email: req.body.email, status: "ACTIVE" },
        (error, result) => {
          if (error) {
            return res.send({
              responseCode: 500,
              responseMessage: "Internal Server Error.",
            });
          } else if (!result) {
            return res.send({
              responseCode: 404,
              responseMessage: "Email doesn't exist",
            });
          } else {
            let checkPassword = bcrypt.compareSync(
              req.body.password,
              result.password
            );
            if (checkPassword) {
                return res.send({
                    responseCode: 200,
                    responseMessage: "Successfully Logged In",
                    User:result,
                })
            } else {
              return res.send({
                responseCode: 404,
                responseMessage: "Invalid Password : Please Try Again",
              });
            }
          }
        }
      );
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong",
      });
    }
  },


  //   ================================ Get Wikipedia Categories ==================================
  categories: async (req, res) => {
    try {
      let cat = [];
      await fetch(
        "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=Wikipedia:Contents/Categories"
      )
        .then((res) => res.json())
        .then((text) => text[1])
        .then((data) => {
          for (let i = 1; i < data.length; i++) {
            cat.push(data[i].split("/")[2]);
          }
          return res.send({
            responseCode: 200,
            responseMessage: "Wikipedia Categories",
            responseResult: cat,
          });
        })
        .catch((error) => {
            return res.send({
                responseCode: 500,
                responseMessage: "Internal server error",
              });
        });
    } catch (error) {
      return res.send({
        responseCode: 501,
        responseMessage: "Something went wrong",
      });
    }
  },
};
