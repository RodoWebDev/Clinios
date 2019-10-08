const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mysql = require("mysql");
const config = require("../config");

const app = express();

const connection = mysql.createConnection({
  host: config.mysql_host,
  user: config.mysql_username,
  password: config.mysql_password,
  database: config.mysql_db,
  port: config.mysql_port
});

connection.connect();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/getPatients", (req, res) => {
  connection.query("SELECT * FROM patient", function(error, results) {
    if (error) res.status(500).send({ error });
    res.status(200).json(results);
  });
});

app.post("/getPatients", (req, res) => {
  const body = req.body;
  var patient = body.patient || "";
  // const body = req.body;
  var firstname = patient.firstname || "";
  const lastname = patient.lastname || "";
  const phone = patient.phone || "";
  console.log(firstname);
  console.log(lastname);
  console.log(phone);
  let query = "SELECT * FROM patient";
  const filter = [];
  if (firstname) {
    // firstname = firstname.concat("%");
    // console.log(firstname);
    filter.push("firstname = " + mysql.escape(firstname));
  }
  if (lastname) {
    filter.push("lastname = " + mysql.escape(lastname));
  }
  if (phone) {
    filter.push("phone = " + mysql.escape(phone));
  }
  if (filter.length > 0) {
    query += " WHERE " + filter.join(" AND ");
  }
  console.log(query);
  connection.query(
    query,
    function(error, results) {
      if (error) res.status(500).send({ error });
      res.status(200).json(results);
    }
  );
});

app.get("/getUsers", (req, res) => {
  connection.query("select id, firstname, lastname, email, title ,phone,comment, case status when 'A' then 'Active' when 'I' then 'Inactive' end status  , case schedule      when 'F' then 'Fulltime'      when 'P' then 'Parttime'      when 'Q' then 'Quartertime'    end schedule  , case admin when 'Y' then 'Yes' when 'N' then 'No' end admin, case appointments when 'Y' then 'Yes' when 'N' then 'No' end appointments  , created  , client_id  from user order by 1", function(error, results) {
    if (error) res.status(500).send({ error });
    res.status(200).json(results);
  });
});

app.post("/updateUser", (req, res) => {
  const body = req.body;
  var editedItem = body.editedItem || "";
  if(editedItem.status == "Active")
    editedItem.status = "A";
  else if(editedItem.status == "Inactive")
    editedItem.status = "I";
  if(editedItem.admin == "Yes")
    editedItem.admin = "Y";
  else if(editedItem.admin == "No")
    editedItem.admin = "N";
  if(editedItem.appointments == "Yes")
    editedItem.appointments = "Y";
  else if(editedItem.appointments == "No")
    editedItem.appointments = "N";
  console.log(editedItem.status);
  let query = "UPDATE user SET firstname = '"+editedItem.firstname+"', lastname = '"+editedItem.lastname+"',   email = '"+editedItem.email+"',   title = '"+editedItem.title+"',   status = '"+editedItem.status+"',   phone = '"+editedItem.phone+"',   comment = '"+editedItem.comment+"',   admin = '"+editedItem.admin+"',   appointments = '"+editedItem.appointments+"' where id = '"+editedItem.id+"'";
  connection.query(
    query,
    function(error, results) {
      if (error) res.status(500).send({ error });
      res.status(200).json(results);
    }
  );
});

app.post("/insertUser", (req, res) => {
  const body = req.body;
  var editedItem = body.editedItem || "";
  if(editedItem.status == "Active")
    editedItem.status = "A";
  else if(editedItem.status == "Inactive")
    editedItem.status = "I";
  if(editedItem.admin == "Yes")
    editedItem.admin = "Y";
  else if(editedItem.admin == "No")
    editedItem.admin = "N";
  if(editedItem.appointments == "Yes")
    editedItem.appointments = "Y";
  else if(editedItem.appointments == "No")
    editedItem.appointments = "N";
  // console.log(editedItem.status);
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();
  let curDT = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  let query = "INSERT INTO user (firstname ,lastname ,email ,title ,status ,phone ,comment ,admin ,appointments, created) VALUES('"+editedItem.firstname+"','"+editedItem.lastname+"','"+editedItem.email+"','"+editedItem.title+"','"+editedItem.status+"','"+editedItem.phone+"','"+editedItem.comment+"','"+editedItem.admin+"','"+editedItem.appointments+"','"+curDT+"')";
  console.log(query);
  connection.query(
    query,
    function(error, results) {
      if (error) res.status(500).send({ error });
      res.status(200).json(results);
    }
  );
});

app.post("/deleteUser", (req, res) => {
  const body = req.body;
  var editedItem = body.editedItem || "";
  let query = "DELETE FROM user where id = '"+editedItem.id+"'";
  console.log(query);
  connection.query(
    query,
    function(error, results) {
      if (error) res.status(500).send({ error });
      res.status(200).json(results);
    }
  );
});

app.listen(process.env.PORT || 8083);
