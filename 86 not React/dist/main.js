(()=>{"use strict";class o{constructor(o,t,s){this.width=o,this.height=t,this.count=s}nextSlide(){console.log("Move forvard")}prevSlide(){console.log("Move back")}whoAmi(){console.log(this.width,this.height,this.count)}}new o(400,300,4).whoAmi(),console.log("button");const t=new class extends o{constructor(o,t,s,e){super(o,t,s),this.auto=e}play(){console.log(`Autoplay: ${this.auto}`)}}(400,300,4,!0);t.whoAmi(),t.play()})();