(function(){
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
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

    // Fireflies effect
    const canvas = document.querySelector('.fireflies-canvas');
    console.log('Canvas encontrado:', canvas); // Debug
    
    if (canvas) {
      const ctx = canvas.getContext('2d');
      console.log('Iniciando animación de luciérnagas...'); // Debug
      
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log('Canvas size:', canvas.width, 'x', canvas.height); // Debug
      }
      resizeCanvas();

      class Firefly {
        constructor() {
          this.reset();
        }
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.6;
          this.vy = (Math.random() - 0.5) * 0.6;
          this.radius = Math.random() * 1.5 + 1.5;
          this.opacity = Math.random() * 0.2 + 0.25;
          this.pulseSpeed = Math.random() * 0.02 + 0.01;
          this.pulsePhase = Math.random() * Math.PI * 2;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.pulsePhase += this.pulseSpeed;
          
          if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
          }
        }
        draw() {
          const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.8;
          const alpha = this.opacity * pulse;
          
          // Glow exterior
          const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 5);
          gradient.addColorStop(0, `rgba(255, 59, 48, ${alpha})`);
          gradient.addColorStop(0.2, `rgba(255, 80, 60, ${alpha * 0.8})`);
          gradient.addColorStop(0.5, `rgba(255, 100, 80, ${alpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(255, 59, 48, 0)');
          
          ctx.beginPath();
          ctx.fillStyle = gradient;
          ctx.arc(this.x, this.y, this.radius * 5, 0, Math.PI * 2);
          ctx.fill();
          
          // Núcleo brillante
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const fireflies = [];
      const fireflyCount = 12;
      
      for (let i = 0; i < fireflyCount; i++) {
        fireflies.push(new Firefly());
      }

      let frameCount = 0;
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireflies.forEach(firefly => {
          firefly.update();
          firefly.draw();
        });
        frameCount++;
        if (frameCount % 60 === 0) {
          console.log('Animando frame:', frameCount); // Debug cada 60 frames
        }
        requestAnimationFrame(animate);
      }

      animate();

      window.addEventListener('resize', resizeCanvas);
    } else {
      console.error('No se encontró el canvas .fireflies-canvas');
    }
  }
})();
