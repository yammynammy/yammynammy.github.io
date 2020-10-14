let test = new Date ();
let btn = document.getElementById('btn');
let main = document.getElementById('main');
let hb = document.getElementById('div');
let fall = document.getElementById('fall');

btn.onclick = function () {
    console.log('rabotaet');
    main.style.display = 'none';
    hb.style.display = 'flex';
    fall.style.display = 'none';
    
};

if (test.getDate() == 14  && test.getMonth() == 9) {
    console.log('rabotaet');
    btn.removeAttribute('disabled');
}

else {
    console.log('error')
    btn.setAttribute("disabled", "disabled");
}

//Салют
var b = document.getElementById("div");
var c = document.getElementById("canvas");
var a = c.getContext("2d");
var W=c.width=document.body.clientWidth; //ширина - по размерам клиенской части окна
var H=c.height=screen.height; //высота - это не "во весь экран", а больше из-за служебных областей окна
var Objects=[];
var Colors="255,0,0;0,255,0;0,0,255;255,255,0;255,0,255;0,255,255;255,255,204;255,204,255;204,255,255".split(";");
var timeInterval=20; //частота обновления, мс
var petardColor="rgba(255,0,0,.55)"; //цвет петарды до взрыва
var numRays=20; //количество лучей <s>чучхе</s> при взрыве
var percentAlive=70; //процент пускаемых, 0-все, 100-никто
var petardRadius=2; //начальный радиус петарды, пикс.
var fireRadius=30; //радиус для вызрыва, пикс.
var fireBallRadius=10; //радиус отдельного огонька при взрыве, пикс.
var img = new Image();

img.src = '../img/fudzi.jpg';

DeleteObject=function (obj,t) {
 if(t) delete Objects[obj];
 else Objects[Objects.length]=obj;
};

DrawBack=function() {
 a["globalCompositeOperation"]="source-over"; //новая фигура визуализируется поверх уже добавленных на холст
 a.fillStyle="rgba(0,0,0,1)";
//  a.fillRect(0,0,W,H);
 a.drawImage(img, 0, 0, W, H);
};

ColorPath=function(x,y,r,f) {
 a.beginPath();
 a.arc(x,y,r,0,Math.PI*2,0);
 a.fillStyle=f;
 a.fill();
};

FinalDraw=function(k,x,y,g){
 this.k=k;
 this.x=k?x:(Math.random()*(W-200))+100;
 this.y=k?y:H;
 this.t=0;
 this.j=k?20:70;
 this.a=k?Math.random()*360:240+Math.random()*70;
 this.s=Math.random()*3+2;
 this.g=g;

 this.thisDraw=function() {
  this.t++;
  if(this.k) { //взрыв
   f=(Math.PI/180)*this.a;
   this.x+=Math.cos(f)*this.s;
   this.y+=Math.sin(f)*this.s;
   a["globalCompositeOperation"]="lighter";
   g=a.createRadialGradient(this.x,this.y,1,this.x,this.y,fireBallRadius);
   g["addColorStop"](0,"rgba(255,255,255,.1)");
   g["addColorStop"](1,"rgba("+this.g+",.03)");
   ColorPath(this.x,this.y,fireRadius,g);
  }
  else { //пуск петарды
   f=(Math.PI/180)*this.a;
   this.x+=Math.cos(f)*5; //
   this.y+=Math.sin(f)*7; //увеличьте для взрывов выше
   ColorPath(this.x,this.y,petardRadius,petardColor);
  }
 }
};

setInterval(
 function() {
  DrawBack();
  for (q in Objects) {
   var obj=Objects[q];
   obj.thisDraw();
   if(obj.t>obj.j) {
    if(!obj.k) {
     h=Math.random()*Colors.length|0;
     for (c=0;c<numRays;c++) DeleteObject(new FinalDraw(1,obj.x,obj.y,Colors[h]));
    }
    DeleteObject(q,1);
   }
  }
  var c=Math.random()*100;
  if(c>percentAlive) DeleteObject(new FinalDraw);
 },timeInterval);

 //Flags

const strands = Array.from(document.querySelectorAll('.banner'));
const duration = 5450;
const supportsOffsetPath = 
        window.CSS
        && CSS.supports
        && CSS.supports('offset-path', "path('M0,0 L1,1')");
const rxRandomNegative = -20;
const rxRandomNegativeBase = -30;
const rxRandomPositive = 40;
const rxRandomPositiveBase = 30;

if (document.documentElement.animate) {
  strands.forEach(animateStrands);
}

function animateStrands(strand) {
  let flags = Array.from(strand.querySelectorAll('.flag'));
  let strandPathDuration = Math.random() * (2 * duration) + duration;
  let fromPath = "path('M0,0 C100,100 700,200 800,100')";
  let toPath = `path('M0,0 C${Math.random() * 20 + 80},${Math.random() * 20 + 80} ${Math.random() * -50 + 700},${Math.random() * 100} 800,100')`;

  flags.forEach((flag, i) => {
    flag.style.offsetDistance = `${80 + i * 740 / flags.length}px`;
    animateWindRotate(flag);
    animateWindCurve(flag, fromPath, toPath, strandPathDuration);
  });

  if (supportsOffsetPath) {
    animateStringInWind(strand, fromPath, toPath, strandPathDuration);
  }
}

function animateWindRotate(flag) {
  flag.animate(getRandomizedFlagFrames(), {
    duration: duration,
    iterations: Infinity,
    direction: 'alternate',
    delay: 1000 * Math.random() - 1000
  });
}
function animateWindCurve(flag, fromPath, toPath, strandPathDuration) {
  flag.animate([
    {offsetPath: fromPath},
    {offsetPath: toPath}
  ], {
    duration: strandPathDuration,
    iterations: Infinity,
    easing: 'ease-in-out',
    direction: 'alternate'
  });
}
function animateStringInWind(strand, fromPath, toPath, strandPathDuration) {
  let stringy = strand.querySelector('.string path');
  if (stringy) {
    stringy.animate([
      {d: fromPath},
      {d: toPath}
    ], {
      duration: strandPathDuration,
      iterations: Infinity,
      easing: 'ease-in-out',
      direction: 'alternate'
    });
  }
}

function getRandomizedFlagFrames() {
    let easing1 = `cubic-bezier(${Math.random() * .1 + .3},0,${Math.random() * .1 + .3},${Math.random() * .15 + .95})`;
    let easing2 = `cubic-bezier(${Math.random() * .1 + .3},0,${Math.random() * .1 + .3},${Math.random() * .15 + .95})`
  return [
      { 
        transform: 'rotateX(0deg)',
        filter: 'grayscale(5%)'
      }, { 
        transform: `rotateX(${Math.random() * rxRandomNegative + rxRandomNegativeBase}deg)`,
        filter: 'grayscale(25%)', //shadows for when rotating away from you
        easing: easing1
      }, {
        transform: `rotateX(${Math.random() * rxRandomPositive + rxRandomPositiveBase}deg)`,
        filter: 'grayscale(0%)',
        easing: easing1
      }, {
        transform: `rotateX(${Math.random() * rxRandomNegative + rxRandomNegativeBase}deg)`,
        filter: 'grayscale(25%)',
        easing: easing2
      }, {
        transform: `rotateX(${Math.random() * rxRandomPositive + rxRandomPositiveBase}deg)`,
        filter: 'grayscale(0%)',
        easing: easing2
      }
    ]
}