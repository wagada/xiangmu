let catalogslist = document.querySelector('.catalogs-list');
let items = document.querySelectorAll('.catalogs-list .item');
for (let i = 0; i < items.length; i++) {
    items[i].index = i;
    // console.log(items[i].index);
    items[i].onclick = () => {
        let x = items[i].index + 1;
        location.href = 'list.html?list' + x;
    }
}