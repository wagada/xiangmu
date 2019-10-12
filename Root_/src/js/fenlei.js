let title = document.getElementsByClassName('catalogs-title')[0];
let list = document.getElementsByClassName('catalogs-list')[0];
let isok = true;
title.onclick = function () {
    if (isok) {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
    isok = !isok;
}
title.onmouseover = function () {
    list.style.display = 'block';
}

let header = document.getElementsByClassName('header')[0];

window.onscroll = () => {
    let top = document.documentElement.scrollTop;
    let headertop = header.offsetHeight + header.offsetTop;
    // console.log(headertop,top);
    if (headertop >= top) {
        header.classList.remove('fix');
    } else {
        header.classList.add('fix');
    }
}