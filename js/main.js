// Comprehensive JS Asset Manifest (93 items)
const assetManifest = {
    hero: [
        'ai_generated_1.png',
        'african-youth-are-pivotal-in-transforming-our-food.jpg',
        'be-part-of-the-global-movement-to-restore.jpg',
        'In today’s fast-changing African business….jfif',
        'a-high-angle-top-down-shot-captures-a.jpg',
        'airport_-8_10.jpg',
        'topview-of-heathrow-aiport-london_.jpg'
    ],
    video: [
        'zombo.mp4',
        'coffee-inspected.mp4',
        'whatsapp-video-2026-05-18-at-23459-pm.mp4',
        'whatsapp-video-2026-05-18-at-23500-pm.mp4',
        'whatsapp-video-2026-05-18-at-23502-pm.mp4',
        'whatsapp-video-2026-05-18-at-23508-pm.mp4',
        'whatsapp-video-2026-05-18-at-70739-pm.mp4',
        'whatsapp-video-2026-05-18-at-70828-pm.mp4',
        'whatsapp-video-2026-05-18-at-70935-pm.mp4',
        'whatsapp-video-2026-05-18-at-71408-pm.mp4',
        'whatsapp-video-2026-05-18-at-72209-pm.mp4',
        'whatsapp-video-2026-05-18-at-72301-pm-1.mp4',
        'whatsapp-video-2026-05-18-at-72301-pm.mp4',
        'whatsapp-video-2026-05-18-at-84849-pm.mp4',
        'whatsapp-video-2026-05-18-at-84908-pm.mp4'
    ],
    gallery: [
        '1138707087051779185.jpg', '151644712447426862.jpg', '168814686017211912.jpg', '176344141654906504.jpg',
        '216876538302902672.jpg', '259168153554340415.jpg', '352899320823185957.jpg', '3870349675524717.jfif',
        '41869471531712168.jpg', '42432421483490782.jpg', '4595993897798661248.jpg', '790311434633651891.jpg',
        '8936899258488051.jpg', '90916486222542144.jpg', 'a-raft-foundation-is-a-reinforced-concrete-slab.jpg',
        'african-great-lakes.jpg', 'catching-and-identifying-crayfish-nature.jpg', 'explore-high-precision-architectural-prompts-for.jpg',
        'how-to-travel-from-london-stansted-airport-to.jpg', 'instagram.jpg', 'Join Passenger\'s Roamer\'s Collective, a likeminded….jfif',
        'kids-fetching-a-tank-of-water-from-a-well.jpg', 'lake-bangweulu-a-hidden-gem-in-zambia-offers-a.jpg',
        'miners-work-the-ore-crushing-machine-and-pan-and.jpg', 'most-liked-video-_-2_4m-views-50k-reactions.jpg',
        'one-of-the-oldest-gold-mining-areas-in-ethiopia.jpg', 'rdc.jpg', 'the-teeninga-foundation-creates-sustainable.jpg',
        'toya-fishing-fish-circle-net-niger.jpg', 'what-is-ai-and-how-is-it-transforming-our-world_.jpg',
        'wusstest-du-dass-kaffee-bei-uns.jpg', '_tracing-gold-is-notoriously-difficult-and-the.jpg',
        'ed-faizal-maningi.jpg',
        'whatsapp-image-2026-05-18-at-23503-pm-1.jpg',
        'whatsapp-image-2026-05-18-at-23507-pm.jpg', 'whatsapp-image-2026-05-18-at-23508-pm.jpg',
        'whatsapp-image-2026-05-18-at-23509-pm-1.jpg', 'whatsapp-image-2026-05-18-at-23509-pm-2.jpg',
        'whatsapp-image-2026-05-18-at-23509-pm.jpg', 'whatsapp-image-2026-05-18-at-23510-pm-1.jpg',
        'whatsapp-image-2026-05-18-at-23510-pm.jpg', 'whatsapp-image-2026-05-18-at-23511-pm-1.jpg',
        'whatsapp-image-2026-05-18-at-23511-pm-2.jpg', 'whatsapp-image-2026-05-18-at-23511-pm.jpg',
        'whatsapp-image-2026-05-18-at-23512-pm-1.jpg', 'whatsapp-image-2026-05-18-at-23512-pm.jpg',
        'whatsapp-image-2026-05-18-at-23513-pm-1.jpg', 'whatsapp-image-2026-05-18-at-23514-pm.jpg',
        'whatsapp-image-2026-05-18-at-23515-pm-1.jpg', 'whatsapp-image-2026-05-18-at-23517-pm.jpg',
        'whatsapp-image-2026-05-18-at-23518-pm.jpg', 'whatsapp-image-2026-05-18-at-23519-pm.jpg',
        'whatsapp-image-2026-05-18-at-23520-pm.jpg', 'whatsapp-image-2026-05-18-at-23524-pm-1.jpg',
        'whatsapp-image-2026-05-18-at-23524-pm-2.jpg', 'whatsapp-image-2026-05-18-at-23524-pm.jpg',
        'whatsapp-image-2026-05-18-at-23525-pm-1.jpg', 'whatsapp-image-2026-05-18-at-23525-pm.jpg',
        'whatsapp-image-2026-05-18-at-23526-pm.jpg',
        'whatsapp-image-2026-05-18-at-84910-pm-1.jpg', 'whatsapp-image-2026-05-18-at-84910-pm-2.jpg',
        'whatsapp-image-2026-05-18-at-84911-pm.jpg', 'whatsapp-image-2026-05-18-at-85827-pm-1.jpg',
        'whatsapp-image-2026-05-18-at-85827-pm-2.jpg', 'whatsapp-image-2026-05-18-at-85827-pm.jpg',
        'whatsapp-image-2026-05-18-at-85828-pm-1.jpg', 'whatsapp-image-2026-05-18-at-90354-pm-1.jpg',
        'whatsapp-image-2026-05-18-at-90355-pm-1.jpg', 'whatsapp-image-2026-05-18-at-90431-pm.jpg',
        'whatsapp-image-2026-05-18-at-90743-pm.jpg', 'whatsapp-image-2026-05-18-at-90744-pm-1.jpg'
    ]
};

