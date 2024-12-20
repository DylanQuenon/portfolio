
const toggleThemeButton = document.getElementById('toggle-theme');
const thumb = document.getElementById('toggleThumb');

// change icon
function setIcon(isDarkMode) {
    if (isDarkMode) {
        thumb.classList.add('translate-x-6');
        thumb.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff',)
            }" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>`;
    } else {
        thumb.classList.remove('translate-x-6');
        thumb.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff',)
            }" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>`;
    }
}

// check theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggleThemeButton.checked = true;
    setIcon(true);
} else {
    document.body.classList.remove('dark');
    toggleThemeButton.checked = false;
    setIcon(false);
}

// change theme
toggleThemeButton.addEventListener('change', function () {
    const isDarkMode = toggleThemeButton.checked;
    if (isDarkMode) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } setIcon(isDarkMode);
});


/****MENU BURGER****/
const burger = document.querySelector("#burger");
const menuMobile = document.querySelector("#menuMobile");
const linksMenu = document.querySelectorAll('#menuMobile nav ul li a');

const toggleMenu = () => {
    burger.classList.toggle('open-burger');
    menuMobile.classList.toggle('open-menu');
    document.body.classList.toggle('overflow-hidden', menuMobile.classList.contains('open-menu'));
};


burger.addEventListener('click', toggleMenu);
linksMenu.forEach(link => {
    link.addEventListener('click', toggleMenu);
});


window.addEventListener('resize', () => {
    if (menuMobile.classList.contains('open-menu')) {
        toggleMenu(); // close
    }
});

