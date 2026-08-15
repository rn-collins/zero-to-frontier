// Shared behavior: navigation, motion-safe reveals, freshness disclosure, and local progress.
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
    },{threshold:0.1});
    reveals.forEach(el=>io.observe(el));
  } else {
    reveals.forEach(el=>el.classList.add('show'));
  }

  document.querySelectorAll('.foot-col p').forEach(function(p){
    if(p.textContent.includes('fully-sourced guide')) p.textContent = 'A free, source-forward guide to understanding and using artificial intelligence.';
  });

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const volatile = ['tools.html','frontier.html','library.html'].includes(current);
  const freshness = document.createElement('aside');
  freshness.className = 'freshness-bar';
  freshness.setAttribute('aria-label','Content freshness');
  const strong = document.createElement('strong');
  strong.textContent = 'Editorial snapshot · reviewed August 2026. ';
  const detail = document.createElement('span');
  detail.textContent = volatile
    ? 'This page contains fast-changing tools, links, or frontier claims. Sources are visible, but they are not monitored continuously—recheck the provider or primary source before acting.'
    : 'This is a maintained educational reference, not a live feed. Use the dated sources and recheck time-sensitive claims before acting.';
  freshness.append(strong, detail);
  const header = document.querySelector('.site-nav');
  if(header) header.insertAdjacentElement('afterend', freshness);

  const pages = ['start-here.html','history.html','concepts.html','techniques.html','use-cases.html','tools.html','playbooks.html','templates.html','frontier.html','library.html','about.html'];
  if(!pages.includes(current)) return;
  let completed = [];
  try { completed = JSON.parse(localStorage.getItem('z2f_completed') || '[]'); } catch(e) {}
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'progress-chip';
  function paint(){
    const done = completed.includes(current);
    chip.textContent = done ? '✓ Completed · ' + completed.length + '/11' : 'Mark complete · ' + completed.length + '/11';
    chip.setAttribute('aria-pressed', done ? 'true' : 'false');
  }
  chip.addEventListener('click', function(){
    completed = completed.includes(current) ? completed.filter(p=>p!==current) : [...completed,current];
    try { localStorage.setItem('z2f_completed', JSON.stringify(completed)); } catch(e) {}
    paint();
  });
  paint();
  document.body.appendChild(chip);
});
