// Работа мобильного меню
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.body;

// Переключение мобильного меню
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
});

// Закрытие мобильного меню при клике на ссылки
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.style.overflow = "";
}));

// Закрытие мобильного меню при клике вне его области
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        body.style.overflow = "";
    }
});

// Изменения размера окна
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            body.style.overflow = "";
        }
    }, 250);
});

// Выбор типа услуги
document.querySelectorAll('.service-type-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.querySelectorAll('.service-type-container').forEach(container => {
            container.classList.remove('active');
        });
        e.target.nextElementSibling.classList.add('active');
    });
});

// Загрузка XML-данных
function loadXMLDoc() {
    const userInfoContainer = document.getElementById('userInfoContainer');
    
    // Проверка на существование контейнера с данными
    if (!userInfoContainer) {
        console.warn('Элемент с id "userInfoContainer" не найден. XML-данные не будут загружены.');
        return;
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    const xmlDoc = this.responseXML;
                    const xslDoc = new DOMParser().parseFromString(
                        '<?xml version="1.0" encoding="UTF-8"?>' +
                        '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">' +
                        '    <xsl:template match="/">' +
                        '        <div class="promo-container responsive-container">' +
                        '            <h2 class="promo-title">Контактная информация</h2>' +
                        '            <div class="user-info">' +
                        '                <p><strong>Полное имя:</strong> <xsl:value-of select="student/fullname"/></p>' +
                        '                <p><strong>Факультет:</strong> <xsl:value-of select="student/faculty"/></p>' +
                        '                <p><strong>Курс:</strong> <xsl:value-of select="student/course"/></p>' +
                        '                <p><strong>Группа:</strong> <xsl:value-of select="student/group"/></p>' +
                        '                <p><strong>Телефон:</strong> <xsl:value-of select="student/phone"/></p>' +
                        '                <p><strong>Email:</strong> <xsl:value-of select="student/email"/></p>' +
                        '            </div>' +
                        '        </div>' +
                        '    </xsl:template>' +
                        '</xsl:stylesheet>',
                        'text/xml'
                    );
                    const processor = new XSLTProcessor();
                    processor.importStylesheet(xslDoc);
                    const resultDoc = processor.transformToDocument(xmlDoc);
                    userInfoContainer.innerHTML = new XMLSerializer().serializeToString(resultDoc);
                } catch (error) {
                    console.error('Ошибка обработки XML/XSL:', error);
                    userInfoContainer.innerHTML = '<p>Ошибка обработки данных</p>';
                }
            } else {
                console.error('Не удалось загрузить XML-файл:', this.status);
                userInfoContainer.innerHTML = '<p>Ошибка загрузки файла</p>';
            }
        }
    };

    try {
        xhttp.open("GET", "../contact.xml", true);
        xhttp.send();
    } catch (error) {
        console.error('Ошибка при отправке XML-запроса:', error);
        userInfoContainer.innerHTML = '<p>Ошибка отправки запроса</p>';
    }
}


// Управление фоновым видео
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background');
    
    // Проверяем существование видео
    if (!video) {
        console.warn('Видео-элемент не найден. Функциональность фонового видео не будет инициализирована.');
        return;
    }
    
    // Функция обработки адаптивности видео
    function handleVideoResponsiveness() {
        if (!video) return;
        
        if (window.innerWidth <= 768) {
            video.style.objectFit = 'cover';
            video.style.height = '100%';
        } else {
            video.style.objectFit = 'cover';
            video.style.height = '100%';
        }
    }

    // Первоначальная настройка
    handleVideoResponsiveness();

    // Обновление при изменении размера окна
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleVideoResponsiveness, 250);
    });
    
    // Попытка автозапуска видео
    video.play().catch(function(error) {
        console.log("Автовоспроизведение не удалось:", error);
    });

    // Перезапуск видео при завершении
    video.addEventListener('ended', function() {
        video.play();
    });
});

// Инициализация всех функций при загрузке страницы
window.onload = function() {
    loadXMLDoc();
};
