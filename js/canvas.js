var init = function(){
  var isMobile = navigator.userAgent &&
    navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
  
  var ps = new ParticleSlider({
    ptlGap: isMobile ? 3 : 0,
    ptlSize: isMobile ? 3 : 1,
    width: 1e9,
    height: 1e9,
    mouseForce: 10000
  });
    
  var gui = new dat.GUI();
  gui.add(ps, 'ptlGap').min(0).max(5).step(1).onChange(function(){
    ps.init(true);
  });
  gui.add(ps, 'ptlSize').min(1).max(5).step(1).onChange(function(){
    ps.init(true);
  });
  gui.add(ps, 'restless');
  gui.addColor(ps, 'color').onChange(function(value){
    ps.monochrome = true;
    ps.setColor(value);
	  ps.init(true);
  });
  gui.close();
  
  (window.addEventListener
   ? window.addEventListener('click', function(){ps.init(true)}, false)
   : window.onclick = function(){ps.init(true)});
}

var initParticleSlider = function(){
  var psScript = document.createElement('script');
  (psScript.addEventListener
    ? psScript.addEventListener('load', init, false)
    : psScript.onload = init);
  psScript.src = 'js/particleslider.js';
	psScript.setAttribute('type', 'text/javascript');
  document.getElementById("particle-slider").appendChild(psScript);
}
(window.addEventListener ? window.addEventListener('load', initParticleSlider, false) : window.onload = initParticleSlider);
