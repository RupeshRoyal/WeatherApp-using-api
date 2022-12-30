const express =require("express");
const app = express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const https=require("https");


app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const city=  req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=c35e060d2040d3e7b1d41d5bf537b666#";

   https.get(url, function(response){
   console.log(response.statusCode);

     response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const tempa=weatherData.main.temp;
      const feelsLike=weatherData.main.feels_like;
      const descript=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The Temperature in "+city+" is "+tempa+" degree celcius and feelslike "+feelsLike+" degree celcius </h1>");
      res.write("<h2>weather is "+descript+"</h2>");
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });
});

app.listen(3500,function(){
  console.log("Server is running at port 3500");
})
