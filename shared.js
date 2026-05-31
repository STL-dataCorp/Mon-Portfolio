// CURSOR
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
(function animRing(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; cursorRing.style.left=Math.round(rx)+'px'; cursorRing.style.top=Math.round(ry)+'px'; requestAnimationFrame(animRing); })();

// SCROLL PROGRESS
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll',()=>{ const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100; progressBar.style.width=pct+'%'; });

// NAV SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{ navbar.classList.toggle('scrolled',window.scrollY>60); });

// SET ACTIVE NAV
(function(){ const cur = window.location.pathname.replace(/\//,'') || 'index'; document.querySelectorAll('.nav-links a').forEach(a=>{ const href=a.getAttribute('href'); if(cur==='' && href==='index.html') a.classList.add('active'); else if(href===cur+'.html') a.classList.add('active'); }); })();

// CANVAS PARTICLES
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W,H,particles=[];
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
resize(); window.addEventListener('resize',resize);
class Particle {
  constructor(){ 
    this.x = Math.random() * W; 
    this.y = Math.random() * H; 
    this.vx = (Math.random() - .5) * .3; 
    this.vy = (Math.random() - .5) * .3; 
    
    // MODIFICATION : Les particules font maintenant entre 1.5 et 4.5 pixels
    this.r = Math.random() * 3 + 1.5; 
    
    // AJUSTEMENT : Légèrement plus douces en opacité pour un effet de profondeur chic
    this.alpha = Math.random() * .25 + .05; 
    
    this.color = Math.random() > .6 ? '0,212,255' : Math.random() > .5 ? '123,47,255' : '0,255,157'; 
  }
  update(){ 
    this.x += this.vx; 
    this.y += this.vy; 
    if(this.x < 0) this.x = W; 
    if(this.x > W) this.x = 0; 
    if(this.y < 0) this.y = H; 
    if(this.y > H) this.y = 0; 
  }
  draw(){ 
    ctx.beginPath(); 
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); 
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`; 
    ctx.fill(); 
  }
}
for(let i=0;i<100;i++) particles.push(new Particle());
function drawConnections(){ for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){ const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy); if(d<110){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(0,212,255,${.05*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke(); } } }
(function animate(){ ctx.clearRect(0,0,W,H); drawConnections(); particles.forEach(p=>{ p.update(); p.draw(); }); requestAnimationFrame(animate); })();

// SCROLL REVEAL
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'),i*120);
      e.target.querySelectorAll('.skill-bar-fill,.skill-item-fill').forEach(bar=>{ setTimeout(()=>{ bar.style.width=bar.dataset.width; },400+i*100); });
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));
