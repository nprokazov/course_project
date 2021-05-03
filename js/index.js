//headerTop
function headerTopAction(elem) {
    //Назначаем необходимые элементы
    let element; // элемент на котороый повесим обработчик
    const burgerIcon = document.querySelector('.burger-menu__icon'); // Наше бургер меню, для открытия меню
    const burgerCloseIcon1 = document.querySelectorAll('.burger-menu__closeIcon')[0]; // Крестик для Закрытия меню бургер
    const burgerCloseIcon2 = document.querySelectorAll('.burger-menu__closeIcon')[1]; // Крестик для Закрытия меню поиска на экранах 768 и 320
    const burgerWindow = document.querySelector('.burger-menu__window'); // окно бургер меню
    const search = document.querySelector('.search__button'); // Кнопка поиска для открытия инпута
    const searchInput = document.querySelector('.search__input'); // инпут поиска для скрытия и открытия
    const searchWindow = document.querySelector('.search__window'); // окно для поиска на экранах 728 и 1024
    const galleryModal = document.querySelector('.modal__gallery');
    const languagePackList = document.querySelector('.language-pack__list');
    // проверка клика пользователя
    if (elem === burgerIcon || elem.parentElement === burgerIcon) element = burgerIcon; // Определяем был ли клик на бургер-меню
    else if (elem === burgerCloseIcon1 || elem.parentElement === burgerCloseIcon1) element = burgerCloseIcon1; // Или бы ли клик на крестик для закрытия меню
    else if (elem === burgerCloseIcon2 || elem.parentElement === burgerCloseIcon2) element = burgerCloseIcon2; // Или бы ли клик на крестик для закрытия меню
    else if (elem === search || elem.parentElement === search) element = search; // Или бы ли клик на крестик для закрытия меню
    else if (elem.classList[1] === "gallery__swiper-slide" || elem.parentElement.classList[1] === "gallery__swiper-slide") element = galleryModal;
    else if (languagePackList.contains(elem)) element = languagePackList;

    switch (element) {
        case burgerIcon: //Если нажат на бургер то меню откроется
            burgerWindow.classList.remove('burger-menu__window-disabled');
            break;
        case burgerCloseIcon1: // если открыто меню и нажать на крестик то оно закроется
            burgerWindow.classList.add('burger-menu__window-disabled');
            break;
        case burgerCloseIcon2: // если открыто меню и нажать на крестик то оно закроется
            searchWindow.classList.add('search__window-disabled');
            break;
        case search: // если открыто меню и нажать на крестик то оно закроется
            if (document.body.offsetWidth <= 768) searchWindow.classList.remove('search__window-disabled');
            else searchInput.classList.remove('search__input-disabled');
            break;
        case galleryModal:
            if (elem.classList.value === "gallery__img-slide") document.querySelector(".modal__img").setAttribute("src", elem.getAttribute("src"));
            else document.querySelector(".modal__img").setAttribute("src", elem.firstElementChild.getAttribute("src"));
            galleryModal.classList.remove('modal__gallery-disabled');
            break;
        case languagePackList:
            for (let child of languagePackList.children) {
                child.classList.remove("language-pack__item-active");
                if (child == elem.parentElement) elem.parentElement.classList.add("language-pack__item-active");
            }
        default:
            if (element != search && elem != searchInput) searchInput.classList.add('search__input-disabled');
            if (elem.parentNode != document.querySelectorAll('.search__button')[1] &&
                elem != document.querySelectorAll('.search__input')[1] &&
                elem != searchWindow &&
                elem.parentNode != searchWindow) searchWindow.classList.add('search__window-disabled');
            if (elem == galleryModal ||
                elem == document.querySelector('.modal__closeIcon') ||
                elem.parentElement == document.querySelector('.modal__closeIcon')) galleryModal.classList.add('modal__gallery-disabled');
    }
}

// headerBot
function popUpMenu(elem) {
    const el = elem; //получаем элемент клика что бы открыть меню
    const arrow = el.parentElement; // если была нажата стрелка у элемента
    function removeMenu() {
        document.querySelectorAll('.popup__menu').forEach(menu => {
            menu.classList.add('popup__menu-disabled') //скрываем все меню
            menu.previousElementSibling.firstElementChild.classList.remove('product-nav__arrow-open') // переворачиваем стрелку
        });
    }; //Функция для скрытия всех менюшек

    if (el.classList[0] == 'product-nav__header') { // Если был нажат элемент раскрывающий меню
        if (el.nextElementSibling.classList[1]) removeMenu(); // если меню открыто то ничего не делать (что бы меню скрывалось при повторном нажатии)
        el.nextElementSibling.classList.toggle('popup__menu-disabled'); //открываем меню
        el.firstElementChild.classList.toggle('product-nav__arrow-open') // переворачиваем стрелку
    } else if (arrow.classList[0] == 'product-nav__header') { // Тоже если кликнуто на стрелке
        if (arrow.nextElementSibling.classList[1]) removeMenu();
        arrow.nextElementSibling.classList.toggle('popup__menu-disabled');//открываем меню
        arrow.firstElementChild.classList.toggle('product-nav__arrow-open') // переворачиваем стрелку
    } else if ((el.classList[0] != 'product-nav__menuItem') && (el.classList[0] != 'popup__menu')) {//скрываем открытое меню если был клик гдето в другом месте кроме меню
        removeMenu();
    }
};

//Ставим события на клик
document.body.addEventListener('click', ev => popUpMenu(ev.target));//выпадающее меню для нижнего хедера
document.body.addEventListener('click', ev => headerTopAction(ev.target));//выпадающее меню для нижнего хедера
document.body.addEventListener('keydown', ev => {
    if (ev.code == "Space" || ev.code == "Enter") {
        popUpMenu(ev.target.firstElementChild);
    }
});//выпадающее меню для нижнего хедера

//полоса прокрутки у менюшек
Array.prototype.forEach.call(
    document.querySelectorAll('.product-nav__menuList'),
    el => new SimpleBar(el, {
        autoHide: false,
        scrollbarMaxSize: 28,
        scrollbarMinSize: 28,
    })
);

// Swiper gallery
const swiper = new Swiper('.gallery__swiper-container', {
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    breakpoints: {
        1366: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerGroup: 3,
            spaceBetween: 50,
        },
        577: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
            slidesPerColumn: 2,
        },
        0: {
            spaceBetween: 0,
        }

    },
});

// choices gallery
const element = document.querySelector('.menu__select');
const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: null
});

// accordion

$( "#accordion" ).accordion({
    header: "div",
    collapsible: true,
});