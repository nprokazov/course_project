//headerTop
function headerTopAction(elem) {
    //Назначаем необходиымые элементы
    let element; // элемент на котороый повесим обработчик
    const burgerIcon = document.querySelector('.burger-menu__icon'); // Наше бургер меню, для открытия меню
    const burgerCloseIcon = document.querySelector('.burger-menu__closeIcon'); // Крестик для Закрытия меню
    const burgerWindow = document.querySelector('.burger-menu__window'); // Само меню
    const search = document.querySelector('.search__button'); // Кнопка поиска для открытия инпута
    const searchInput = document.querySelector('.search__input'); // инпут поиска для скрытия и открытия
    // проверка клика пользователя
    if (elem === burgerIcon || elem.parentElement === burgerIcon) element = burgerIcon; // Определяем был ли клик на бургер-меню
    else if (elem === burgerCloseIcon || elem.parentElement === burgerCloseIcon) element = burgerCloseIcon; // Или бы ли клик на крестик для закрытия меню
    else if (elem === search || elem.parentElement === search) element = search; // Или бы ли клик на крестик для закрытия меню

    switch (element) {
        case burgerIcon: //Если нажат на бургер то меню откроется
            burgerWindow.classList.remove('burger-menu__window-disabled');
            break;
        case burgerCloseIcon: // если открыто меню и нажать на крестик то оно закроется
            burgerWindow.classList.add('burger-menu__window-disabled');
            break;
        case search: // если открыто меню и нажать на крестик то оно закроется
            searchInput.classList.remove('search__input-disabled');
            break;
        default:
            searchInput.classList.add('search__input-disabled');
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

//полоса прокрутки у менюшек
Array.prototype.forEach.call(
    document.querySelectorAll('.product-nav__menuList'),
    el => new SimpleBar(el, {
        autoHide: false,
        scrollbarMaxSize: 28,
    })
);