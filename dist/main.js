(()=>{"use strict";const t={name:"timer",initialState:{clock:{minutes:0,seconds:0},settings:{startTime:0,duration:0,isCountingUp:!1,isRunning:!1}},reducers:{computeClockCount(t){const e=Date.now()-t.settings.startTime;let s=0,n=0;return t.settings.isCountingUp?(s=Math.floor(e%36e5/6e4),n=Math.floor(e%6e4/1e3)):(s=Math.floor((t.settings.duration-e)%36e5/6e4),n=Math.ceil((t.settings.duration-e)%6e4/1e3),60===n&&(s-=1,s=s<1?0:s,n=0)),console.log(e,t.settings.duration-e,"l",s,n),Object.assign(Object.assign({},t),{clock:{minutes:s,seconds:n}})},startCount:t=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{isRunning:!0})}),resetCount:t=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{startTime:0,isRunning:!1})}),setClock:(t,e)=>Object.assign(Object.assign({},t),{clock:Object.assign(Object.assign({},t.time),{minutes:e.payload.minutes,seconds:e.payload.seconds})}),resetClock(t){const e=Date.now()-t.settings.startTime;return t.settings.isCountingUp?Object.assign(Object.assign({},t),{minutes:Math.floor(e%36e5/6e4),seconds:Math.floor(e%6e4/1e3)}):Object.assign(Object.assign({},t),{clock:{minutes:0,seconds:0}})},setStartTime:(t,e)=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{startTime:e.payload})}),setDuration:(t,e)=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{duration:e.payload})}),setIsCountingUp:(t,e)=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{isCountingUp:e.payload})})}};class e{static createStore(t){const e=this.addSlices(t.slices);this.rootReducer=this.combineReducers(e)}static getState(){return this.state}static dispatch(t,e){this.state=this.rootReducer(this.state,{type:t,payload:e}),this.persistState(),this.notifyListeners()}static subscribe(t){return this.listeners.push(t),()=>{this.listeners.splice(this.listeners.indexOf(t),1)}}static addSlices(t){const e={},s=this.loadState();return s?(this.state=s,t.forEach((t=>{Object.values(t.reducers).forEach((s=>{e[`${t.name}/${s.name}`]=s}))}))):t.forEach((t=>{this.state[t.name]=t.initialState,Object.values(t.reducers).forEach((s=>{e[`${t.name}/${s.name}`]=s}))})),e}static combineReducers(t){return(e,s)=>{const n=s.type.split("/")[0],i=e[n],c=t[s.type];return Object.assign(Object.assign({},e),{[n]:c(i,s)})}}static persistState(){const t=JSON.stringify(this.state);localStorage.setItem("state",t)}static loadState(){const t=localStorage.getItem("state");return t?JSON.parse(t):null}static notifyListeners(){this.listeners.forEach((t=>{t()}))}}e.state={},e.listeners=[];class s{constructor(){this.elements=this.createElements(),this.setupEventListeners(),e.subscribe((()=>{const{minutes:t,seconds:s}=e.getState().timer.clock;this.setClock(t,s)})),this.resumeCountIfOngoing()}createElements(){const t=document.createElement("div");return t.className="timer",t.innerHTML=`\n\t\t<div class="timer-clock">\n\t\t\t<div class="clock-minutes">\n\t\t\t\t${e.getState().timer.clock.minutes}\n\t\t\t</div>\n\t\t\t<div class="clock-seconds">\n\t\t\t\t${e.getState().timer.clock.seconds}\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="timer-inputs">\n\t\t\t<label> Duration:\n\t\t\t\t<input\n\t\t\t\t\tclass="timer-input"\n\t\t\t\t\ttype="number"\n\t\t\t\t\tvalue="0"\n\t\t\t\t\tmin="0"\n\t\t\t\t\tmax="60"\n\t\t\t\t\ttitle="miliseconds"\n\t\t\t\t/>\n\t\t\t</label>\n\t\t\t<select class="timer-select-isCountingUp" title="Count up or down?">\n\t\t\t\t<option value="false">Down</option>\n\t\t\t\t<option value="true">Up</option>\n\t\t\t</select>\n\t\t\t<button class="timer-start-btn" type="button">Start</button>\n\t\t</div>\n\t\t`,{root:t,minutes:t.querySelector(".clock-minutes"),seconds:t.querySelector(".clock-seconds"),input:t.querySelector(".timer-input"),select:t.querySelector(".timer-select-isCountingUp"),btnStart:t.querySelector(".timer-start-btn")}}setClock(t,e){this.elements.minutes.innerHTML=t.toString(),this.elements.seconds.innerHTML=e.toString()}setupEventListeners(){this.elements.input.addEventListener("change",(t=>{e.dispatch("timer/setDuration",parseInt(t.currentTarget.value))})),this.elements.select.addEventListener("change",(t=>{e.dispatch("timer/setIsCountingUp","true"===t.currentTarget.value)})),this.elements.btnStart.addEventListener("click",(()=>{this.count()}))}count(){const{startTime:t,duration:s,isCountingUp:n}=e.getState().timer.settings;t||(console.log("test"),e.dispatch("timer/setStartTime",Date.now())),e.dispatch("timer/startCount");const i=setInterval((()=>{Date.now()-e.getState().timer.settings.startTime>=s?(clearInterval(i),e.dispatch("timer/resetClock"),e.dispatch("timer/resetCount")):e.dispatch("timer/computeClockCount"),console.log(e.getState().timer.clock)}),1e3)}resumeCountIfOngoing(){const{isRunning:t}=e.getState().timer.settings;if(t){e.dispatch("timer/computeClockCount");const{minutes:t,seconds:s}=e.getState().timer.clock;this.setClock(t,s),this.count()}}}(class{static main(){var n;const i=new DocumentFragment;e.createStore({slices:[t]});const c=new s;i.append(document.createTextNode("Test")),i.append(c.elements.root),null===(n=document.getElementById("app"))||void 0===n||n.appendChild(i)}}).main()})();