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
    var fadeTime = 1000;
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
        $('.thirdMenuLink').on('click', function () {
            var target = $(this).attr('data-thirdTarget');
            var activePanel = $('.thirdVisible').attr('id');
            if (target !== activePanel) {
                $('.thirdMenuLink').each(function (i, e) {
                    $(e).removeClass("active");
                });
                $('a[data-thirdTarget="'+target+'"]').addClass("active");
                $('.thirdPanel').each(function (i, e) {
                    if ($(e).attr('id') !== target) {
                        $(e).fadeOut(fadeTime, function () {
                            $(e).removeClass('thirdVisible');
                            $(e).attr('style', '');
                        });
                    }
                });
                setTimeout(function () {
                    $('#' + target).attr('style', 'display: none;');
                    $('#' + target).addClass('thirdVisible');
                    $('#' + target).fadeIn(fadeTime, function () {});
                }, fadeTime);
            }
        });
    });
});
