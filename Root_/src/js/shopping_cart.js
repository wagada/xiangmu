((global) => {
    /**
     * @file 购物车插件
     * @author Inlve
     */

    /**
     * 渲染函数,渲染购物车主体部分
     * @param {Number | String} total 购物车的总商品数量默认值为空白字符串
     */
    function renderMain(total = "") {
        let container = document.createElement('div');
        container.setAttribute('id', 'cart_container');
        container.innerHTML = `
    <div class="top">
        <ul>
            <li></li>
            <li class="active">
                <a href="###">
                    <h4>全部商品</h4>
                    <span>${total}</span>
                </a>
            </li>
        </ul>
        <p>已选商品（不含运费）<span>0.00</span><a href="javascript:;">结算</a></p>
    </div>

    <ul class="info">
        <li>
            <label style="background-position-y: 0;">
                <input type="checkbox" />
            </label>
            全选
        </li>
        <li>商品信息</li>
        <li>单价</li>
        <li>数量</li>
        <li>小计</li>
        <li>操作</li>
    </ul>

    <div class="content"> <article><section></section></article></div>

    <div class="close">
        <ul>
            <li>
                <label>
                    <input type="checkbox" />
                </label>
                <a href="javascript:void;">全选</a>
            </li>
            <li><a href="javascript:;">删除</a></li>
            <li><a href="javascript:;">移入收藏夹</a></li>
            <li><a href="javascript:;">分享</a></li>
        </ul>
        <div>
            <div>
                <span>已选商品</span><strong>0</strong><span>件</span>
            </div>
            <div>
                <span>合计（不含运费）：</span><strong>0.00</strong>
                <a href="javascript:;">结算</a>
            </div>
        </div>
    </div>`;
        document.querySelector(".shopcart").appendChild(container);
    }

    /**
     * 渲染函数,渲染购物车商品部分
     */
    function renderGoods() {

        /**
         * 渲染函数,渲染购物车商品部分
         * @param {Object} container 渲染的容器
         * @param{Object} options (可选)数据属性设置
         * @param cartObj {Object} (可选)购物车商品对象
         */
        return function (container, defaultO = {}, cartObj = null) {
            // 配置渲染参数
            const options = {
                // 图片url
                img: "img",
                // 商品描述信息
                desInfo: "desInfo",
                // 价格
                price: "price",
                // 商品类型
                type: "type",
                // 库存
                store: "store",
                // 商品id
                goodsId: "goodsId"
            };
            Object.assign(options, defaultO);
            let html = `<section>
                            <label style="background-position-y: 0;">
                                <input type="checkbox" data-id="${this[options.goodsId]}" />
                            </label>
                            <ul>
                                <li>
                                    <a href="#">
                                        <img src=${this[options.img]} alt="" />
                                    </a>
                                    <a href="#">
                                        <p>
                                            ${this[options.desInfo]}
                                        </p>
                                    </a>
                                </li>
                                <li>${!!this[options.type] ? this[options.type] : ""}</li>
                                <li>&yen;<span>${this[options.price]}</span></li>
                                <li>
                                    <input type="button" value="" disabled style="cursor: no-drop;" /><input type="text" value="${cartObj === null
                    ? 1
                    : cartObj[this[options.goodsId]]}" /><input type="button" value="+" />
                                </li>
                                <li>&yen;<span>${this[options.price]}</span></li>
                                <li>
                                    <a href="javascript:void(0);">移入收藏夹</a>
                                    <a href="javascript:void(0);">删除</a>
                                    <a href="javascript:void(0);" style="display: none;">相似宝贝</a>
                                </li>
                            </ul>
                        </section>`;
            container.innerHTML += html;
        }
    }

    /**
     * 绑定事件
     */
    function bindEvent(delEvent) {
        // 取消单选框的默认事件
        document.querySelectorAll('input[type="checkbox"]').forEach(function (el) {
            el.addEventListener('click', ev => {
                ev.preventDefault();
            })
        });

        // 获取元素
        const el_cart = document.querySelector('#cart_container'); //购物车
        const el_numFlag = el_cart.querySelector('.top>ul span'); //记录购物车里总商品数
        const el_shop = el_cart.querySelectorAll('.content>article'); //商铺集合
        const el_goods = el_cart.querySelectorAll('.content>article>section>section'); //商品集合
        const el_goodsNumber = el_cart.querySelector('.close>div>div:first-of-type>strong'); // 商品个数
        const el_smallTotal = el_cart.querySelector('.top>p>span'); // 小计
        const el_bigTotal = el_cart.querySelector('.close>div>div:last-of-type>strong'); // 总计
        const el_delete = el_cart.querySelector('.close>ul>li:nth-of-type(2)'); // 获取总体删除按钮
        let count = 0; //计数已选商品个数

        //事件函数
        /**
         * 更改选中样式
         * @param {Object} el_label 要改变样式的按钮本身
         * @param {Object} aim 如果需要参考某个按钮的选中状态,则传入那个按钮
         */
        function check(el_label, aim) {
            //如果存在跟随目标,则以目标的checked属性为标准
            let checked = aim || el_label;
            if (checked.firstElementChild.checked) {
                el_label.firstElementChild.checked = false;
                if (el_label.matches('#cart_container>.content>article>section label') && el_label.style.backgroundPositionY === '-20px') {
                    // 如果是商品的按钮被选中,
                    upData('-', Number(el_label.nextElementSibling.children[4].firstElementChild.innerHTML));
                }
                el_label.style.backgroundPositionY = '0';
            } else {
                el_label.firstElementChild.checked = true;
                if (el_label.matches('#cart_container>.content>article>section label') && el_label.style.backgroundPositionY === '0px') {
                    // 如果是商品的按钮被选中,
                    upData('+', Number(el_label.nextElementSibling.children[4].firstElementChild.innerHTML));
                }
                el_label.style.backgroundPositionY = '-20px';
            }
        }

        /**
         * 更改加减按钮样式
         */
        function changeBtnStyle(el, disabled, type) {
            if (disabled) {
                el.style.cursor = 'no-drop';
                el.value = '';
                el.disabled = true;
            } else {
                el.style.cursor = 'pointer';
                el.value = type;
                el.disabled = false;
            }
        }

        /**
         * 设置单个商品价格
         * @param  {Object} el 设置金额的元素
         * @param count 个数
         */
        function setMoney(el, count) {
            // 获得单价
            let price = parseInt(el.parentElement.previousElementSibling.firstElementChild.innerHTML);
            el.parentElement.nextElementSibling.firstElementChild.innerHTML = price * count;
        }

        /**
         * 更新已选商品数量和总计
         * @param {String} type 类型为为增加还是减少
         * @param {Number} number 金额 ,要个更新的金额
         */
        function upData(type, number) {
            if (type === '+') {
                el_goodsNumber.innerHTML = `${++count}`;
                // 合计金额更新
                el_smallTotal.innerHTML = `${Number(el_smallTotal.innerHTML) + number}`;
                el_bigTotal.innerHTML = el_smallTotal.innerHTML;
                // 更改样式
                if (Number(el_bigTotal.innerHTML) > 0) {
                    el_smallTotal.nextElementSibling.style.backgroundColor = '#ff6600';
                    el_bigTotal.nextElementSibling.style.backgroundColor = '#ff6600';
                }
            } else {
                // 商品数减一
                el_goodsNumber.innerHTML = `${--count}`;
                // 合计金额更新
                el_smallTotal.innerHTML = `${Number(el_smallTotal.innerHTML) - number}`;
                el_bigTotal.innerHTML = el_smallTotal.innerHTML;
                // 更改样式
                if (Number(el_bigTotal.innerHTML) === 0) {
                    el_smallTotal.nextElementSibling.style.backgroundColor = '';
                    el_bigTotal.nextElementSibling.style.backgroundColor = '';
                }
            }
        }

        // 购物车,事件委托,点击选中
        el_cart.addEventListener('mouseup', ev => {
            if (ev.target.nodeName === 'LABEL') {
                if (ev.target.matches('#cart_container>.info label')) {
                    // console.log("这是头总体全选");
                    el_cart.querySelectorAll('.content label,.close label').forEach(el => {
                        check(el, ev.target);
                    })
                } else if (ev.target.matches('#cart_container>.close label')) {
                    // console.log("这是尾总体全选");
                    el_cart.querySelectorAll('.info label,.content label').forEach(el => {
                        check(el, ev.target);
                    })
                } else if (ev.target.matches('#cart_container>.content header>label')) {
                    // console.log("这是商铺全选");
                    ev.target.parentElement.nextElementSibling.querySelectorAll('label').forEach(el => {
                        check(el, ev.target);
                    })
                } else {
                    // 普通选中
                    // console.log("这是普通全选");
                }
                //普通全选,以及为点击到的按钮本身选中;
                check(ev.target);
            }
        });

        //购物车,事件委托 ,商品单个的删除
        el_cart.addEventListener('click', ev => {
            let goodsList = [];
            if (!ev.target.matches('#cart_container>.content>article>section>section li:last-of-type>a:nth-of-type(2)')) {
                return;
            }
            let section = ev.target.parentElement.parentElement.parentElement;
            if (section.querySelector('input[type="checkbox"]').checked) {
                // 如果被选中了
                upData('-', Number(ev.target.parentElement.previousElementSibling.firstElementChild.innerHTML));
            }
            if (section.matches('#cart_container>.content>article>section>section:only-child')) {
                // 如果该商品是该商铺的唯一商品
                el_cart.querySelector('.content').removeChild(section.parentElement.parentElement);
            } else {
                // 如果不是唯一商品
                section.parentElement.removeChild(section);
            }
            goodsList.push(section.querySelector('input[type="checkbox"]').dataset.id);
            delEvent(goodsList);
        });

        // 商铺,事件委托  商品数量加减
        el_shop.forEach(el => {
            el.addEventListener('click', ev => {
                if (ev.target.matches(
                        '#cart_container>.content>article>section>section input[type="button"]:first-of-type')) {
                    // 减按钮
                    // console.log("减按钮");
                    // 数量文本元素
                    const el_text = ev.target.nextElementSibling;
                    // 获得数量
                    let number = parseInt(el_text.value);
                    // 获得库存
                    const STORE = Number(el_text.getAttribute('data-store'));
                    switch (true) {
                        case number === 2:
                            ev.target.style.cursor = 'no-drop';
                            ev.target.value = '';
                            ev.target.disabled = true;
                            break;
                        case number === STORE:
                            ev.target.parentElement.lastElementChild.style.cursor = 'pointer';
                            ev.target.parentElement.lastElementChild.value = '+';
                            ev.target.parentElement.lastElementChild.disabled = false;
                            break;
                    }
                    el_text.value = --number;
                    // 更改金额
                    setMoney(el_text, number);
                }

                if (ev.target.matches(
                        '#cart_container>.content>article>section>section input[type="button"]:last-of-type')) {
                    // 加按钮
                    // console.log("加按钮");
                    // 数量文本元素
                    const el_text = ev.target.previousElementSibling;
                    // 获得数量
                    let number = parseInt(el_text.value);
                    // 获得库存
                    const STORE = Number(el_text.getAttribute('data-store'));
                    switch (true) {
                        case number === STORE - 1:
                            ev.target.style.cursor = 'no-drop';
                            ev.target.value = '';
                            ev.target.disabled = true;
                            break;
                        case number === 1:
                            ev.target.parentElement.firstElementChild.style.cursor = 'pointer';
                            ev.target.parentElement.firstElementChild.value = '-';
                            ev.target.parentElement.firstElementChild.disabled = false;
                            break;
                    }
                    el_text.value = ++number;
                    // 更改金额
                    setMoney(el_text, number);
                }
            })
        });

        // 手动修改商品数量
        el_goods.forEach((el, index) => {
            // 当文本框获得焦点时
            el.querySelector('input[type="text"]').addEventListener('focus', function () {
                // 记录获得焦点时,正确的商品数量
                let temp = Number(this.value);
                const initNumber = temp;
                // 添加事件监听,当文本框内容改变时
                this.oninput = function () {
                    // now 当前数量
                    let now = Number(this.value.trim());
                    if (typeof now === 'number' && now % 1 === 0 && now > 0) {
                        // 正确输入了数字
                        temp = now;
                    }
                    this.value = temp;
                    // 设置金额
                    setMoney(this, temp);
                    // 判断按钮的样式
                    if (temp === STORE) {
                        changeBtnStyle(this.parentElement.firstElementChild, false, '-');
                        changeBtnStyle(this.parentElement.lastElementChild, true, '+');
                    } else if (temp === 1) {
                        changeBtnStyle(this.parentElement.firstElementChild, true, '-');
                        changeBtnStyle(this.parentElement.lastElementChild, false, '+');
                    } else if (initNumber === 1) {
                        changeBtnStyle(this.parentElement.firstElementChild, false, '-');
                        changeBtnStyle(this.parentElement.lastElementChild, false, '+');
                    } else {
                        changeBtnStyle(this.parentElement.lastElementChild, false, '+');
                    }
                };
                this.onblur = () => {
                    this.oninput = null;
                }
            });
        });

        // 给每一件商品添加事件 鼠标移入移出
        el_goods.forEach(el => {
            // 鼠标移入 出现 相似宝贝
            el.addEventListener('mousemove', () => {
                el.querySelector('section>ul>li:last-child>a:last-child').style.display = "block";
            }, false);
            // 鼠标移出 消失 相似宝贝
            el.addEventListener("mouseout", () => {
                el.querySelector('section>ul>li:last-child>a:last-child').style.display = "none";
            }, false);
        });

        // 总体删除
        el_delete.addEventListener('click', () => {
            let goodsList = [];
            // 遍历全部的商品,如果被勾选,就删除
            el_cart.querySelectorAll('.content>article>section>section').forEach(el => {
                if (el.querySelector('input[type="checkbox"]').checked) {
                    // 如果被选中了
                    upData('-', Number(el.lastElementChild.children[4].firstElementChild.innerHTML));
                    if (el.matches('#cart_container>.content>article>section>section:only-child')) {
                        // 如果该商品是该商铺的唯一商品
                        el_cart.querySelector('.content').removeChild(el.parentElement.parentElement);
                    } else {
                        // 如果不是唯一商品
                        el.parentElement.removeChild(el);
                    }
                    // 添加商品id到数组中
                    goodsList.push(el.querySelector('input[type="checkbox"]').dataset.id);
                }
            });
            // 取消全选状态
            el_cart.querySelector('.info label').firstElementChild.checked = false;
            el_cart.querySelector('.info label').style.backgroundPositionY = '0';
            el_cart.querySelector('.close label').firstElementChild.checked = false;
            el_cart.querySelector('.close label').style.backgroundPositionY = '0';
            // 执行删除事件函数
            delEvent(goodsList);
        })
    }


    /**
     * 初始化函数
     * @param str {String} json数据字符串
     * @param options {Object} (可选)参数对象
     * @param cartObj {Object} (可选)购物车商品对象
     */
    function init(str, options, cartObj = null) {
        const render = renderGoods();
        const el_content = document.querySelector('#cart_container>.content>article>section');
        JSON.parse(str).forEach(item => {
            render.call(item, el_content, options, cartObj);
        });
    }

    // 渲染主体
    global.cart_main = renderMain;
    // 初始化购物车
    global.cart_init = init;
    // 绑定事件
    global.cart_bind = bindEvent;
})(this);