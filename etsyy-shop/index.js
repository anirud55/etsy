//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const multer = require("multer");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//use express static folder
// app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var Users = [
  {
    username: "admin",
    password: "admin",
  },
];

var mysql = require("mysql");

var con  = mysql.createPool({
  connectionLimit : 10,
  host            : 'etsyy.cvpzsnchqnxg.us-east-2.rds.amazonaws.com',
  user            : 'admin',
  password        : 'admin123',
  port            : '3306',
  database        : 'etsyyy',
});

con.getConnection(function(err, connection) {
    connection.query( 'SELECT something FROM sometable', function(err, rows) {

      console.log(con._freeConnections.indexOf(connection)); // -1

      connection.release();

      console.log(con._freeConnections.indexOf(connection)); // 0

   });
});

//Route to handle Post Request Call
app.post("/login", function (req, res) {
  con.query(
    "SELECT * FROM users where email ='" + req.body.email + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      if (result.length > 0) {
        if (
          result[0].email === req.body.email &&
          result[0].password === req.body.password
        ) {
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("Wrong Username and password combination");
        }
      } else {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        res.end("Email is not registered with us");
      }
    }
  );
});

//Route to handle Post Request Call
app.post("/signup", function (req, res) {
  con.query(
    "INSERT INTO users (name, email, password) VALUES ('" +
      req.body.name +
      "','" +
      req.body.email +
      "','" +
      req.body.password +
      "')",
    function (err, result) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.log(err);
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end("Email is already registered with us");
          return;
        }
      }
      con.query(
        "SELECT * FROM users where email ='" + req.body.email + "'",
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/",
          });
          req.session.user = result;
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end(JSON.stringify(result));
        }
      );
    }
  );
});

app.get("/userprofile/:email", function (req, res) {
  const email = req.params.email;
  con.query(
    "Select * from users where email='" + email + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      // req.session.user = result;
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  );
});

//Route to handle Post Request Call
app.post("/updateprofile", function (req, res) {
  con.query(
    "UPDATE users SET name='" +
      req.body.name +
      "',email='" +
      req.body.email +
      "',city='" +
      req.body.city +
      "',phone='" +
      req.body.phone +
      "',address='" +
      req.body.address +
      "',country='" +
      req.body.country +
      "',dob='" +
      req.body.dob +
      "',about='" +
      req.body.about +
      "',pic='" +
      req.body.image +
      "' WHERE email='" +
      req.body.currentemail +
      "'",
    function (err, result) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.writeHead(400, {
            "Content-Type": "text/plain",
          });
          res.end(
            "Profile not updated as email is registered with another user."
          );
          return;
        }
      }
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Profile updated");
    }
  );
});

app.post("/shopNameAvailable", function (req, res) {

  con.query(
    "Select * from shop where shopname='" + req.body.shopname + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      // req.session.user = result;

      console.log(result);
      if (result < 1) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("Shop is available");
      } else {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        res.end("Shop is not available");
      }
    }
  );
});

app.post("/isshopalreadycreated", function (req, res) {

  con.query(
    "Select shopname from users where email='" + req.body.email + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      // req.session.user = result;

      console.log(result[0].shopname);
      if (result[0].shopname == null) {
        res.writeHead(400, {
          "Content-Type": "text/plain",
        });
        res.end("Shop hasn't been created yet");
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(result[0].shopname);
      }
    }
  );
});

app.post("/createshop", function (req, res) {
  
  con.query(
    "Insert into shop (shopname,email) values ('" +
      req.body.shopname +
      "','" +
      req.body.email +
      "')",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  con.query(
    "Update users SET shopname='" +
      req.body.shopname +
      "' where email='" +
      req.body.email +
      "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Shop Created");
    }
  );
});

app.post("/addproduct", function (req, res) {
  
  con.query(
    "Insert into products (name,price,description,category,instock,image,shopname) values ('" +
      req.body.name +
      "','" +
      req.body.price +
      "','" +
      req.body.description +
      "','" +
      req.body.category +
      "','" +
      req.body.instock +
      "','" +
      req.body.image +
      "','" +
      req.body.shopname +
      "')",
    function (err, result) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("Product with same name exists");
        }
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Product Added");
    }
  );
});

app.post("/updateproduct", function (req, res) {
  
  con.query(
    "Update products set price='" +
      req.body.price +
      "',description='" +
      req.body.description +
      "',category='" +
      req.body.category +
      "',instock='" +
      req.body.instock +
      "',image='" +
      req.body.image +
      "' where name='" +
      req.body.name +
      "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Product Updated");
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/api/products", function (req, res) {
  
  con.query("Select * from products", function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(result));
  });
});

app.get("/api/products/id/:id", function (req, res) {
  
  const id = req.params.id;
  con.query("Select * from products", function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    const product = result.find((x) => x.id === parseInt(id));
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(product));
  });
});

