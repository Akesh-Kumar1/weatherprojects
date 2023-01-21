const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res)
{
   
    res.sendFile(__dirname+"/index.html");
  
});

app.post("/",function(req,res)
{
  
  const query=req.body.cityname;
const apikey="9afe72e8427351e6d326921b47d5db32";
const unit="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey +"&units="+unit;
https.get(url,function(response){
    console.log(response.statuscode) ;
response.on("data",function(data)

{
   const weatherdata= JSON.parse(data)
   const temp=weatherdata.main.temp;
   const description=weatherdata.weather[0].description;
   const icon=weatherdata.weather[0].icon;
  
   const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
   res.write("<p><h1>The weather description is "+description+"</h1></p>" );
   res.write(" <h1>The temperature in "+query+ " is "+temp+" degree celsius<h1>");
   res.write("<img src="+imageURL+">");
   res.send();
  

  
})


}
)

})









app.listen(1000,function(req,res)
{
    console.log("server is running");
})