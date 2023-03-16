document.addEventListener("DOMContentLoaded", function() {
	setTimeout(function() {
		//loader
        document.querySelector(".spinner").classList.add("hidden");
		//page
        document.querySelector(".all").classList.remove("hidden");
	//}, 1000);
	}, 6000);
});


/* get today's date */


  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  const NowShowDate = document.querySelector('.date-formate-local');

  const date = new Date();
  const currentYear = date.getFullYear();
  const today = date.getDate();
const currentMonth = date.getMonth() + 1; 
today.toString();

const ThisDay = (`${today} / ${currentMonth} / ${currentYear}`);

//console.log(ThisDay); 



todayShowDate.textContent = ThisDay;

/* time section */


/* Weather Section */
let meteo_section = document.querySelector('.meteo-section')

const wrapper = document.querySelector(".meteo-section"),
      
      locationBtn = wrapper.querySelector("button");
      

wIcon = document.querySelector(".meteo-section img");
wSuggestion = document.querySelector(".suggestion");

let api;

document.addEventListener("DOMContentLoaded", () => {
    if(navigator.geolocation){
        //check if the navigator supports geolocalisation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
         
    }else {
        alert("this browser doesn't support geolocation api !!!")
    }

    Notification.requestPermission().then(perm => {  // works only on desktop
        if (perm === 'granted') {
            new Notification('Lilith: hey teddy')
        } 
    })
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

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${newApiKey}`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${newApiKey}`;
    fetchData();
}

function onError(error){
    CONSOLE.log(error.message);
}

function fetchData(){
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
    });
}

