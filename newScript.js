/* get today's date */
//const ThisDay = 


  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  const NowShowDate = document.querySelector('.date-formate-local');

  const date = new Date();
  const currentYear = date.getFullYear();
  const today = date.getDate();
const currentMonth = date.getMonth() + 1; 
today.toString();

const ThisDay = (`${today} / ${currentMonth} / ${currentYear}`);

console.log(ThisDay); 



todayShowDate.textContent = ThisDay;

/* time section */

  /* function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }
  
  currentTime();
  console.log(currentTime); */
  
/* Weather Section */


const wrapper = document.querySelector(".meteo-section"),
      
      locationBtn = wrapper.querySelector("button");
      
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

const newApiKey = '47dc35b3d4b2404b5638555fdec29645';

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${newApiKey}`;
    fetchData();

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


    // add send notifications
}



  /* news part */


  //get yesterday's date
  
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate() -1;
let DateYesterday = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
 console.log(DateYesterday);



  const newsList = document.getElementById('newsList')

  const apiKey = '3e00145765ac432598875286b1e44b0a'

  let topic ='crypto currency'

  let url = `https://newsapi.org/v2/everything?q=${topic}&from=${DateYesterday}&sortBy=publishedAt&apiKey=${apiKey}`


  fetch(url).then((res) => {
    return res.json()
  }).then((data) => {
    
    console.log(data)
    data.articles.forEach(article => {
      let li = document.createElement('li');
      li.setAttribute('class', 'event  mb-1 p-1');

      let a = document.createElement('a');
      a.setAttribute('href', article.url);
      a.setAttribute('target', '_blank')
      a.textContent=article.description;

      let top = document.createElement('span');
      top.setAttribute('class', 'flex flex-row items-center justify-between pl-3 pr-3 mb-1 w-full');

      let auth = document.createElement('p');
      auth.textContent=article.author;
      auth.setAttribute('class', 'font-bold text-sm');

      let p = document.createElement('p');
      p.textContent=article.publishedAt;
      p.setAttribute('class', 'font-bold text-sm');

      top.appendChild(auth);
      top.appendChild(p);

      li.appendChild(top);

      li.appendChild(a);
      


      newsList.appendChild(li);
    })
  })

/* show or hide Todos */
const showTodos = document.querySelector('#mybtn');
const showCalendar = document.querySelector('#mybtn_hide');

const thisCalendar = document.querySelector('.calendar');
const thisTodos = document.querySelector('#my_todos');

showTodos.addEventListener("click", () => {
    showCalendar.classList.remove("hide");
    showTodos.classList.add("hide");
    thisTodos.classList.remove("hide");
    thisTodos.classList.add("flex");
    thisCalendar.classList.add("hide");
})


showCalendar.addEventListener("click", () => {
    showCalendar.classList.add("hide");
    showTodos.classList.remove("hide");
    thisTodos.classList.remove("flex");
    thisTodos.classList.add("hide");
    thisCalendar.classList.remove("hide");
})

/* todo section */
/* 

window.addEventListener('load', ()=> {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    //const AddTodoBtn = document.querySelector('#add_todo');
    const todoForm = document.querySelector('#todo_form');

    todoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content_todo.value,
            done: false,
            createdAt: new Date().getTime()

        }

        todos.push(todo);

        localStorage.setItem('toddos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })
    DisplayTodos();
})

const todoItem = document.createElement('div');
function DisplayTodos () {
    const todoList = document.querySelector('#todo_list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
       


            todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const eraseBtn = document.createElement('button')

        input.type= 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        content.classList.add('todo_content');
        actions.classList.add('actions');
        eraseBtn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        
        eraseBtn.innerHTML = 'Erase';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(erase);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem); 
        
        
        
    })
}
*/






/* notifications section */


