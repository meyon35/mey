window.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log('Form submitted:', data);
            alert('Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.');
            this.reset();
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.service-card, .feature, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                heroObserver.unobserve(entries[0].target);
            }
        });
        heroObserver.observe(heroTitle);
    }

    // Project card hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Stack ikonlarına mouse ile animasyon
    const stackIcons = document.querySelectorAll('.stack-icon');
    stackIcons.forEach(icon => {
        icon.addEventListener('mousemove', () => {
            icon.style.filter = 'brightness(1.3) drop-shadow(0 0 16px #ff9800cc)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.filter = '';
        });
    });

    // Terminal kutusunda otomatik yazan typewriter efekti
    function startAutoTerminalText() {
        const el = document.getElementById('autoTerminalText');
        if (!el) return;
        const lines = [
            'Kurumsal web siteleriyle dijitalde öne çıkın.',
            'E-ticaret ve CRM ile işinizi büyütün.',
            'SEO ve dijital pazarlama ile daha fazla müşteri.',
            'Markanıza özel grafik ve kimlik tasarımları.',
            'Mobil uygulamalarla her cihaza ulaşın.',
            'Neden biz? Çünkü işinizi dijitalde büyütüyoruz.',
            'Her projede şeffaf iletişim ve sürdürülebilir destek.',
            'Tasarım + Yazılım + Strateji = Başarı',
            'Dijitalde güçlü marka, yaratıcı çözümler.',
            'Sadece kod değil, çözüm ve vizyon sunuyoruz.',
            'Küçük ve orta ölçekli işletmelere özel çözümler.',
            "Dijital pazarlama ile ROI'nizi artırın.",
            'UI/UX odaklı modern arayüzler.',
            'Neden biz? Çünkü işinizi önemsiyoruz.',
            'Her adımda inovasyon ve güven.',
            'Sizin için: Web, Mobil, Tasarım, Pazarlama.',
            'Dijitalde sürdürülebilir büyüme için buradayız.',
            'Güçlü altyapı, yaratıcı tasarım, etkili strateji.',
            'İşinizi dijitalde bir adım öteye taşıyın.',
            'Bize güvenin, dijitalde fark yaratın.'
        ];
        let idx = 0;
        let char = 0;
        let isDeleting = false;
        let delay = 0;
        function type() {
            if (!el) return;
            const line = lines[idx];
            if (!isDeleting) {
                el.textContent = line.substring(0, char + 1);
                char++;
                if (char === line.length) {
                    isDeleting = true;
                    delay = 18 + Math.floor(Math.random() * 12); // bekleme
                }
            } else {
                if (delay > 0) {
                    delay--;
                } else {
                    el.textContent = line.substring(0, char - 1);
                    char--;
                    if (char === 0) {
                        isDeleting = false;
                        idx = (idx + 1) % lines.length;
                    }
                }
            }
            setTimeout(type, isDeleting ? 32 : 22);
        }
        type();
    }
    startAutoTerminalText();

    // HERO ARKA PLAN KOD ANİMASYONU (daha az kasan, yavaşlatılmış tick)
    function startHeroCodeCanvas() {
        const canvas = document.getElementById('hero-bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = 0, height = 0;
        let fontSize = 0.85; // rem
        let pxFont = Math.floor(fontSize * 16);
        function getFont() {
            return fontSize + 'rem Fira Mono, Consolas, monospace';
        }
        function resize() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            pxFont = Math.floor(fontSize * 16);
        }
        resize();
        window.addEventListener('resize', () => {
            resize();
            setupGrid();
        });

        // Kod karakterleri ve renkler
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]()<>/*-+=|&^%$#@!~`.;:,()_!@#$%^&*';
        const colors = [
            'rgba(0,255,128,0.45)', // yeşil
            'rgba(0,212,255,0.50)', // mavi
            'rgba(120,0,255,0.50)', // mor
            'rgba(0,255,255,0.55)', // camgöbeği
        ];

        let cols = 0, rows = 0, grid = [];

        function setupGrid() {
            ctx.font = getFont();
            cols = Math.floor(width / (pxFont * 0.65));
            rows = Math.floor(height / (pxFont * 1.18));
            grid = [];
            for (let y = 0; y < rows; y++) {
                let row = [];
                for (let x = 0; x < cols; x++) {
                    row.push({
                        char: chars[Math.floor(Math.random() * chars.length)],
                        color: colors[(x + y) % colors.length],
                        timer: Math.floor(Math.random() * 12) + 4
                    });
                }
                grid.push(row);
            }
        }
        setupGrid();

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.font = getFont();
            ctx.textBaseline = 'top';
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const cell = grid[y][x];
                    ctx.save();
                    ctx.fillStyle = cell.color;
                    ctx.globalAlpha = 0.5;
                    ctx.fillText(cell.char, 6 + x * pxFont * 0.65, 6 + y * pxFont * 1.18);
                    ctx.restore();
                }
            }
        }

        function tick() {
            // Her frame'de sadece hücrelerin %20'sini güncelle
            const total = cols * rows;
            const updates = Math.floor(total * 0.2);
            for (let i = 0; i < updates; i++) {
                const y = Math.floor(Math.random() * rows);
                const x = Math.floor(Math.random() * cols);
                let cell = grid[y][x];
                cell.char = chars[Math.floor(Math.random() * chars.length)];
            }
            draw();
            setTimeout(tick, 36); // 36ms ~ 28 FPS, daha az CPU
        }
        tick();
    }
    startHeroCodeCanvas();
}); 