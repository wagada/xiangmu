/**
 * 缓冲函数 easeOut
 * @param target {Number} 滚动条最终停留的位置
 * @param rate {number} (可选,默认值为:1/3)缓动率，设置动画执行的速率
 * @param time {number} (可选,默认值为:27毫秒)动画执行间隔时间
 */
function easeOut(target, rate = 1 / 3, time = 27) {
    let timer;
    return () => {
        // 首先清除原先定时器,防止定时器叠加
        clearInterval(timer);
        let nowValue = window.scrollY;
        timer = setInterval(() => {
            // 更新当前位置
            nowValue = nowValue + (target - nowValue) * rate;
            if (Math.abs(target - nowValue) < 1) {
                window.scrollTo(0, target);
                clearInterval(timer);
                console.log("ok");
            } else {
                window.scrollTo(0, nowValue);
            }
        }, time);
    }
}

/**
 * 节流函数
 * @param callback {Function} 需要执行的事件
 * @param wait {Number} (可选,默认为300毫秒)需要等待的时间
 * @returns {Function} 返回新的事件函数
 */
function throttle(callback, wait = 300) {
    let isTrue = false;
    return function (...args) {
        if (isTrue) return;
        // 当前没有要执行的事件,添加新事件
        callback.apply(this.args);
        isTrue = true;
        setTimeout(() => {
            isTrue = false;
        }, wait);
    }
}

/**
 * 获取元素在网页中的位置
 * @param el {Object} 要获取位置的元素
 * @returns {{x: Number, y: Number}} 返回x,y坐标
 */
function getPosition(el) {
    let x = 0,
        y = 0;
    while (el !== null) {
        x += el.offsetLeft;
        y += el.offsetTop;
        el = el.offsetParent;
    }
    return {
        x,
        y
    };
}

/**
 * 页面跳转实现
 * @param el_navList
 * @param el_divList
 * @param backTop
 */
export default function (el_navList, el_divList, backTop) {
    // 获取Y坐标
    el_navList = Array.from(el_navList);
    let yList = Array.from(el_divList).map(el => {
        let {
            y
        } = getPosition(el);
        return y
    });

    // 监听滚动事件
    window.addEventListener('scroll', throttle(() => {
        let wY = window.scrollY;
        for (let i = 0; i < yList.length; i++) {
            if (
                (wY > (yList[i] - 100) && wY < (yList[i + 1]) - 100) ||
                (wY >= (yList[yList.length - 1]) - 100)
            ) {
                el_navList.forEach(el => {
                    el.classList.remove('active');
                })
                el_navList[i].classList.add('active');
            }
        }
    }, 100));

    // 添加跳转事件
    Array.from(el_navList).forEach((el, index) => {
        el.addEventListener('click', () => {
            easeOut(yList[index])();
        });
    });
    backTop.addEventListener('click', easeOut(0));
}
