
    (function () {
        let tel = document.getElementById('tel');
        let psweasy = document.getElementById('psweasy');
        let pwwagain = document.getElementById('pwwagain');
        let register = document.getElementById('register');
        let inf1 = document.querySelector('#inf1 i');
        let inf2 = document.querySelector('#inf2 i');
        let inf3 = document.querySelector('#inf3 i');
        let isok = false;
        //1.验证用户名是否存在：select
        tel.onblur = () => {
            ajax({
                type: 'post',
                url: '../api/checkname.php',
                data: {
                    tel: tel.value.trim(),
                },
                success: str => {
                    console.log(str);
                    if (str == 'yes' && tel.value.trim()) {
                        inf1.style.backgroundPosition = '0 -200px';
                        // inf1.style.color = '#58bc58';
                        isok = true;
                    } else {
                        inf1.style.backgroundPosition = '-40px -200px';
                        // inf1.style.color = '#f60000';
                        isok = false;
                    }
                }
            })
        }
        psweasy.onblur = () => {
            if (checkReg.psweasy(psweasy.value) && psweasy.value.trim()) {
                inf2.style.backgroundPosition = '0 -200px';
                // inf2.style.color = '#58bc58';
            } else {
                inf2.style.backgroundPosition = '-40px -200px';
                // inf2.style.color = 'red';
            }
        }
        pwwagain.onblur = () => {
            if (checkReg.pwwagain(psweasy.value, pwwagain.value) && psweasy.value.trim()) {
                inf3.style.backgroundPosition = '0 -200px';
                // inf3.style.color = '#58bc58';
            } else {
                inf3.style.backgroundPosition = '-40px -200px';
                // inf3.style.color = 'red';
            }
        }

        register.onclick = () => {
            if (isok && tab1chk.checked) {
                ajax({
                    type: 'post',
                    url: '../api/reg.php',
                    data: {
                        tel: tel.value.trim(),
                        password: psweasy.value.trim()
                    },
                    success: str => {
                        console.log(str);
                        if (str == 'yes') {
                            alert('注册成功!');
                            location.href = 'login.html?tel=' + tel.value.trim();
                        } else {
                            alert('注册失败!');
                        }
                    }
                })
            }
        }
        tab1chk.onclick = () => {
            if (tab1chk.checked) {
                console.log(tab1chk.checked, isok);
                register.style.background = '#008842';
            } else {
                register.style.background = '#808080';
            }
        }



    })();