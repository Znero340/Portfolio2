/* ── Page Load Animations ──────────────── */
document.addEventListener('DOMContentLoaded', () => {
    // Select elements to animate based on what's available on the page
    const elements = [
        '.profile-header',
        '.col-left .card:nth-child(1)',
        '.col-left .card:nth-child(2)',
        '.col-left .card:nth-child(3)',
        '.col-right .card:nth-child(1)',
        '.col-right .card:nth-child(2)',
        '.chat-fab',
        '.main-grid .card' // For techstack page
    ];

    elements.forEach((selector, i) => {
        const els = document.querySelectorAll(selector);
        els.forEach((el, index) => {
            if (!el) return;
            el.classList.add('reveal');
            setTimeout(() => {
                el.classList.add('animated');
            }, 120 + (i + index) * 140);
        });
    });
});

/* ── Theme Toggle ─────────────────────── */
const root = document.documentElement;
const sun = document.getElementById('icon-sun');
const moon = document.getElementById('icon-moon');

// Load saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (!sun || !moon) return; // Exit if icons aren't on page

    if (theme === 'dark') {
        sun.style.display = 'none';
        moon.style.display = 'block';
    } else {
        sun.style.display = 'block';
        moon.style.display = 'none';
    }
}

function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

/* ── Certificate Modal Logic ─────────────── */
function openCertModal(title, imgSrc, date, source) {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalSource = document.getElementById('modal-source');

    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalDate.innerText = "Acquired on " + date;
    modalSource.innerText = "Issued by " + source;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }
}

// Global window listeners for Modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('cert-modal');
    if (e.target === modal) closeCertModal();
});

/* ── AI Chat Assistant Logic ────────────── */
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (!chatWindow) return;

    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
        document.getElementById('chat-input').focus();
    }
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;

    const messageText = input.value.trim();
    if (!messageText) return;

    // Add user message
    addMessage(messageText, 'user');
    input.value = '';

    // Simulate AI thinking and response
    setTimeout(() => {
        const response = getAIResponse(messageText);
        addMessage(response, 'ai');
    }, 600);
}

function sendSuggestion(text) {
    const input = document.getElementById('chat-input');
    if (!input) return;
    input.value = text;
    sendMessage();
}

function addMessage(text, side) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${side}`;
    msgDiv.innerText = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function getAIResponse(text) {
    const lowText = text.toLowerCase();
    if (lowText.includes('hello') || lowText.includes('hi')) return "Hello! How can I assist you with Michael's portfolio today?";
    if (lowText.includes('experience')) return "Michael has over 6 years of experience, including work at Lightweight Solutions Inc. and Alight Motion Mobile.";
    if (lowText.includes('contact') || lowText.includes('email')) return "You can reach Michael at johnmichaelsantos340@gmail.com.";
    if (lowText.includes('skills') || lowText.includes('tech')) return "Michael is proficient in React, Node.js, Python, and Creative tools like Figma and After Effects.";
    return "That's interesting! Feel free to ask more about Michael's work or contact him directly.";
}

/* ── Page Transition Logic ──────────────── */
function startTransition() {
    const wrapper = document.querySelector('.wrapper');
    const container = document.getElementById('video-transition-container');
    const whiteOut = document.getElementById('transition-white-out');
    const video = document.getElementById('transition-video');

    if (!container || !whiteOut || !video || !wrapper) return;

    // 1. Start the Zoom/Fade out of the current page
    wrapper.classList.add('zoom-out');

    // 2. Show the container (currently transparent)
    container.style.display = 'flex';
    
    // 3. Delay the white fade-in so we can see the wrapper zooming
    setTimeout(() => {
        whiteOut.classList.add('active');
        container.classList.add('active-bg'); // Start fading the container bg to black
    }, 400); // Wait 400ms to show the zoom effect

    // 4. Reveal and play video once white screen covers everything
    setTimeout(() => {
        video.classList.add('visible'); // Fade in video
        video.play().catch(err => {
            console.error("Video play failed:", err);
            window.location.href = 'creative.html';
        });
        
        // Hide only the white overlay once video starts
        setTimeout(() => {
            whiteOut.style.display = 'none';
        }, 500);
    }, 1100); // 400ms delay + 700msish for white fade

    // 5. When video ends, navigate
    video.onended = () => {
        window.location.href = 'creative.html';
    };
}
