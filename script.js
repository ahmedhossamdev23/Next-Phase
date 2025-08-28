const navLinks = document.querySelector('.nav__links');
const navToggle = document.createElement('button');
navToggle.classList.add('nav__toggle');
navToggle.innerHTML = '<i class="ri-menu-line"></i>';
document.querySelector('nav').appendChild(navToggle);

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.innerHTML = navLinks.classList.contains('active')
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-line"></i>';
});

// Add CSS for mobile menu toggle
const style = document.createElement('style');
style.innerHTML = `
    .nav__toggle {
        display: none;
        background: none;
        border: none;
        color: var(--white);
        font-size: 1.5rem;
        cursor: pointer;
    }
    @media (width < 900px) {
        .nav__links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--primary-color);
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
        }
        .nav__links.active {
            display: flex;
        }
        .nav__toggle {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            // Scroll to top for "Home" link
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('nav').offsetHeight || 72;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.innerHTML = '<i class="ri-menu-line"></i>';
        }
    });
});

// Carousel for Explore Section
const exploreGrid = document.querySelector('.explore__grid');
const exploreNavLeft = document.querySelector('.explore__nav .ri-arrow-left-line');
const exploreNavRight = document.querySelector('.explore__nav .ri-arrow-right-line');

if (exploreGrid && exploreNavLeft && exploreNavRight) {
    let scrollAmount = 0;
    const cardWidth = document.querySelector('.explore__card').offsetWidth + 32;

    exploreNavRight.addEventListener('click', () => {
        scrollAmount += cardWidth;
        const maxScroll = exploreGrid.scrollWidth - exploreGrid.clientWidth;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        exploreGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    exploreNavLeft.addEventListener('click', () => {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) scrollAmount = 0;
        exploreGrid.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Review Section Carousel
const reviewContent = document.querySelector('.review__content');
const reviewNavLeft = document.querySelector('.review__nav .ri-arrow-left-line');
const reviewNavRight = document.querySelector('.review__nav .ri-arrow-right-line');

const reviews = [
    {
        text: "What truly sets this company apart is their expert team of trainers. The trainers are knowledgeable, approachable, and genuinely invested in helping members achieve their fitness goals.",
        rating: '<span><i class="ri-star-fill"></i></span>'.repeat(4) + '<span><i class="ri-star-half-fill"></i></span>',
        name: "Youssef Hossam",
        title: "CLient",
    },
    {
        text: "The community here is fantastic! I've made great friends and the supportive atmosphere keeps me motivated every day.",
        rating: '<span><i class="ri-star-fill"></i></span>'.repeat(5),
        name: "Mohamed Ahmed ",
        title: "Client",
    },
    {
        text: "The classes are diverse and challenging. I love how every session pushes me to improve!",
        rating: '<span><i class="ri-star-fill"></i></span>'.repeat(4),
        name: "Mostafa Ayman",
        title: "Client",
    }
];

let currentReview = 0;

function updateReview() {
    const review = reviews[currentReview];
    reviewContent.innerHTML = `
        <h4>MEMBER REVIEW</h4>
        <p>${review.text}</p>
        <div class="review__rating">${review.rating}</div>
        <div class="review__footer">
            <div class="review__member">
                
                <div class="review__member__details">
                    <h4>${review.name}</h4>
                    <p>${review.title}</p>
                </div>
            </div>
            <div class="review__nav">
                <span><i class="ri-arrow-left-line"></i></span>
                <span><i class="ri-arrow-right-line"></i></span>
            </div>
        </div>
    `;
    attachReviewNavListeners();
}

function attachReviewNavListeners() {
    const newReviewNavLeft = document.querySelector('.review__nav .ri-arrow-left-line');
    const newReviewNavRight = document.querySelector('.review__nav .ri-arrow-right-line');
    
    newReviewNavRight.addEventListener('click', () => {
        currentReview = (currentReview + 1) % reviews.length;
        updateReview();
    });

    newReviewNavLeft.addEventListener('click', () => {
        currentReview = (currentReview - 1 + reviews.length) % reviews.length;
        updateReview();
    });
}

if (reviewContent && reviewNavLeft && reviewNavRight) {
    attachReviewNavListeners();
}

// Modal Functionality
const joinModal = document.getElementById('joinModal');
const bookModal = document.getElementById('bookModal');
const registerModal = document.getElementById('register');
const practiceModal = document.getElementById('practiceModal');
const joinButtons = document.querySelectorAll('.join-now');
const bookButton = document.querySelector('.book-class');
const registerButton = document.querySelector('.register-now');
const practiceButton = document.querySelector('.practice-sessions');
const closeModalButtons = document.querySelectorAll('.modal__close');
const joinForm = document.getElementById('joinForm');
const bookForm = document.getElementById('bookForm');
const registerForm = document.getElementById('registerForm');


// Open Join Now modal
joinButtons.forEach(button => {
    button.addEventListener('click', () => {
        joinModal.classList.add('active');
    });
});

// Open Book a Class modal
if (bookButton) {
    bookButton.addEventListener('click', () => {
        bookModal.classList.add('active');
    });
}
// Open Book a Class modal
if (registerButton) {
    registerButton.addEventListener('click', () => {
        registerModal.classList.add('active');
    });
}

// Open Practice Sessions modal
if (practiceButton) {
    practiceButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        practiceModal.classList.add('active');
    });
}

// Close modals
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        joinModal.classList.remove('active');
        bookModal.classList.remove('active');
        practiceModal.classList.remove('active');
        registerModal.classList.remove('active');
    });
});

// Close modals on outside click
joinModal.addEventListener('click', (e) => {
    if (e.target === joinModal) {
        joinModal.classList.remove('active');
    }
});

bookModal.addEventListener('click', (e) => {
    if (e.target === bookModal) {
        bookModal.classList.remove('active');
    }
});

practiceModal.addEventListener('click', (e) => {
    if (e.target === practiceModal) {
        practiceModal.classList.remove('active');
    }
});

registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
});


// Close modals on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        joinModal.classList.remove('active');
        bookModal.classList.remove('active');
        practiceModal.classList.remove('active');
        registerModal.classList.remove('active');
    }
});

// Handle Join Now form submission
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('join-name').value;
    alert(`Thank you, ${name}, for joining NextPhase! We'll contact you soon.`);
    joinForm.reset();
    joinModal.classList.remove('active');
});

// Handle Book a Class form submission
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value;
    const plan = document.querySelector('input[name="plan"]:checked').value;
    alert(`Thank you, ${name}, for booking a class with the ${plan}! We'll confirm your booking soon.`);
    bookForm.reset();
    bookModal.classList.remove('active');
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('book-name').value;
    const plan = document.querySelector('input[name="plan"]:checked').value;
    alert(`Thank you, ${name}, for booking a class with the ${plan}! We'll confirm your booking soon.`);
    registerForm.reset();
    registerModal.classList.remove('active');
});


