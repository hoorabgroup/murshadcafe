(function(){
  const PHONE = "923005760395";
  function waLink(text){ return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text); }

  // ---------- Order modal ----------
  const backdrop = document.getElementById('modalBackdrop');
  if(backdrop){
    const modalName = document.getElementById('modalName');
    const modalOptions = document.getElementById('modalOptions');
    const modalOrderBtn = document.getElementById('modalOrderBtn');

    function openModal(name, options){
      modalName.textContent = name;
      modalOptions.innerHTML = '';
      function setLink(opt){
        const label = opt.label ? (name + " (" + opt.label + ")") : name;
        modalOrderBtn.href = waLink("Assalam o Alaikum, mujhe order karna hai: " + label + " - Rs." + opt.price);
      }
      options.forEach((opt,i)=>{
        const row = document.createElement('div');
        row.className = 'modal-option' + (i===0 ? ' active':'');
        row.innerHTML = '<span class="oname">'+(opt.label||name)+'</span><span class="oprice nums">Rs. '+opt.price+'</span>';
        row.addEventListener('click', ()=>{
          document.querySelectorAll('.modal-option').forEach(el=>el.classList.remove('active'));
          row.classList.add('active');
          setLink(opt);
        });
        modalOptions.appendChild(row);
      });
      setLink(options[0]);
      backdrop.classList.add('open');
    }
    window.openOrderModal = openModal;

    document.getElementById('modalClose').addEventListener('click', ()=>backdrop.classList.remove('open'));
    backdrop.addEventListener('click',(e)=>{ if(e.target===backdrop) backdrop.classList.remove('open'); });
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ backdrop.classList.remove('open'); const cp=document.getElementById('callPopover'); if(cp) cp.classList.remove('open'); }});
  }

  // ---------- Wire up data-driven order triggers ----------
  document.querySelectorAll('[data-order-name]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const name = el.getAttribute('data-order-name');
      const opts = [];
      if(el.hasAttribute('data-price')){
        opts.push({price: el.getAttribute('data-price')});
      }
      if(el.hasAttribute('data-half')){
        opts.push({label:'Half', price:el.getAttribute('data-half')});
        opts.push({label:'Full', price:el.getAttribute('data-full')});
      }
      if(el.hasAttribute('data-medium')){
        opts.push({label:'Medium', price:el.getAttribute('data-medium')});
        opts.push({label:'Large', price:el.getAttribute('data-large')});
      }
      if(el.hasAttribute('data-sizes')){
        const sizes = JSON.parse(el.getAttribute('data-sizes'));
        const labels = ["Small","Medium","Large","X-Large"];
        sizes.forEach((p,i)=>{ if(p) opts.push({label:labels[i], price:p}); });
      }
      if(window.openOrderModal) window.openOrderModal(name, opts);
    });
  });

  // ---------- Ice cream / ask-price buttons ----------
  document.querySelectorAll('[data-ask-price]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const name = el.getAttribute('data-ask-price');
      window.open(waLink("Assalam o Alaikum, mujhe pochna tha: " + name + " ka price kya hai?"), '_blank');
    });
  });

  // ---------- Call popover ----------
  const callBtn = document.getElementById('callBtn');
  const callPopover = document.getElementById('callPopover');
  if(callBtn && callPopover){
    callBtn.addEventListener('click',(e)=>{ e.stopPropagation(); callPopover.classList.toggle('open'); });
    document.addEventListener('click',(e)=>{ if(!callPopover.contains(e.target) && e.target!==callBtn){ callPopover.classList.remove('open'); }});
  }

  // ---------- Mobile nav ----------
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if(navToggle && mobileNav){
    navToggle.addEventListener('click', ()=> mobileNav.classList.toggle('open'));
  }

  // ---------- Global WhatsApp buttons ----------
  const genericLink = waLink("Assalam o Alaikum, main Murshid Chay Cafe se order karna chahta hoon.");
  document.querySelectorAll('.js-wa-generic').forEach(el=>{
    if(el.tagName === 'BUTTON'){ el.addEventListener('click', ()=>window.open(genericLink,'_blank')); }
    else { el.href = genericLink; }
  });
})();