app.get("/ownerdetails/:shopname", function (req, res) {
  
  const shopname = req.params.shopname;
  con.query(
    "Select * from users where shopname ='" + shopname + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result[0]));
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/products/:shopname", function (req, res) {
  
  const shopname = req.params.shopname;
  con.query(
    "Select * from products where shopname='" + shopname + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  );
});

//Route to handle Post Request Call
app.post("/addshopimage", function (req, res) {
  
  con.query(
    "UPDATE shop SET shopimage='" + req.body.shopImage + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Shop Image added");
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/shopimage/:shopname", function (req, res) {
  const shopname = req.params.shopname;
  con.query(
    "Select shopimage from shop where shopname='" + shopname + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result[0]));
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/productdetails/:name", function (req, res) {
  const productname = req.params.name;
  con.query(
    "Select * from products where name='" + productname + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result[0]));
    }
  );
});

app.post("/createorder", function (req, res) {
  
  con.query(
    "Insert into orders (image,name,shopname,quantity,price,dateofpurchase,customeremail,currency) values ('" +
      req.body.image +
      "','" +
      req.body.name +
      "','" +
      req.body.shopname +
      "'," +
      req.body.quantity +
      "," +
      req.body.price +
      ",'" +
      req.body.date +
      "','" +
      req.body.email +
      "','" +
      req.body.currency +
      "')",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      con.query(
        "UPDATE products SET instock= instock-" +
          req.body.quantity +
          ",totalsales= totalsales+" +
          req.body.quantity +
          " where shopname='" +
          req.body.shopname +
          "' and name='" +
          req.body.name +
          "'",
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("Order Creted");
        }
      );
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/orders/:email", function (req, res) {
  
  const email = req.params.email;
  con.query(
    "Select * from orders where customeremail='" +
      email +
      "' order by dateofpurchase asc",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  );
});

app.get("/search", function (req, res) {
  
  if (req.query.email === "") {
    con.query(
      "Select * from products where name like '%" +
        req.query.name +
        "%' or category like '%" +
        req.query.name +
        "%'",
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(result));
      }
    );
  } else {
    con.query(
      "Select * from users where email='" + req.query.email + "'",
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result[0].shopname);
        con.query(
          "Select * from (select * from products where shopname!='" +
            result[0].shopname +
            "') as filteredproducts where name like '%" +
            req.query.name +
            "%' or category like '%" +
            req.query.name +
            "%'",
          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            res.writeHead(200, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify(result));
          }
        );
      }
    );
  }
});

//Route to get All Products when user visits the Home Page
app.get("/shopsalestotal/:shopname", function (req, res) {
  const shopname = req.params.shopname;
  con.query(
    "select sum(totalsales) as totalsales from products where shopname='" +
      shopname +
      "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/categories", function (req, res) {
  con.query("Select name from categories", function (err, result) {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    // console.log(result);
    res.end(JSON.stringify(result));
  });
});

//Route to get other Products when user visits the Home Page
app.get("/othersellerproducts/:email", function (req, res) {
  const email = req.params.email;
  con.query(
    "Select * from users where email='" + email + "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      let shopname;
      console.log(result);
      try {
        shopname = result[0].shopname;
      } catch {
        shopname = "";
      }

      console.log(shopname);
      con.query(
        "Select * from products where shopname!='" + shopname + "'",
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(result));
        }
      );
    }
  );
});

app.post("/addtofavorites", function (req, res) {
  con.query(
    "Select * from favorites where name='" +
      req.body.name +
      "' and shopname='" +
      req.body.shopname +
      "' and email='" +
      req.body.email +
      "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      if (result < 1) {
        con.query(
          "Insert into favorites (name,shopname,email) values ('" +
            req.body.name +
            "','" +
            req.body.shopname +
            "','" +
            req.body.email +
            "')",
          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            res.writeHead(200, {
              "Content-Type": "text/plain",
            });
            res.end("Added to favorites");
          }
        );
      } else {
        con.query(
          "DELETE FROM favorites where id=" + result[0].id,
          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            res.writeHead(400, {
              "Content-Type": "text/plain",
            });
            res.end("Removed from favorites");
          }
        );
      }
    }
  );
});

//Route to get All Products when user visits the Home Page
app.get("/getfavoriteproducts/:email", function (req, res) {

  con.query(
    "SELECT GROUP_CONCAT(QUOTE(name)) as name FROM favorites where email='" +
      req.params.email +
      "'",
    function (err, result) {
      if (err) {
        console.log(err);
        return;
      }

      console.log(result[0].name);
      con.query(
        "SELECT * from products where name in(" + result[0].name + ")",
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          console.log(result);
          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify(result));
        }
      );
    }
  );
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

module.exports = app;
