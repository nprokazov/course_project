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

document.body.addEventListener('click', ev => popUpMenu(ev.target));

Array.prototype.forEach.call(
    document.querySelectorAll('.product-nav__menuList'),
    el => new SimpleBar(el, {
        autoHide: false,
        scrollbarMaxSize: 28,
    })
);