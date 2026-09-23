document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-ready');

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');

        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || link.target === '_blank') {
            return;
        }

        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            event.preventDefault();
            const url = link.href;
            document.body.classList.add('page-leaving');

            setTimeout(() => {
                window.location.href = url;
            }, 420);
        });
    });

    document.querySelectorAll('.cta').forEach(button => {
        button.addEventListener('click', event => {
            const rect = button.getBoundingClientRect();
            button.style.setProperty('--rx', `${event.clientX - rect.left}px`);
            button.style.setProperty('--ry', `${event.clientY - rect.top}px`);
            button.classList.remove('ripple');
            void button.offsetWidth;
            button.classList.add('ripple');
        });
    });

    document.querySelectorAll('[data-enter]').forEach(input => {
        input.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                input.closest('form')?.requestSubmit();
            }
        });
    });

    if (document.body.dataset.hearts === 'true') {
        setTimeout(() => hearts(8), 500);
    }
});

function hearts(count = 12) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = Math.random() > .35 ? '♡' : '♥';
        heart.style.setProperty('--x', `${Math.random() * 100}vw`);
        heart.style.setProperty('--s', `${18 + Math.random() * 28}px`);
        heart.style.setProperty('--d', `${5 + Math.random() * 6}s`);
        heart.style.animationDelay = `${Math.random() * 2}s`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }
}

function confetti() {
    const colors = ['#ff5f91', '#ffb0c7', '#8d78ff', '#17151d', '#ffffff'];

    for (let i = 0; i < 85; i++) {
        const piece = document.createElement('i');
        piece.className = 'confetti';
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.width = `${5 + Math.random() * 7}px`;
        piece.style.height = `${8 + Math.random() * 12}px`;
        piece.style.transform = `rotate(${Math.random() * 180}deg)`;
        piece.style.animationDelay = `${Math.random() * 1.7}s`;
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 6000);
    }
}

function openModal() {
    document.getElementById('modal')?.classList.add('open');
    hearts(18);
    confetti();
}

function closeModal() {
    document.getElementById('modal')?.classList.remove('open');
}

function checkAnswer(inputId, answers, nextPage) {
    const input = document.getElementById(inputId);
    const error = document.getElementById('error');

    if (!input || !error) {
        return;
    }

    const value = input.value.trim().toLowerCase().replace(/\s+/g, '');
    const normalized = answers.map(answer => answer.toLowerCase().replace(/\s+/g, ''));

    if (normalized.includes(value)) {
        input.style.borderColor = '#73c98b';
        input.style.boxShadow = '0 0 0 5px rgba(115, 201, 139, .14)';
        error.textContent = '';

        setTimeout(() => {
            document.body.classList.add('page-leaving');
            setTimeout(() => {
                window.location.href = nextPage;
            }, 420);
        }, 280);
        return;
    }

    error.textContent = 'Почти! Вспомни нашу дату ещё раз ♡';
    input.style.borderColor = '#d93668';

    input.animate(
        [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-8px)' },
            { transform: 'translateX(8px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ],
        { duration: 360, easing: 'ease-out' }
    );

    setTimeout(() => {
        input.style.borderColor = '';
    }, 700);
}
