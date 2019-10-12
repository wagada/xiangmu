
    (function () {
        let tel = document.getElementById('tel');
        let psweasy = document.getElementById('psweasy');
        let btn = document.getElementById('login_btn');
        console.log(tel, psweasy);
        btn.onclick = () => {
            let zz = tel.value.trim();
            let password = psweasy.value.trim();
            let usn = getcookie('tel');

            if (usn) {
                alert('你已经登录了');
            } else {
                ajax({
                    type: 'post',
                    url: '../api/login.php',
                    data: {
                        zz,
                        password,
                    },
                    success: str => {
                        if (str == 'yes') {
                            alert('登录成功');
                            setdata();
                            let url = getcookie('url');
                            if (url) {
                                location.href = url;
                            } else {
                                location.href = 'main.html';
                            }
                        } else {
                            alert('登录失败');
                        }
                    }
                });
            }

        }

        function setdata() {
            setcookie('tel', tel.value.trim(), 10);
        }

    })(); 