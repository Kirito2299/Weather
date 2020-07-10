const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const cityName = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=b3a730e3ac7c2db35bf984eca5ea8137"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const wData = JSON.parse(data);
      const temp = wData.main.temp;
      const icon = wData.weather[0].icon;
      const image = ("http://openweathermap.org/img/wn/"+ icon +"@2x.png");
      const need = wData.weather[0].description;
      res.write("<h1>The Temperature in "+ cityName +" is "  + temp + "</h1>");
      res.write("<p>The weather is " + need + " </p>");
      res.write("<img src="+ image +"></img>");
      res.send();
    });
  });
})

app.listen(3000, function(){
  console.log("Server is running");
});