const getRandomAsset = (category) => {
    const arr = assetManifest[category] || [];
    if (arr.length === 0) return '';
    return `./images/${arr[Math.floor(Math.random() * arr.length)]}`;
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburgerBtn && mobileNav) {
        hamburgerBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
        });
    }

    // Lazy load placeholder assets
    document.querySelectorAll('.lazy-asset').forEach(el => {
        const type = el.getAttribute('data-asset-type');
        if (type && assetManifest[type]) {
            el.src = getRandomAsset(type);
        }
    });

    // Populate Dashboard Gallery Sliders
    const photoGalleryWrapper = document.getElementById('photoGalleryWrapper');
    if (photoGalleryWrapper) {
        assetManifest.gallery.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="./images/${img}" alt="Gallery Asset" loading="lazy">`;
            photoGalleryWrapper.appendChild(slide);
        });

        new Swiper('.photo-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: true,
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.photo-swiper .swiper-pagination',
                clickable: true,
            },
        });
    }

    // Populate Dashboard Video Reel
    const videoReelWrapper = document.getElementById('videoReelWrapper');
    if (videoReelWrapper) {
        assetManifest.video.forEach(vid => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<video src="./images/${vid}" autoplay loop muted playsinline loading="lazy"></video>`;
            videoReelWrapper.appendChild(slide);
        });

        new Swiper('.video-swiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.video-swiper .swiper-pagination',
                clickable: true,
            },
        });
    }

    // Hero Slider
    const heroTrack = document.getElementById('heroTrack');
    if (heroTrack) {
        const slidesData = [
            { type: 'video', src: './images/coffee-inspected.mp4', headline: 'Premium Coffee Export', subline: 'Showcasing Africa\'s finest quality beans to the world.' },
            { type: 'image', src: './images/ai_generated_1.png', headline: 'Digital Transformation', subline: 'Future-proofing enterprises with cutting-edge tech.' },
            { type: 'video', src: './images/whatsapp-video-2026-05-18-at-70739-pm.mp4', headline: 'Sustainable Growth', subline: 'Empowering local communities and economies.' },
            { type: 'image', src: './images/african-youth-are-pivotal-in-transforming-our-food.jpg', headline: 'Capacity Building', subline: 'Fostering leadership and operational excellence.' }
        ];

        slidesData.forEach((slide, index) => {
            const slideEl = document.createElement('div');
            slideEl.className = `slide ${index === 0 ? 'active' : ''}`;
            
            let mediaHtml = '';
            if (slide.type === 'video') {
                mediaHtml = `<video class="slide-media" src="${slide.src}" autoplay loop muted playsinline></video>`;
            } else {
                mediaHtml = `<img class="slide-media" src="${slide.src}" alt="${slide.headline}">`;
            }

            slideEl.innerHTML = `
                <div class="slide-media-container">
                    ${mediaHtml}
                </div>
                <div class="hero-content">
                    <h2>${slide.headline}</h2>
                    <p>${slide.subline}</p>
                    <a href="/contact" class="btn">Discover More</a>
                </div>
            `;
            heroTrack.appendChild(slideEl);
        });

        let currentSlide = 0;
        const slideCounter = document.getElementById('slideCounter');
        const slideElements = document.querySelectorAll('.slide');
        
        const updateCounter = () => {
            if (slideCounter) {
                slideCounter.textContent = `0${currentSlide + 1} / 0${slidesData.length}`;
            }
        };

        const nextSlide = () => {
            slideElements[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slidesData.length;
            slideElements[currentSlide].classList.add('active');
            updateCounter();
        };

        const prevSlide = () => {
            slideElements[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
            slideElements[currentSlide].classList.add('active');
            updateCounter();
        };

        let slideInterval = setInterval(nextSlide, 6000);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 6000);
            } else if (e.key === 'ArrowLeft') {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 6000);
            }
        });
        updateCounter();
    }

    // Web Audio API Synthetic Piano
    let audioCtx;
    let isMuted = true;
    let gainNode;

    const audioToggleBtn = document.getElementById('audioToggle');

    const initAudio = () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioCtx.createGain();
            gainNode.connect(audioCtx.destination);
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

            setInterval(() => {
                if (!isMuted) {
                    const now = audioCtx.currentTime;
                    const osc1 = audioCtx.createOscillator();
                    const osc2 = audioCtx.createOscillator();
                    osc1.type = 'sine'; osc2.type = 'triangle';
                    osc1.frequency.setValueAtTime(261.63, now); // C4
                    osc2.frequency.setValueAtTime(329.63, now); // E4
                    osc1.connect(gainNode); osc2.connect(gainNode);
                    
                    gainNode.gain.cancelScheduledValues(now);
                    gainNode.gain.setValueAtTime(0, now);
                    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.5);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4);
                    
                    osc1.start(now); osc2.start(now);
                    osc1.stop(now + 4); osc2.stop(now + 4);
                }
            }, 5000);
        }
    };

    const toggleAudio = () => {
        if (!audioCtx) initAudio();
        
        const now = audioCtx.currentTime;
        if (isMuted) {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            audioToggleBtn.textContent = '🔊';
            isMuted = false;
        } else {
            gainNode.gain.cancelScheduledValues(now);
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
            audioToggleBtn.textContent = '🔇';
            isMuted = true;
        }
    };

    if (audioToggleBtn) {
        audioToggleBtn.textContent = '🔇';
        audioToggleBtn.addEventListener('click', toggleAudio);
    }
});