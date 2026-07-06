// Shared behavior across all pages: mobile nav toggle + scroll reveal
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
});
