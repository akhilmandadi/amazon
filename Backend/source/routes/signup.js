
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { checkAuth } = require("../helpers/passport");
const JwtStrategy = require('passport-jwt').Strategy;
const seller = require('../models/seller');
const customer = require('../models/customer');
const passport = require('passport');
const { secret } = require('../helpers/setting');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const { auth } = require("../helpers/passport");
auth();






router.post('/', (req, res) => {
  console.log("hhhhhhh")
  console.log(req.body)
  if (req.body.role === 'customer') {  
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      const newcustomer = new customer({
        customer_name: req.body.name,
        customer_mail: req.body.mail,
        password: hash,

      });
      customer.findOne({ customer_mail: req.body.mail }, (err, customer) => {
        if (err) {
          console.log("111")
          console.log(err)
          res.status(500).send(err)

        }
        if (customer) {
          console.log("22")
          console.log(customer)
          res.status(200).send("customer_exists")
        }
        else {
          newcustomer.save((err, result) => {
            console.log("33")
            if (err) {
              console.log("44")
              console.log(err)
              res.status(500).send(err)

            }
            else {

              console.log("55")
                console.log(result)     
              res.status(200).send("customer_added") 
            }


          });
        }
      });
    })


  }
  else if (req.body.role == "seller") {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      const newseller = new seller({
        seller_name: req.body.name,
        seller_mail: req.body.mail,
        password: hash,

      });
      
      seller.findOne({ seller_mail: req.body.mail }, (err, seller2) => { 
        if (err) {
          console.log("a")
          res.status(500).send(err)

        }
        else if (seller2) {
          console.log("b")
          console.log(seller2)
          res.status(200).send("seller_exists")
        }
        else {
          seller.findOne({ seller_name: req.body.name }, (err, seller1) => { 
            if(err)
            {
              res.status(500).send(err)

            }
            else if(seller1)
            {
              res.status(200).send("sellername_exists")

            }
            else
          {
            newseller.save((err, result) => {
              if (err) {
                console.log("c")
                res.status(500).send(err)
  
              }
              else {
                console.log("d")
                
  
                res.status(200).send("seller_added")
              }
  
  
            });

          }

        
            
        })
      }

      });
    })


  }
});


router.post('/login', (req, res) => {

 
  if (req.body.role == "customer") {  

    customer.findOne({ customer_mail: req.body.mail }, (err, customer) => {
    if (err) {
      res.status(500).send(err)
    
    }
    else if (!customer) {
      res.status(500).send("customer_notexists")
    
    }
    else if (customer) {
      bcrypt.compare(req.body.password, customer.password, (err, result1) => {
        if (err) {
          res.status(500).send(err)
          
        
        }
        else if(result1)
        {
          let payload = { _id: customer._id, customer_mail: customer.customer_mail,name:customer.customer_name,role:"customer" };
          var token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          res.json({ success: true, token: 'JWT ' + token });
        
        }
        else{
          res.status(404).send("incorrect_password")
         

        }
  
      
      })
     }
   
  
  });
}
else if (req.body.role == "seller") {  

  seller.findOne({ seller_mail: req.body.mail }, (err, seller) => {
  if (err) {
    res.status(500).send(err)
  
  }
  else if (!seller) {
    res.status(500).send("seller_notexists")
  
  }
  else if (seller) {
    bcrypt.compare(req.body.password, seller.password, (err, result1) => {
      if (err) {
        res.status(500).send(err)
        
      
      }
      else if(result1)
      {
        let payload = { _id: seller._id, seller_mail: seller.seller_mail,name:seller.seller_name,role:"seller" };
        var token = jwt.sign(payload, secret, {
          expiresIn: 1008000
        });
        res.json({ success: true, token: 'JWT ' + token });
      
      }
      else{
        res.status(404).send("incorrect_password")
       

      }

    
    })
   }
 

});
}
if (req.body.role == "admin") {  

  admin.findOne({ admin_mail: req.body.mail }, (err, admin) => {
  if (err) {
    res.status(500).send(err)
  
  }
  else if (!admin) {
    res.status(500).send("admin_notexists")
  
  }
  else if (admin) {
    bcrypt.compare(req.body.password, admin.password, (err, result1) => {
      if (err) {
        res.status(500).send(err)
        
      
      }
      else if(result1)
      {
        let payload = { _id: admin._id, admin_mail: admin.admin_mail,name:admin.admin_name,role:"admin" };
        var token = jwt.sign(payload, secret, {
          expiresIn: 1008000
        });
        res.json({ success: true, token: 'JWT ' + token });
      
      }
      else{
        res.status(404).send("incorrect_password")
       

      }

    
    })
   }
 

});
}

  
});


module.exports = router;