function weatherDetails(info){
    //getting required properties values from the json object given in the console 
    let city = info.name;
    
    const country = info.sys.country;
    const temp = info.main.temp;
    const {description, id} = info.weather[0];

    console.log(city, country)
    console.log(info)

    let location_min =document.querySelector('.loacion')
    location_min.innerText = 'Location : ' + (city)

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

    /* change the message according to temperature */

    console.log("the temperature is : ",Math.floor(temp))
   /*  if(temp >= 0 && temp <= 10){
        wSuggestion.innerText = "What a good weather to go for a out";
    }else if(temp >= 11 && temp <= 20){  
        wSuggestion.innerText = "Going out ? mind taking an umbrella and something to keep you dry";
    }else if(temp >= 21 && temp <= 30){
        wSuggestion.innerText = "Snowing Outside, stay warm and avoid going out !!!";
    }else if(temp >= 31 && temp <= 40){
        wSuggestion.innerText = "Hazy .... take something to cover your face and nose if you going out !!!";
    }else if(temp <= 0){
        wSuggestion.innerText = "it's extremely cold outside, Mind Carying a jacket";
    } */



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
//console.log(DateYesterday);

let nowHour = date.getHours();
let nowMinutes = date.getMinutes();
let now = `this is the current time : ${nowHour} / ${nowMinutes}`;

// console.log(now)
let welcomeMessage = document.getElementById('w_text');
if (nowHour >= 5 && nowHour < 12) {
    welcomeMessage.innerText = "Good Morning Teddy, welcome back !!!";
} else if(nowHour >= 12 && nowHour <= 17){
    welcomeMessage.innerText = "Good Afternoon Teddy, welcome back !!!";
} else if(nowHour > 17 && nowHour <= 22){
    welcomeMessage.innerText = "Good Evening Teddy, welcome back !!!";
} else if(nowHour > 22 && nowHour <= 24){
    welcomeMessage.innerText = "Hello Teddy, You should consider going to bed  !!!";
} else {
    welcomeMessage.innerText = "Hello Teddy, welcome back  !!!";
}



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





/* todo app part */

window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	
	const newTodoForm = document.querySelector('#new-todo-form');


	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
		todoItem.classList.add('flex');
		todoItem.classList.add('flex-row');
		todoItem.classList.add('items-start');
		todoItem.classList.add('justify-start');
		todoItem.classList.add('gap-2');
		todoItem.classList.add('mb-1');
		todoItem.classList.add('w-full');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		
		actions.classList.add('actions');
		edit.classList.add('edit');
		edit.classList.add('mr-1');
		edit.classList.add('event');
		edit.classList.add('p-1');
		deleteButton.classList.add('delete');
        deleteButton.classList.add('edit');
		deleteButton.classList.add('mr-1');
		deleteButton.classList.add('event');
		deleteButton.classList.add('p-1');

		content.innerHTML = `<input class="p-1 w-64 text-slate-800" type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = `<i class="ri-edit-line p-1"></i>`;
		deleteButton.innerHTML = `<i class="ri-delete-bin-5-line p-1"></i>`;

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}

/* show diff pages contents  */
//buttons from navbar
let homeBtn = document.querySelector('#homeBtn');
let todosBtn = document.querySelector('#todosBtn');
let newsBtn = document.querySelector('#newsBtn');
let messageBtn = document.querySelector('#messageBtn');
let walletBtn = document.querySelector('#walletBtn');
let profileBtn = document.querySelector('#profileBtn');

//different pages

let homePage = document.querySelector('#homePage');
let tasksPage = document.querySelector('#tasksPage');
let newsPage = document.querySelector('#newsPage');
let messagePage = document.querySelector('#messagePage');
let walletPage = document.querySelector('#walletPage');
let profilePage = document.querySelector('#profilePage');


// functions show or hide page

homeBtn.addEventListener("click", () => {
    homePage.classList.remove("hidden");
    tasksPage.classList.add("hidden");
    newsPage.classList.add("hidden");
    messagePage.classList.add("hidden");
    walletPage.classList.add("hidden");
    profilePage.classList.add("hidden");
})
todosBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    tasksPage.classList.remove("hidden");
    newsPage.classList.add("hidden");
    messagePage.classList.add("hidden");
    walletPage.classList.add("hidden");
    profilePage.classList.add("hidden");
})
newsBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    tasksPage.classList.add("hidden");
    newsPage.classList.remove("hidden");
    messagePage.classList.add("hidden");
    walletPage.classList.add("hidden");
    profilePage.classList.add("hidden");
})
messageBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    tasksPage.classList.add("hidden");
    newsPage.classList.add("hidden");
    messagePage.classList.remove("hidden");
    walletPage.classList.add("hidden");
    profilePage.classList.add("hidden");
})
walletBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    tasksPage.classList.add("hidden");
    newsPage.classList.add("hidden");
    messagePage.classList.add("hidden");
    walletPage.classList.remove("hidden");
    profilePage.classList.add("hidden");
})
profileBtn.addEventListener("click", () => {
    homePage.classList.add("hidden");
    tasksPage.classList.add("hidden");
    newsPage.classList.add("hidden");
    messagePage.classList.add("hidden");
    walletPage.classList.add("hidden");
    profilePage.classList.remove("hidden");
})
// functions add or remove active class on navbar

homeBtn.addEventListener("click", () => {
    homeBtn.classList.add("active");
    todosBtn.classList.remove("active");
    newsBtn.classList.remove("active");
    messageBtn.classList.remove("active");
    walletBtn.classList.remove("active");
    profileBtn.classList.remove("active");
})
todosBtn.addEventListener("click", () => {
    homeBtn.classList.remove("active");
    todosBtn.classList.add("active");
    newsBtn.classList.remove("active");
    messageBtn.classList.remove("active");
    walletBtn.classList.remove("active");
    profileBtn.classList.remove("active");
})
newsBtn.addEventListener("click", () => {
    homeBtn.classList.remove("active");
    todosBtn.classList.remove("active");
    newsBtn.classList.add("active");
    messageBtn.classList.remove("active");
    walletBtn.classList.remove("active");
    profileBtn.classList.remove("active");
})
messageBtn.addEventListener("click", () => {
    homeBtn.classList.remove("active");
    todosBtn.classList.remove("active");
    newsBtn.classList.remove("active");
    messageBtn.classList.add("active");
    walletBtn.classList.remove("active");
    profileBtn.classList.remove("active");
})
walletBtn.addEventListener("click", () => {
    homeBtn.classList.remove("active");
    todosBtn.classList.remove("active");
    newsBtn.classList.remove("active");
    messageBtn.classList.remove("active");
    walletBtn.classList.add("active");
    profileBtn.classList.remove("active");
})
profileBtn.addEventListener("click", () => {
    homeBtn.classList.remove("active");
    todosBtn.classList.remove("active");
    newsBtn.classList.remove("active");
    messageBtn.classList.remove("active");
    walletBtn.classList.remove("active");
    profileBtn.classList.add("active");
})

//savings part

let add_goalBtn = document.querySelector('#add_goal');
let exit_add_GoalBtn = document.querySelector('#exit_add_Goal');
let saving_new = document.querySelector('#saving_new');
let saving_list = document.querySelector('#saving_list');


add_goalBtn.addEventListener("click", () => {
    saving_list.classList.add("hidden");
    saving_new.classList.remove("hidden");
    add_goalBtn.classList.add("hidden");
})
exit_add_GoalBtn.addEventListener("click", () => {
    saving_list.classList.remove("hidden");
    saving_new.classList.add("hidden");
    add_goalBtn.classList.remove("hidden");
})


