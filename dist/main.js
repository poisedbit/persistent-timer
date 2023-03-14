(()=>{"use strict";const t={name:"timer",initialState:{clock:{minutes:0,seconds:0},settings:{startTime:0,duration:0,isCountingUp:!1,isTimerRunning:!1}},reducers:{setClock:(t,e)=>Object.assign(Object.assign({},t),{clock:Object.assign(Object.assign({},t.time),{minutes:e.payload.minutes,seconds:e.payload.seconds})}),setStartTime:(t,e)=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{startTime:e.payload})}),setDuration:(t,e)=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{duration:e.payload})}),setIsCountingUp:(t,e)=>Object.assign(Object.assign({},t),{settings:Object.assign(Object.assign({},t.settings),{IsCountingUp:e.payload})}),setSettings:(t,e)=>Object.assign(Object.assign({},t),{settings:e.payload})}};class e{static createStore(t){const e=this.addSlices(t.slices);this.rootReducer=this.combineReducers(e)}static getState(){return this.state}static getSliceState(t){return this.state[t]}static dispatch(t,e){this.state=this.rootReducer(this.state,{type:t,payload:e}),this.persistState(),this.notifyListeners()}static subscribe(t){return this.listeners.push(t),()=>{this.listeners.splice(this.listeners.indexOf(t),1)}}static addSlices(t){const e={},s=this.loadState();return s?(this.state=s,t.forEach((t=>{Object.values(t.reducers).forEach((s=>{e[`${t.name}/${s.name}`]=s}))}))):t.forEach((t=>{this.state[t.name]=t.initialState,Object.values(t.reducers).forEach((s=>{e[`${t.name}/${s.name}`]=s}))})),e}static combineReducers(t){return(e,s)=>{const n=s.type.split("/")[0],i=e[n],a=t[s.type];return Object.assign(Object.assign({},e),{[n]:a(i,s)})}}static persistState(){const t=JSON.stringify(this.state);localStorage.setItem("state",t)}static loadState(){const t=localStorage.getItem("state");return t?JSON.parse(t):null}static notifyListeners(){this.listeners.forEach((t=>{t()}))}}e.state={},e.listeners=[];class s{constructor(){this.elements=this.createElements();const{clock:t}=e.getSliceState("timer");this.elements.minutes.innerHTML=t.minutes,this.elements.seconds.innerHTML=t.seconds,this.setupEventListeners(),e.subscribe((()=>{const{clock:t}=e.getSliceState("timer");this.elements.minutes.innerHTML=t.minutes,this.elements.seconds.innerHTML=t.seconds}))}createElements(){const t=document.createElement("div");return t.className="timer",t.innerHTML='\n\t\t<div class="timer-clock">\n\t\t\t<div class="clock-minutes">\n\t\t\t\tminutes\n\t\t\t</div>\n\t\t\t<div class="clock-seconds">\n\t\t\t\tseconds\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="timer-inputs">\n\t\t\t<label> Duration:\n\t\t\t\t<input\n\t\t\t\t\tclass="timer-input"\n\t\t\t\t\ttype="number"\n\t\t\t\t\tvalue="0"\n\t\t\t\t\tmin="0"\n\t\t\t\t\tmax="60"\n\t\t\t\t\ttitle="miliseconds"\n\t\t\t\t/>\n\t\t\t</label>\n\t\t\t<select class="timer-select-isCountingUp" title="Count up or down?">\n\t\t\t\t<option value="false">Down</option>\n\t\t\t\t<option value="true">Up</option>\n\t\t\t</select>\n\t\t\t<button class="timer-start-btn" type="button">Start</button>\n\t\t</div>\n\t\t',{root:t,minutes:t.querySelector(".clock-minutes"),seconds:t.querySelector(".clock-seconds"),input:t.querySelector(".timer-input"),select:t.querySelector(".timer-select-isCountingUp"),btnStart:t.querySelector(".timer-start-btn")}}setupEventListeners(){this.elements.input.addEventListener("change",(t=>{e.dispatch("timer/setDuration",parseInt(t.currentTarget.value))})),this.elements.select.addEventListener("change",(t=>{e.dispatch("timer/setIsCountingUp",t.currentTarget.value)})),this.elements.btnStart.addEventListener("click",(()=>{this.count()}))}count(){const{settings:t}=e.getSliceState("timer"),s=t.duration,n=t.isCountingUp;let i=t.startTime;i||(i=Date.now());const a=setInterval((()=>{const t=Date.now()-i;let c,r;if(t>=s)clearInterval(a),c=0,r=0,e.dispatch("timer/setSettings",{startTime:0,duration:s,isCountingUp:n,isTimerRunning:!1});else{const a=s-t;c=Math.floor(a%36e5/6e4),r=Math.ceil(a%6e4/1e3),60===r&&(c-=1,c=c<1?0:c,r=0),console.log(a,c,r),e.dispatch("timer/setSettings",{startTime:i,duration:s,isCountingUp:n,isTimerRunning:!0})}e.dispatch("timer/setClock",{minutes:c,seconds:r})}),1e3)}resumeCountIfOnGoing(){const{settings:t}=e.getSliceState("timer");t.isTimerRunning&&this.count()}}(class{static main(){var n;const i=new DocumentFragment;e.createStore({slices:[t]});const a=new s;i.append(document.createTextNode("Test")),i.append(a.elements.root),null===(n=document.getElementById("app"))||void 0===n||n.appendChild(i)}}).main()})();