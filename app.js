// Advanced Video Editing Agency Website - Motion Graphics & Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // CINEMATIC LOADING SEQUENCE
    // ===============================
    
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingPercentage = document.querySelector('.loading-percentage');
    let loadProgress = 0;
    
    // Simulate loading with realistic progress
    const loadingInterval = setInterval(() => {
        loadProgress += Math.random() * 3;
        if (loadProgress > 100) loadProgress = 100;
        
        loadingPercentage.textContent = Math.floor(loadProgress) + '%';
        
        if (loadProgress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    initializeAdvancedEffects();
                    startParticleSystem();
                    initializeHeroAnimations();
                }, 500);
            }, 800);
        }
    }, 50);
    
    // Matrix rain effect in loading screen
    function createMatrixRain() {
        const matrixContainer = document.querySelector('.matrix-rain');
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                color: #00d4ff;
                font-family: monospace;
                font-size: 12px;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: matrixFall ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            drop.textContent = chars[Math.floor(Math.random() * chars.length)];
            matrixContainer.appendChild(drop);
        }
    }
    
    createMatrixRain();
    
    // ===============================
    // ADVANCED CURSOR EFFECTS
    // ===============================
    
    let mouseX = 0, mouseY = 0;
    let cursorTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update custom cursor
        document.body.style.setProperty('--cursor-x', mouseX + 'px');
        document.body.style.setProperty('--cursor-y', mouseY + 'px');
        
        // Create cursor trail
        createCursorTrail(mouseX, mouseY);
        
        // Magnetic effect for buttons
        applyMagneticEffect(e);
    });
    
    function createCursorTrail(x, y) {
        const trail = document.getElementById('cursorTrail');
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        trail.appendChild(dot);
        
        // Remove after animation
        setTimeout(() => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        }, 500);
    }
    
    function applyMagneticEffect(e) {
        const buttons = document.querySelectorAll('.liquid-button, .get-quote-btn, .nav-link');
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
            
            if (distance < 100) {
                const strength = (100 - distance) / 100;
                const moveX = (e.clientX - centerX) * strength * 0.3;
                const moveY = (e.clientY - centerY) * strength * 0.3;
                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.1})`;
            } else {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            }
        });
    }
    
    // ===============================
    // PARTICLE SYSTEM
    // ===============================
    
    function startParticleSystem() {
        const particleContainer = document.getElementById('particles-container');
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 10 + 'px';
            
            // Random colors from neon palette
            const colors = ['#00d4ff', '#8b5cf6', '#ec4899', '#00ff88', '#ff6b35'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particleContainer.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }
        
        // Create particles continuously
        setInterval(createParticle, 200);
        
        // Create initial burst
        for (let i = 0; i < 20; i++) {
            setTimeout(createParticle, i * 100);
        }
    }
    
    // ===============================
    // SCROLL PROGRESS & PARALLAX
    // ===============================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = (scrolled / maxHeight) * 100;
        
        // Update progress bar
        document.querySelector('.progress-bar').style.width = scrollProgress + '%';
        
        // Parallax effects
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
        
        // Hero parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Navigation background opacity
        const nav = document.getElementById('nav');
        const opacity = Math.min(scrolled / 100, 1);
        nav.style.background = `rgba(0, 0, 0, ${0.6 + opacity * 0.4})`;
    });
    
    // ===============================
    // HERO SECTION ANIMATIONS
    // ===============================
    
    function initializeHeroAnimations() {
        // Typewriter effect for subtitle
        const subtitle = document.querySelector('.typewriter');
        if (subtitle) {
            const text = subtitle.getAttribute('data-text');
            subtitle.textContent = '';
            subtitle.style.opacity = '1';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    subtitle.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
        
        // Animated floating stats
        setTimeout(() => {
            animateFloatingStats();
        }, 2000);
    }
    
    function animateFloatingStats() {
        const statBubbles = document.querySelectorAll('.stat-bubble');
        statBubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
    
    // ===============================
    // ADVANCED INTERSECTION OBSERVER
    // ===============================
    
    function initializeAdvancedEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('portfolio-item')) {
                        animatePortfolioViews(entry.target);
                    }
                    
                    if (entry.target.classList.contains('team-card')) {
                        setTimeout(() => {
                            animateSkillBars(entry.target);
                        }, 500);
                    }
                    
                    if (entry.target.classList.contains('achievement-badge')) {
                        triggerBadgeShine(entry.target);
                    }
                    
                    if (entry.target.classList.contains('section-title')) {
                        animateSplitText(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elements = document.querySelectorAll(`
            .service-card-3d, .portfolio-item, .team-card, 
            .achievement-badge, .testimonial-card, .section-title,
            .pricing-calculator
        `);
        
        elements.forEach(el => observer.observe(el));
    }
    
    // ===============================
    // PORTFOLIO VIEW COUNTER ANIMATION
    // ===============================
    
    function animatePortfolioViews(portfolioItem) {
        const viewsCounter = portfolioItem.querySelector('.views-counter');
        if (viewsCounter) {
            const target = parseInt(viewsCounter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    viewsCounter.textContent = formatNumber(Math.floor(current));
                    requestAnimationFrame(updateCounter);
                } else {
                    viewsCounter.textContent = formatNumber(target);
                }
            };
            
            updateCounter();
        }
    }
    
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    // ===============================
    // TEAM CARD SKILL ANIMATIONS
    // ===============================
    
    function animateSkillBars(teamCard) {
        const skillBars = teamCard.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        });
    }
    
    // ===============================
    // INTERACTIVE PRICING CALCULATOR
    // ===============================
    
    const lengthSlider = document.getElementById('lengthSlider');
    const complexitySlider = document.getElementById('complexitySlider');
    const turnaroundSlider = document.getElementById('turnaroundSlider');
    
    const lengthValue = document.getElementById('lengthValue');
    const complexityValue = document.getElementById('complexityValue');
    const turnaroundValue = document.getElementById('turnaroundValue');
    
    const calculatedPrice = document.getElementById('calculatedPrice');
    const basePrice = document.getElementById('basePrice');
    const complexityPrice = document.getElementById('complexityPrice');
    const rushPrice = document.getElementById('rushPrice');
    
    function updatePricing() {
        const length = parseInt(lengthSlider.value);
        const complexity = parseInt(complexitySlider.value);
        const turnaround = parseInt(turnaroundSlider.value);
        
        // Update display values
        lengthValue.textContent = length;
        complexityValue.textContent = complexity;
        turnaroundValue.textContent = turnaround;
        
        // Calculate pricing
        let base = 500 + (length * 100);
        let complexityMultiplier = 1 + (complexity * 0.5);
        let rushFee = turnaround < 5 ? 500 : turnaround < 7 ? 200 : 0;
        
        let totalComplexity = Math.floor(base * (complexityMultiplier - 1));
        let total = Math.floor(base * complexityMultiplier) + rushFee;
        
        // Animate price change
        animatePriceChange(total);
        
        // Update breakdown
        basePrice.textContent = `$${base}`;
        complexityPrice.textContent = `+$${totalComplexity}`;
        rushPrice.textContent = rushFee > 0 ? `+$${rushFee}` : '$0';
    }
    
    function animatePriceChange(newPrice) {
        const currentPrice = parseInt(calculatedPrice.textContent.replace(',', ''));
        const difference = newPrice - currentPrice;
        const steps = 20;
        const stepSize = difference / steps;
        let step = 0;
        
        const priceAnimation = setInterval(() => {
            step++;
            const displayPrice = Math.floor(currentPrice + (stepSize * step));
            calculatedPrice.textContent = displayPrice.toLocaleString();
            
            if (step >= steps) {
                clearInterval(priceAnimation);
                calculatedPrice.textContent = newPrice.toLocaleString();
            }
        }, 30);
    }
    
    if (lengthSlider && complexitySlider && turnaroundSlider) {
        lengthSlider.addEventListener('input', updatePricing);
        complexitySlider.addEventListener('input', updatePricing);
        turnaroundSlider.addEventListener('input', updatePricing);
        
        // Initialize pricing
        updatePricing();
    }
    
    // ===============================
    // ACHIEVEMENT BADGE EFFECTS
    // ===============================
    
    function triggerBadgeShine(badge) {
        const shine = badge.querySelector('.badge-shine');
        if (shine) {
            shine.style.animation = 'none';
            setTimeout(() => {
                shine.style.animation = 'shine 3s infinite';
            }, 100);
        }
    }
    
    // ===============================
    // TESTIMONIALS CAROUSEL
    // ===============================
    
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Auto-rotate testimonials
    if (testimonials.length > 0) {
        setInterval(nextTestimonial, 5000);
        
        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }
    
    // ===============================
    // SERVICE CARD 3D INTERACTIONS
    // ===============================
    
    const serviceCards = document.querySelectorAll('.service-card-3d');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0.4';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
    
    // ===============================
    // PORTFOLIO HOVER EFFECTS
    // ===============================
    
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Trigger play button animation
            const playRipples = item.querySelector('.play-ripples');
            if (playRipples) {
                playRipples.style.animation = 'ripple 2s infinite';
            }
        });
        
        item.addEventListener('click', () => {
            // Create explosion effect
            createClickExplosion(item);
        });
    });
    
    function createClickExplosion(element) {
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: explode 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(explosion);
        
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 600);
    }
    
    // ===============================
    // LIVE CHAT BUBBLE
    // ===============================
    
    const chatBubble = document.getElementById('chatBubble');
    if (chatBubble) {
        chatBubble.addEventListener('click', () => {
            // Simulate chat opening
            chatBubble.style.transform = 'scale(0.9)';
            setTimeout(() => {
                chatBubble.style.transform = 'scale(1)';
                // Here you would normally open a chat widget
                alert('Chat feature would open here! 💬');
            }, 150);
        });
    }
    
    // ===============================
    // SPLIT TEXT ANIMATIONS
    // ===============================
    
    function animateSplitText(element) {
        const textElement = element.querySelector('.split-text');
        if (!textElement) return;
        
        const text = textElement.textContent;
        textElement.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(50px) rotateX(90deg);
                animation: letterReveal 0.6s ease forwards;
                animation-delay: ${index * 0.05}s;
            `;
            textElement.appendChild(span);
        });
    }
    
    // ===============================
    // LIQUID BUTTON EFFECTS
    // ===============================
    
    const liquidButtons = document.querySelectorAll('.liquid-button');
    liquidButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            createButtonParticles(e.target, e);
        });
    });
    
    function createButtonParticles(button, event) {
        const rect = button.getBoundingClientRect();
        const particleContainer = button.querySelector('.button-particles');
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00d4ff;
                border-radius: 50%;
                pointer-events: none;
                animation: particleExplode 1s ease-out forwards;
                animation-delay: ${i * 0.05}s;
                left: ${(event.clientX - rect.left) - 2}px;
                top: ${(event.clientY - rect.top) - 2}px;
            `;
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
    }
    
    // ===============================
    // MORPHING GRADIENTS
    // ===============================
    
    function initializeMorphingGradients() {
        const morphingElements = document.querySelectorAll('.morphing-text, .rainbow-text');
        morphingElements.forEach(element => {
            let hue = 0;
            setInterval(() => {
                hue += 1;
                element.style.filter = `hue-rotate(${hue}deg)`;
            }, 50);
        });
    }
    
    // ===============================
    // SOUND WAVE VISUALIZATION
    // ===============================
    
    function createSoundWaves() {
        const heroContent = document.querySelector('.hero-content');
        const waveContainer = document.createElement('div');
        waveContainer.className = 'sound-waves';
        waveContainer.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 4px;
            opacity: 0.3;
        `;
        
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 3px;
                height: ${Math.random() * 30 + 10}px;
                background: linear-gradient(to top, #00d4ff, #8b5cf6);
                border-radius: 2px;
                animation: soundWave 1s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
            `;
            waveContainer.appendChild(bar);
        }
        
        heroContent.appendChild(waveContainer);
    }
    
    // ===============================
    // GLITCH EFFECTS
    // ===============================
    
    function applyRandomGlitch() {
        const glitchElements = document.querySelectorAll('.glitch-text, .morphing-text');
        if (glitchElements.length === 0) return;
        
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        randomElement.style.animation = 'none';
        
        setTimeout(() => {
            randomElement.style.animation = 'textGlitch 0.3s ease-out';
        }, 10);
        
        setTimeout(() => {
            randomElement.style.animation = 'morphingGradient 4s ease-in-out infinite, textGlitch 6s infinite';
        }, 300);
    }
    
    // Apply random glitch effects
    setInterval(applyRandomGlitch, 8000);
    
    // ===============================
    // MAGNETIC HOVER EFFECTS
    // ===============================
    
    const magneticElements = document.querySelectorAll('.nav-link, .service-card-3d, .team-card');
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
        });
        
        element.addEventListener('mouseleave', (e) => {
            element.style.transform = '';
            element.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
    });
    
    // ===============================
    // ADVANCED CSS ANIMATIONS
    // ===============================
    
    // Add dynamic keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes letterReveal {
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0deg);
            }
        }
        
        @keyframes particleExplode {
            to {
                transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        @keyframes explode {
            to {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
        
        @keyframes soundWave {
            0%, 100% {
                height: 10px;
                opacity: 0.3;
            }
            50% {
                height: 40px;
                opacity: 1;
            }
        }
        
        @keyframes matrixFall {
            to {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ===============================
    // SMOOTH SCROLLING
    // ===============================
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===============================
    // PERFORMANCE OPTIMIZATIONS
    // ===============================
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(() => {
            // Scroll-based animations already handled above
        });
    });
    
    // Lazy load heavy animations
    setTimeout(() => {
        initializeMorphingGradients();
        createSoundWaves();
    }, 3000);
    
    // ===============================
    // RESPONSIVE TOUCH HANDLING
    // ===============================
    
    // Handle touch devices
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Disable hover effects on touch devices
        const hoverElements = document.querySelectorAll('.service-card-3d, .team-card');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touched');
            });
        });
    }
    
    // ===============================
    // EASTER EGGS
    // ===============================
    
    // Konami Code easter egg
    let konamiCode = [];
    const konamiPattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiPattern.toString()) {
            triggerEasterEgg();
        }
    });
    
    function triggerEasterEgg() {
        document.body.style.animation = 'rainbowBackground 2s ease-in-out';
        alert('🎉 Easter Egg Activated! You found the secret code!');
        
        // Create rainbow particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createParticle();
            }, i * 50);
        }
    }
    
    // ===============================
    // FINAL INITIALIZATION
    // ===============================
    
    console.log('🚀 Viral Cuts - Advanced Motion Graphics Website Loaded!');
    console.log('✨ Features: Particle System, 3D Cards, Liquid Buttons, Morphing Text, Interactive Calculator');
    console.log('🎬 Ready to create viral masterpieces!');
    
    // Add completion class to body
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 5000);
});

// ===============================
// UTILITY FUNCTIONS
// ===============================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAdvancedEffects,
        startParticleSystem,
        createCursorTrail
    };
}
