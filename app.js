const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/" , function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/" , function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
            }
        ]
    };
   
 
    const JSONdata = JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/68b1274a6f";
    const options = {
        method: "POST",
        auth: "Shikha:88673f318147fb6a645f28878d932c33-us5"
    }
    const request = https.request(url, options, function (response) {
        var code = response.statusCode;
        console.log(code);
        if(code === 200){
           
                res.sendFile(__dirname + "/success.html");
         
        }
        else{
       
                res.sendFile(__dirname + "/failure.html");
  
        }
       
        response.on("data" , function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(JSONdata);
    request.end();
});
app.post("/failure" , function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000 ,  function () {
    console.log("Server is runing on port 3000 ");
});
// API key -> 88673f318147fb6a645f28878d932c33-us5
// Audience id or List id -> 68b1274a6f
 




