let lat;
let lon;
let locationname=document.getElementById("locationName");
let icon=document.getElementById("icon");
let desc=document.getElementById("description");
let temperature=document.getElementById("temp");
let mintemp=document.getElementById("minTemp");
let maxtemp=document.getElementById("maxTemp");
let windspeed=document.getElementById("windSpeed")
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position =>{
        lat=position.coords.latitude;
        lon=position.coords.longitude;
        console.log("latitude "+lat,"longitude "+lon);
        //console.log(position);
    let data= await getWeatherData(lat,lon);
    var map = L.map('map').setView([lat,lon], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([lat,lon]).addTo(map);
    
    marker.bindPopup(`<b>${data.name}</b>`).openPopup();
    map.on('click',async function(e){
           const data= await getWeatherData(e.latlng.lat,e.latlng.lng);
           marker.setLatLng([e.latlng.lat,e.latlng.lng]);
           marker.bindPopup(`<b>${data.name}</b>`).openPopup();
      
    });
    

    
    return data;

    })
}
async function getWeatherData(lat,lon){
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&unit=metric&appid=2d0a50dfa7a94b82152e42def926b220`;
    let response=await fetch(api)
    let data=await response.json();

    console.log(data);

    dataHandler(data);
    return data;

    
}
 function dataHandler(data){
    const {temp,temp_min,temp_max}=data.main;
    const {description}=data.weather[0];
    const {speed}=data.wind;
    locationname.innerHTML=data.name;
    temperature.innerHTML="Temperature:"+temp;
    desc.innerHTML=description;
    mintemp.innerHTML="min-temp: "+temp_min;
    maxtemp.innerHTML="min-temp: "+temp_max;
    windspeed.innerHTML="wind-speed: "+speed;


 
  
 }







