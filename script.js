/* ========================================
   ACTIVE SECTION HIGHLIGHTING
   ======================================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveSection() {
    let current = '';
    const scrollPosition = window.scrollY + 120;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = window.scrollY + windowHeight >= documentHeight - 50;
    
    if (isAtBottom) {
        current = 'contact';
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 50) {
                current = section.getAttribute('id');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);
window.addEventListener('resize', updateActiveSection);

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80;
        const scrollTo = section.offsetTop - offset;
        window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        history.pushState(null, null, `#${sectionId}`);
        closeMobileMenu();
    }
}

document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            scrollToSection(href.substring(1));
        }
    });
});

/* ========================================
   MOBILE MENU
   ======================================== */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle('active');
    });
}

function closeMobileMenu() {
    if (mobileNav) mobileNav.classList.remove('active');
}

document.addEventListener('click', (event) => {
    if (mobileNav?.classList.contains('active') && 
        !mobileNav.contains(event.target) && 
        !mobileMenuBtn?.contains(event.target)) {
        mobileNav.classList.remove('active');
    }
});

/* ========================================
   BUTTON HANDLERS
   ======================================== */
const viewProjectsBtn = document.getElementById('viewProjectsBtn');
if (viewProjectsBtn) {
    viewProjectsBtn.addEventListener('click', () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

const downloadResumeBtn = document.getElementById('downloadResumeBtn');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'resume/Krisha_Patel_Resume.pdf';
        link.download = 'Krisha_Patel_Resume.pdf';
        link.click();
    });
}

/* ========================================
   COPY TO CLIPBOARD
   ======================================== */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

const copyPhoneBtn = document.getElementById('copyPhoneBtn');
if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('(204) 922 - 4003');
        showToast('📞 Phone number copied to clipboard!');
    });
}

const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('iamkrishapatel@gmail.com');
        showToast('✉️ Email copied to clipboard!');
    });
}

/* ========================================
   FADE-IN ANIMATION
   ======================================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

/* ========================================
   SKILLS DATA
   ======================================== */
const techSkillsData = [
    { icon: "💻", title: "Programming Languages", desc: "C, C#, Python, Java - Develops efficient, structured code" },
    { icon: "🔄", title: "Object-Oriented Programming", desc: "Designs modular, reusable, and scalable software solutions" },
    { icon: "📐", title: "CAD Software", desc: "AutoCAD, Inventor, Revit - Creates 2D and 3D models" },
    { icon: "📊", title: "Data Structures & Algorithms", desc: "Applies fundamental principles to solve problems efficiently" },
    { icon: "🐧", title: "Linux & Command Line", desc: "Proficient in navigating and managing projects via terminal" },
    { icon: "📝", title: "Git & GitHub", desc: "Manages code versions and collaborates effectively" }
];

const softSkillsData = [
    { icon: "💬", title: "Communication", desc: "Clearly explains ideas and actively listens to others" },
    { icon: "🧩", title: "Problem-Solving", desc: "Approaches challenges with logical thinking and creativity" },
    { icon: "🤝", title: "Teamwork", desc: "Comfortable collaborating in diverse groups" },
    { icon: "⏰", title: "Time Management", desc: "Balances tasks effectively to meet deadlines" },
    { icon: "🔄", title: "Adaptability", desc: "Quickly learns new tools and adjusts to changes" },
    { icon: "🎯", title: "Critical Thinking", desc: "Evaluates information to make well-reasoned decisions" }
];

function createTechCard(skill) {
    const card = document.createElement('div');
    card.className = 'tech-skill-card';
    card.innerHTML = `<div class="tech-skill-icon">${skill.icon}</div><h3>${skill.title}</h3><p>${skill.desc}</p>`;
    return card;
}

function createSoftCard(skill) {
    const card = document.createElement('div');
    card.className = 'soft-skill-card';
    card.innerHTML = `<div class="soft-skill-icon">${skill.icon}</div><h3>${skill.title}</h3><p>${skill.desc}</p>`;
    return card;
}

/* ========================================
   SKILLS CAROUSELS - AUTO-SCROLL DESKTOP, DRAG MOBILE
   ======================================== */
function initCarousel(containerId, carouselId, data, createCard) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    carousel.innerHTML = '';
    // Create 3 copies for seamless scrolling
    const copies = 3;
    for (let i = 0; i < copies; i++) {
        data.forEach(skill => carousel.appendChild(createCard(skill)));
    }
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const isMobile = window.innerWidth <= 768;
    const cardWidth = 280 + 24;
    const setWidth = data.length * cardWidth;
    
    if (!isMobile) {
        // DESKTOP: Auto-scroll
        container.scrollLeft = setWidth;
        
        let scrollInterval;
        let isHovering = false;
        
        function startAutoScroll() {
            if (scrollInterval) clearInterval(scrollInterval);
            scrollInterval = setInterval(() => {
                if (isHovering) return;
                let currentScroll = container.scrollLeft;
                
                if (currentScroll >= setWidth * 2) {
                    container.scrollLeft = currentScroll - setWidth;
                    currentScroll = container.scrollLeft;
                }
                
                container.scrollLeft = currentScroll + 1;
            }, 16);
        }
        
        container.addEventListener('mouseenter', () => { isHovering = true; });
        container.addEventListener('mouseleave', () => { isHovering = false; });
        
        startAutoScroll();
    } else {
        // MOBILE: Smooth drag scrolling
        let startX, scrollLeftPos;
        let isDragging = false;
        
        container.style.cursor = 'grab';
        
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            scrollLeftPos = container.scrollLeft;
            container.style.cursor = 'grabbing';
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].clientX;
            const walk = (startX - x) * 1.5;
            container.scrollLeft = scrollLeftPos + walk;
        }, { passive: false });
        
        container.addEventListener('touchend', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        // Mouse events for laptop touchpad
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            scrollLeftPos = container.scrollLeft;
            container.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.clientX;
            const walk = (startX - x) * 1.5;
            container.scrollLeft = scrollLeftPos + walk;
        });
        
        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
    }
}

/* ========================================
   THEME SELECTOR
   ======================================== */
const themeSelectorBtn = document.getElementById('themeSelectorBtn');
const themeDropdown = document.getElementById('themeDropdown');
const themeOptions = document.querySelectorAll('.theme-option');

const savedColorTheme = localStorage.getItem('colorTheme') || 'default';
document.documentElement.setAttribute('data-theme', savedColorTheme);

themeOptions.forEach(option => {
    if (option.getAttribute('data-theme') === savedColorTheme) {
        option.classList.add('active');
    }
});

if (themeSelectorBtn) {
    themeSelectorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('active');
    });
}

document.addEventListener('click', () => {
    if (themeDropdown) themeDropdown.classList.remove('active');
});

themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const theme = option.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('colorTheme', theme);
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        themeDropdown.classList.remove('active');
    });
});

/* ========================================
   INITIALIZE CAROUSELS
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    initCarousel('techSkillsContainer', 'techSkillsCarousel', techSkillsData, createTechCard);
    initCarousel('softSkillsContainer', 'softSkillsCarousel', softSkillsData, createSoftCard);
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initCarousel('techSkillsContainer', 'techSkillsCarousel', techSkillsData, createTechCard);
        initCarousel('softSkillsContainer', 'softSkillsCarousel', softSkillsData, createSoftCard);
    }, 250);
});