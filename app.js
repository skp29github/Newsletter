const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { response } = require("express");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstname=req.body.FirstName;
    const lastname=req.body.LastName;
    const mail=req.body.Email;

    const data={
        members: [
            {
                email_address:mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/0b1c7968a8";
    const options={
        method:"POST",
        auth:"sanyog1:1cd41bc5814eff590a703bb2141a12e2-us21"
    };
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            // console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server running on port 3000");
});
// API key
// 1cd41bc5814eff590a703bb2141a12e2-us21
// list id: 0b1c7968a8