  /* ============ Countdown Timer ============ */
  (function(){
    const timer = document.getElementById('topTimer');
    if(!timer) return;
    // 2h44m50s base
    let total = 2*3600 + 44*60 + 50;
    const dEl = timer.querySelector('[data-unit="d"]');
    const hEl = timer.querySelector('[data-unit="h"]');
    const mEl = timer.querySelector('[data-unit="m"]');
    const sEl = timer.querySelector('[data-unit="s"]');
    function tick(){
      if(total <= 0){ total = 24*3600; } // reinicia para parecer sempre ativo
      const d = Math.floor(total / 86400);
      const h = Math.floor((total % 86400) / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      dEl.textContent = String(d).padStart(2,'0');
      hEl.textContent = String(h).padStart(2,'0');
      mEl.textContent = String(m).padStart(2,'0');
      sEl.textContent = String(s).padStart(2,'0');
      total--;
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* ============ Tabs ============ */
  (function(){
    const tabs = document.querySelectorAll('.tab');
    const content = document.getElementById('tabContent');
    if(!tabs.length || !content) return;
    const contents = {
      '1': '<strong>As vendas travam</strong> quando o método antigo deixa de funcionar e a economia vira contra você. Mas existe um sistema simples e replicável que quase ninguém conhece. Um sistema que os ricos usam para continuar crescendo mesmo quando todos os outros estão quebrando. E agora você vai ter acesso a ele.',
      '2': '<strong>O lucro some</strong> quando você não tem clareza sobre onde o dinheiro entra e por onde ele escapa. Os ricos não dependem de sorte — eles têm método. Você vai aprender o sistema exato que blinda margem e gera caixa mesmo na crise.',
      '3': '<strong>O jogo parece perdido</strong> porque ninguém te ensinou as regras certas. A escola te formou para empregar dinheiro, não para multiplicá-lo. Dentro do evento você vai destravar o jogo real, com passo-a-passo aplicável já no dia seguinte.',
      '4': '<strong>As dívidas aumentam</strong> em ciclo, e a sensação é de afundar mais a cada mês. Existe uma saída estruturada — e ela começa por entender o mecanismo financeiro que mantém você preso. Vamos quebrar esse ciclo na prática.'
    };
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.dataset.tab;
        content.style.opacity = 0;
        setTimeout(() => {
          content.innerHTML = '<p>' + contents[key] + '</p>';
          content.style.opacity = 1;
        }, 150);
      });
    });
  })();

  /* ============ Reveal on scroll (subtle) ============ */
  (function(){
    if(!('IntersectionObserver' in window)) return;

    const cards = document.querySelectorAll('.crisis-card, .discover-card, .audience-card, .testimonial, .proof-photo');
    cards.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
    });

    const headings = document.querySelectorAll('h2.section-title, .section-lead, .section-kicker, .identified-box, .pricing, .seal, .guarantee-content');
    headings.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
    });

    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if(entry.isIntersecting){
          const delay = entry.target.classList.contains('crisis-card')
                     || entry.target.classList.contains('discover-card')
                     || entry.target.classList.contains('audience-card')
                     || entry.target.classList.contains('testimonial')
                     || entry.target.classList.contains('proof-photo')
                     ? i * 80 : 0;
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});

    cards.forEach(el => io.observe(el));
    headings.forEach(el => io.observe(el));

    // Section dividers — entram com scaleX
    const dividers = document.querySelectorAll('.section-divider');
    const ioDiv = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          ioDiv.unobserve(entry.target);
        }
      });
    }, {threshold:.5});
    dividers.forEach(d => ioDiv.observe(d));
  })();

  /* ============ Tilt sutil nos discover-cards ============ */
  (function(){
    if(window.matchMedia('(pointer: coarse)').matches) return; // desativa em touch
    const cards = document.querySelectorAll('.discover-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `translateY(-6px) rotateX(${-y*4}deg) rotateY(${x*4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();

  /* ============ Smooth scroll para âncoras ============ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if(id.length < 2) return;
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
