function Verification(opt) {
    //设置默认参数 
    var defaultOpt = {
        iw: 200,
        ih: 30,
    }


    //合并参数
    Object.assign(defaultOpt, opt);


    let verification = document.getElementById(defaultOpt.ele);
    console.log(verification);



    //初次渲染
    // let html = `<input type="button" value="获取验证码" id="ok">
    //     <p id="text"></p>
    //     <input type="text" id="text2" placeholder="请输入验证码">
    //     <input type="button" value="验证" id="ok2">
    //     <p id="t3"></p>`;

    let html = `
        <span class = "input-key-icon" ></span>
        <input type="text" id="text2" placeholder="请输入验证码">
        <p id="text"></p>
        <a  id="ok2">换一张 </a>
        <p id="t3"></p>`;
    verification.innerHTML = html;

    // let ok = document.getElementById('ok');
    let p = document.getElementById('text');
    let ok2 = document.getElementById('ok2');
    let p2 = document.getElementById('text2');
    let p3 = document.getElementById('t3');
    let k = '';

    //相关事件
    text2.style.width = defaultOpt.iw + 'px';
    text2.style.height = defaultOpt.ih + 'px';

    function code(n) {
        let str = 'zxcvbnmlkjhgfdsaqwertyuiopZXCVBNMLKJHGFDSAQWERTYUIOP1234567890';
        let res = '';
        for (i = 0; i < n; i++) {
            let ran = parseInt(Math.random() * str.length);
            let rotate = parseInt(Math.random() * 90 - 45);
            let rtt = rotate;
            let num = '<span style=" transform: rotate(' + rtt + 'deg' + ')"> ' + str[ran] + '</span>';
            res += num;
            k += str[ran];
        }
        console.log(k);
        return res;
    }

    function bcolor(n) {
        let str = '0123456789ABCDEF';
        let res = '';
        for (i = 0; i < n; i++) {
            let ran = parseInt(Math.random() * str.length);
            let num = str[ran];
            res += num;
        }
        return res;
    }
    p.innerHTML = code(4);
    p.style.background = '#' + bcolor(6);


    p.onclick = ok2.onclick = function () {
        k = '';
        res = '';
        p.innerHTML = code(4);
        p.style.background = '#' + bcolor(6);
    }



    text2.onblur = function () {
        if (p2.value.toLowerCase() == k.toLowerCase()) {
            p3.innerHTML = '正确';
            p3.style.color = 'green';
            // console.log(p3.value);
        } else {
            p3.innerHTML = '错误';
            p3.style.color = 'red';
        }
        // console.log(num1);
        k = '';
    }


}