const wrapper = document.querySelector(".meteo-section"),
      //inputField = wrapper.querySelector("input"),
      locationBtn = wrapper.querySelector("button");
      
/* inputField .addEventListener("keyup", e => {
    // if there is an input when user presses enter key
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
}); */
const city = "nicosia";


wIcon = document.querySelector(".meteo-section img");
wSuggestion = document.querySelector(".suggestion");

let api;

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){
        //check if the navigator supports geolocalisation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else {
        alert("this browser doesn't support geolocation api !!!")
    }
});

function onSuccess(position){
    //console.log(position);

    //get current latitude and longitude from device
    const {latitude, longitute} = position.coords; 

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitute}&appid=${newApiKey}`;
    fetchData();
    
}
/* get the current location */







function onError(error){
    console.log(error);
}


//function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${newApiKey}`;
    fetchData();
    // fetch(api).then(response => response.json()).then(result = weatherDetails(result));
    //fetch(api).then(response => console.log(response.json()))/* .then(result = weatherDetails(result)) */;
//}

function fetchData(){
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
};

function weatherDetails(info){
    //getting required properties values from the json object given in the console 
    
    const temp = info.main.temp;
    const {description, id} = info.weather[0];


    // changing the weather icon depending on temperature id
     // add the option to get suggestions depending on the weather

    if(id == 800){
        wIcon.src = "./assets/Icons/clear.svg";
        wSuggestion.innerText = "What a good weather to go for a out";
    }else if(id >= 200 && id <= 232){
        wIcon.src = "./assets/Icons/storm.svg";  
        wSuggestion.innerText = "Going out ? mind taking an umbrella and something to keep you dry";
    }else if(id >= 600 && id <= 622){
        wIcon.src = "./assets/Icons/snow.svg";
        wSuggestion.innerText = "Snowing Outside, stay warm and avoid going out !!!";
    }else if(id >= 701 && id <= 781){
        wIcon.src = "./assets/Icons/haze.svg";
        wSuggestion.innerText = "Hazy .... take something to cover your face and nose if you going out !!!";
    }else if(id >= 801 && id <= 804){
        wIcon.src = "./assets/Icons/cloud.svg";
        wSuggestion.innerText = "it's cold outside, Mind Carying a jacket";
    }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
        wIcon.src = "./assets/Icons/rain.svg";
        wSuggestion.innerText = "It's currently raining outside, don't forget to carry an umbrella";
    }



    wrapper.querySelector('.current-temp').innerText = Math.floor(temp);
    wrapper.querySelector('.desc').innerText = description;



    //console.log(info);
}
