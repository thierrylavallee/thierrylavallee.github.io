
window.addEventListener('DOMContentLoaded', (event) => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box',
    });

    // THLV customs

    var d = new Date();
    $('.thirdCopyYear').text(d.getFullYear());

    var language;
    function getLanguage() {
        // console.log(localStorage.getItem('language'));
        localStorage.getItem('language') == null ? setLanguage('fr') : true;

        $.ajax({
            url: '/language/' + localStorage.getItem('language') + '.json',
            dataType: 'json',
            async: false,
            success: function (lang) {
                language = lang;
                // console.log(language);
            },
        });
    }

    function setLanguage(lang) {
        // console.log(localStorage.getItem('language'));
        $.ajax({
            url: '/language/' + localStorage.getItem('language') + '.json',
            dataType: 'json',
            async: false,
            success: function (lang) {
                language = lang;
                // console.log(language);
            },
        });
        localStorage.setItem('language', lang);
        parseLangKeys();
    }
    function parseLangKeys() {
        getLanguage();
        $('*[data-langKey]').each(function (i, e) {
            var stringKey = $(e).attr('data-langKey');
            if (language[stringKey] !== undefined) {
                e.childNodes[0].nodeValue = language[stringKey];
                if (stringKey === localStorage.getItem('language')) {
                    $('.languageSwitcher a').removeClass('active');
                    $(e).addClass('active');
                }
            }
        });
    }

    $(document).ready(function () {
        parseLangKeys();
        $('.languageSwitcher .dropdown-item').on('click', function () {
            setLanguage($(this).attr('data-langKey'));
        });
    });
});
