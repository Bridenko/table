function toggleBurgerMenu() {
    const burger = document.querySelector('.burger-wrap');
    const aside = document.querySelector('.aside');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');

        if (burger.classList.contains('active')) {
            aside.classList.add('active');
        } else {
            aside.classList.remove('active');
        }
    });
}

function showWaveHover() {
    if (window.innerWidth <= 1024) return;
    const btns = document.querySelectorAll(".wave-hover");
    let eventStatus = false;
    btns.forEach((el) => {
        el.addEventListener("mouseover", function (e) {
            if (!eventStatus) {
                eventStatus = true;
                waveEvent(e, el);
                eventStatus = false;
            }
        });
    });

    function waveEvent(e, el) {
        let size = Math.max(el.offsetWidth, el.offsetHeight),
            x = e.offsetX - size / 2,
            y = e.offsetY - size / 2,
            wave = el.querySelector(".wave");
        if (!wave) {
            wave = document.createElement("span");
            wave.classList.add("wave");
        }
        wave.style.width = size + "px";
        wave.style.height = size + "px";
        wave.style.top = y + "px";
        wave.style.left = x + "px";
        el.appendChild(wave);
    }
}

function animationOnScroll(animItems) {
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        animOnScroll();

        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }
                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('animated');
                } else {
                    if (animItem.classList.contains('anim-no-hide')) {
                        animItem.classList.remove('animated');
                    }
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const animItemsX = document.querySelectorAll('.anim-x');
    const animItemsY = document.querySelectorAll('.anim-y');
    const animItemsO = document.querySelectorAll('.anim-o');

    animationOnScroll(animItemsX);
    animationOnScroll(animItemsY);
    animationOnScroll(animItemsO);
    toggleBurgerMenu();
    showWaveHover();
});