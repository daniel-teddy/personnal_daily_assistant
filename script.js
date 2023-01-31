const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  const localFormate = document.querySelector('.date-formate-local');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year;
    
    let first_day = new Date(year, month);
  
  
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
  
      let day = document.createElement('div');
  
      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;

        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
      }
      calendar_days.appendChild(day);
    }
  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function () {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentMonth.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentMonth.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  const NowShowDate = document.querySelector('.date-formate-local');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  NowShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
   /*  let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`; */
    todayShowTime.textContent = formateTimer;
  }, 1000);



  // news part
  
//get yesterday's date
  let date = new Date();
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



  //weather 


        const newApiKey = '47dc35b3d4b2404b5638555fdec29645';

        //let CurrentTemp = document.getElementById('current-temp');
        //CurrentTemp.textContent = '22';

        

   // console.log(city);

    
