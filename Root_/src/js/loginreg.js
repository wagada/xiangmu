let _login = document.getElementById('_login');
let _register = document.getElementById('_register');
let data = decodeURI(location.search.slice(1));

function update() {
    let data = getcookie('tel');
    if (data) {
        _login.innerHTML = '<a href="###">' + data + '</a>';
        _register.innerHTML = '<a href="###">退出</a>';
    } else {
        _login.innerHTML = '<a href="login.html">登录</a>';
        _register.innerHTML = '<a href="reg.html">注册</a>';
    }
}

update();

document.onclick = ev => {
    if (ev.target.innerHTML == '退出') {
        alert('退出成功');
        removeCookie('tel');
        removeCookie('url');
    } else if (ev.target.innerHTML == '登陆') {
        location.href = 'login.html';
    }
    update();
}