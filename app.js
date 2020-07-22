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

    var unit = "metric";
    const apiKey = "37877dc467faad8a7fcf4e5e1620e446";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        if(response.statusCode === 200){
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
                var visibility = weatherData.visibility;
                var wind = weatherData.wind.speed;
                var windDirection = weatherData.wind.deg;
                var country = weatherData.sys.country;
                // http://openweathermap.org/img/wn/10d@2x.png
                const imageURL = "https://openweathermap.org/img/wn/"+ icon+"@2x.png";
                const height = "style:\"height:5%; width:5%;\""
                res.write("<h1>Your Weather Details</h1>")
                res.write("<h2>"+query+" ,<b> <em>"+country+"</em><b> </h2>");
                res.write("<img src="+imageURL+" "+height+">");
                res.write("<h4>Currently the weather is <i>"+description+"</i></h4>")
                res.write("<h4>Max Temp : "+temp_max+"&#176 C &#127777;&#65039;</h4>");
                res.write("<h4>Min Temp : "+temp_min+"&#176 C &#127777;&#65039;</h4>");
                res.write("<h4>Feels Like: "+feels_like+"&#176 C &#127777;&#65039;</h4>");
                res.write("<h4>Pressure : "+pressure+" mbar </h4>");
                res.write("<h4>Humidity : "+humidity+" % &#128167;</h4>");
                res.write("<h4>Visibility : "+visibility+" m &#128065;&#65039;</h4>");
                res.write("<h4>Wind speed : "+wind+"<i> kmph</i> &#127788;&#65039;</h4>");
                res.write("<h4>Wind direction : "+windDirection+"&#176 of North. &#x1F9ED;</h4>")

                res.send();
            });
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    });
});


app.post("/failure.html",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(req,res){
   
});




