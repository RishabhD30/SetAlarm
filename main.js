const hour = document.querySelector("#hour"); 
const sec = document.querySelector("#sec"); 
const min = document.querySelector("#min"); 
const ampm = document.querySelector("#ampm"); 
const setBtn = document.querySelector("#setBtn"); 
const clearBtn = document.querySelector("#clearBtn"); 
const display = document.querySelector("#display")
const audio = new Audio("ring.mp3");

let alarmCount = 0 ;
let alarmListArr = [];

let timmeed;
//set hour
    for (let i = 12; i >= 0 ; i--) {
        let fortI = i<10 ? i : i;
        let option = `<option value=${fortI}> ${fortI}</option>`
        hour.firstElementChild.insertAdjacentHTML("afterend", option);
    }

//set min
for (let i = 59; i >= 0 ; i--) {
    i = i<10 ? "0"+i : i;
    let option = `<option value=${i}>${i}</option>`
    min.firstElementChild.insertAdjacentHTML("afterend", option);
}

//set sec
for (let i = 59; i >= 0 ; i--) {
    i = i<10 ? "0"+i : i;
    let option = `<option value=${i}>${i}</option> `
    sec.firstElementChild.insertAdjacentHTML("afterend", option);
}

//set ampm
for (let i = 2; i > 0 ; i--) {
    let am_pm = i==1 ? "AM" : "PM";
    let option = `<option value=${am_pm}>${am_pm}</option> `
    ampm.firstElementChild.insertAdjacentHTML("afterend", option);
}

// Real Time Clock
const real = document.querySelector("#realTime");
const alarm = ()=> {
    setInterval(alarmly,1000)

    function alarmly(){ 
        let date = new Date();
        real.innerHTML = date.toLocaleTimeString();
    }
}
alarm();

function check(alarmTime){
    setInterval(() => {
        
        const date = new Date();
        timmeed = date.toLocaleTimeString();
        // timmeed = date.toLocaleTimeString();
        if(timmeed == alarmTime){
            audio.play();
            alert(`Hey There!!, u have an Alarm of ${alarmTime}`);   
            audio.pause();
        }
    }, 100);
}

/* SET ALARMM */
const set_Alarm = () => {
    let time  = `${hour.value}:${min.value}:${sec.value} ${ampm.value}`;
    console.log(time);
    
    if(time.includes("Hr") || time.includes("min") || time.includes("sec") || time.includes("AM/PM")){
        alert("Please, Select Valid Input");
    }else {
        alarmCount++;
        display.innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${hour.value}:${min.value}:${sec.value} ${ampm.value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
        alert(`Your Alarm Set ${alarmTime}.`);
        check(alarmTime)
        
    }
}    
/* Delete Btn */
function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
    alert(`Your Alarm ${click_id} Delete.`);
}

const ClearAll = () =>{ 
    display.innerHTML = " ";
    console.log(`Clear all the Alarms!`);
    sound.pause();
}

/*  All The Events are mentioned below */ 
setBtn.addEventListener('click' , set_Alarm);

clearBtn.addEventListener('click', ClearAll);


