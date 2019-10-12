function comebacktop(opt) {

    var defaultOpt = {
        
    }

    //有配置用配置，没有配置用默认
    Object.assign(defaultOpt, opt); //用默认参数 ：defaultOpt


    var getback = document.getElementById(defaultOpt.ele);
    
    getback.onclick = function () {
        var top = window.scrollY;

        var time = setInterval(function () {
            top -= 50;
            if (top <= 0) {
                clearInterval(time);
            }
            window.scrollTo(0, top);
        }, 30);
    }

}