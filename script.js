// Particle Animation System
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;

            // Draw particle
            this.ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem();

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Enviando...';
        btn.style.opacity = '0.7';

        // Simulate sending
        setTimeout(() => {
            btn.innerText = 'Mensagem Enviada!';
            btn.style.background = 'var(--accent-secondary)';
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Project Sidebar
    const projectsData = {
        nexusmarket: {
            title: 'Luxe | Moda Premium',
            tagline: 'E-commerce de Moda de Luxo',
            description: 'Plataforma de e-commerce especializada em moda premium e acessórios de luxo. Apresenta uma experiência de compra sofisticada com catálogo elegante, sistema de categorias intuitivo e checkout simplificado. Design focado em transmitir exclusividade e qualidade.',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
            images: ['assets/luxe_hero_home.png', 'assets/nexus_checkout.png', 'assets/nexus_products.png'],
            demo: 'https://github.com/RepoiU/Luxe-Moda-Premiun',
            github: 'https://github.com/RepoiU/Luxe-Moda-Premiun'
        },
        vanguardcrm: {
            title: 'Dashboard',
            tagline: 'Painel de Controle Moderno',
            description: 'Dashboard interativo construído com React e TypeScript. Apresenta visualização de dados em tempo real, gráficos responsivos e uma interface moderna. Ideal para monitoramento de métricas e análise de performance com componentes reutilizáveis.',
            technologies: ['React', 'TypeScript', 'Vite', 'Chart.js', 'Tailwind CSS'],
            images: ['assets/vanguard_crm_dashboard.png', 'assets/dashboard_pipeline.png', 'assets/dashboard_colaboradores.png', 'assets/dashboard_config.png'],
            demo: 'https://github.com/RepoiU/Dashboard',
            github: 'https://github.com/RepoiU/Dashboard'
        },
        quantai: {
            title: 'AI Trading System',
            tagline: 'Sistema de Trading Inteligente',
            description: 'Sistema avançado de trading algorítmico impulsionado por machine learning e análise de sentimento de mercado. Executa operações automáticas com base em indicadores técnicos, análise de volume e padrões de comportamento. Dashboard em tempo real para monitoramento de trades e performance.',
            technologies: ['Python', 'TensorFlow', 'Binance API', 'Pandas', 'NumPy', 'WebSockets', 'React'],
            images: ['assets/quantai_trading_bot.png'],
            demo: '#',
            github: '#'
        },
        helios: {
            title: 'Proposta Solar',
            tagline: 'Gerador de Propostas Solares',
            description: 'Sistema profissional para geração de propostas comerciais de energia solar. Permite cadastro de clientes, cálculo automático de potência do sistema, seleção de equipamentos e geração de PDF personalizado. Interface intuitiva com formulário multi-etapa e validações em tempo real.',
            technologies: ['Python', 'Flask', 'ReportLab', 'SQLite', 'JavaScript'],
            images: ['assets/helios_solar_system.png'],
            demo: '#',
            github: '#'
        }
    };

    const projectSidebar = document.getElementById('projectSidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    // Project cards click handlers
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open sidebar if clicking on overlay links
            if (e.target.closest('.project-overlay')) return;

            const projectId = card.getAttribute('data-project');
            openProjectSidebar(projectId);
        });
    });

    function openProjectSidebar(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Populate sidebar content
        document.getElementById('sidebarTitle').textContent = project.title;
        document.getElementById('sidebarTagline').textContent = project.tagline;
        document.getElementById('sidebarDescription').textContent = project.description;
        document.getElementById('sidebarMainImage').src = project.images[0];
        document.getElementById('sidebarDemo').href = project.demo;
        document.getElementById('sidebarGithub').href = project.github;

        // Populate technologies
        const techList = document.getElementById('sidebarTechList');
        techList.innerHTML = '';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techList.appendChild(tag);
        });

        // Populate gallery thumbnails
        const galleryThumbs = document.getElementById('galleryThumbs');
        galleryThumbs.innerHTML = '';
        project.images.forEach((imgSrc, index) => {
            if (index > 0 || project.images.length === 1) {
                const thumb = document.createElement('div');
                thumb.className = 'gallery-thumb';
                thumb.innerHTML = `<img src="${imgSrc}" alt="${project.title} ${index + 1}">`;
                thumb.addEventListener('click', () => {
                    document.getElementById('sidebarMainImage').src = imgSrc;
                });
                galleryThumbs.appendChild(thumb);
            }
        });

        // Show sidebar
        projectSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        projectSidebar.classList.remove('active');
        document.body.style.overflow = '';
    }

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarBackdrop.addEventListener('click', closeSidebar);

    // Close sidebar on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectSidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
});

