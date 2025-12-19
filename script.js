(function(){
  // Header scroll shadow toggle
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on view
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((e)=>{
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  }

  // Fireflies effect (solo en index)
  const canvas = document.querySelector('.fireflies-canvas');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Firefly {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;
        
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const alpha = this.opacity * pulse;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
        gradient.addColorStop(0, `rgba(255, 59, 48, ${alpha})`);
        gradient.addColorStop(0.4, `rgba(255, 100, 80, ${alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(255, 59, 48, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const fireflies = [];
    const fireflyCount = Math.min(Math.floor(canvas.width * canvas.height / 15000), 30);
    
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push(new Firefly());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireflies.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
})();
