window.addEventListener('DOMContentLoaded', (event) => {
    // THLV customs
    var nav = navigator;
    switch (nav.languages[1]) {
        case 'en-US':
            localStorage.setItem('language', 'en');
            break;
        case 'en-GB':
            localStorage.setItem('language', 'en');
            break;
        case 'en':
            localStorage.setItem('language', 'en');
            break;
        case 'fr':
            localStorage.setItem('language', 'fr');
            break;
        default:
            localStorage.setItem('language', 'fr');
    }
    var d = new Date();
    $('.thirdCopyYear').text(d.getFullYear());
    var language;
    var baseUrlLanguages = '/assets/language/';
    function getLanguage() {
        localStorage.getItem('language') == null ? setLanguage('fr') : true;
        $.ajax({
            url: baseUrlLanguages + localStorage.getItem('language') + '.json',
            dataType: 'json',
            async: false,
            success: function (lang) {
                language = lang;
            },
        });
    }
    function setLanguage(lang) {
        $.ajax({
            url: baseUrlLanguages + localStorage.getItem('language') + '.json',
            dataType: 'json',
            async: false,
            success: function (lang) {
                language = lang;
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
        $('#toPanel02').on('click', function () {
            $('.thirdPanel').each(function (i, e) {
                if ($(e).attr('id') !== 'panel02') {
                    $(e).fadeOut('slow', function () {
                        $(e).removeClass('thirdVisible');
                        $(e).attr('style', '');
                    });
                }
            });
            setTimeout(function () {
                $('#panel02').attr('style', 'display: none;');
                $('#panel02').addClass('thirdVisible');
                $('#panel02').fadeIn('slow', function () {});
            }, 500);
        });
    });
});
