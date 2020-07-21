const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const  https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));


app.get("/",function(req, res){
    res.sendFile(__dirname+"/favicon.ico")
})

app.post("/",function(req, res){

    var query = req.body.cityName;
    console.log(query);
    var unit = "metric";
    const apiKey = "37877dc467faad8a7fcf4e5e1620e446";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var feels_like = weatherData.main.feels_like;
            var temp_min = weatherData.main.temp_min;
            var temp_max = weatherData.main.temp_max;
            var icon = weatherData.weather[0].icon;
            var pressure = weatherData.main.pressure;
            var humidity = weatherData.main.humidity;
            var description = weatherData.weather[0].description;
            // http://openweathermap.org/img/wn/10d@2x.png
            const imageURL = "https://openweathermap.org/img/wn/"+ icon+"@2x.png";
            console.log("Temp : "+temp+"\n"+"feels-like :"+feels_like+"\n"+"temp_min :"+temp_min+"\n"+"temp_max :"+temp_max+"\n"+"Pressure : "+pressure+"\n"+"humidity : "+humidity+"%");
            res.write("<h1>Your Weather Details</h1>")
            res.write("<h2>"+query+"</h2>");
            res.write("<img src="+imageURL+">");
            res.write("<h4>Currently the weather is <i>"+description+"</i></h4>")
            res.write("<h2>Max Temp : "+temp_max+"&#176 C</h2>");
            res.write("<h2>Min Temp : "+temp_min+"&#176 C</h2>");
            res.write("<h2>Feels Like: "+feels_like+"&#176 C</h2>");
            res.write("<h2>Pressure : "+pressure+" mbar </h2>");
            res.write("<h2>Humidity : "+humidity+"%</h2>");
            res.send();
        });
    });
});


app.listen("3000",function(req,res){
    console.log('Server Started at port 3000');
});