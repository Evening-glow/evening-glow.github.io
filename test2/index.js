function getImages(url, method = 'get') {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                res(result)
            }
        };
        xhr.send();
    });
}

function createImage(list) {
    let fragment = document.createDocumentFragment();
    let flag = 0;
    list.forEach(item => {
        let li = document.createElement('li');
        li.className = 'item';
        let img = new Image();
        img.src = item.webformatURL;
        img.alt = item.webformatURL;
        img.onload = () => {
            flag++;

            li.appendChild(img);
            fragment.appendChild(li);
            if (flag == list.length) {
                appendImage(fragment);
            }
        }
    });
}

function appendImage(children) {
    let wrapper = document.getElementById('img-wrapper');
    wrapper.appendChild(children);

    waterFall();
}
// window.onscroll = function () {
//     //scrollTop是滚动条滚动时，距离顶部的距离
//     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     //windowHeight是可视区的高度
//     var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     //scrollHeight是滚动条的总高度
//     var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//     //滚动条到底部的条件
//     if (scrollTop + windowHeight == scrollHeight) {
//         //到了这个就可以进行业务逻辑加载后台数据了
//         console.log("到了底部");
//         let p = getImages('https://pixabay.com/api/?key=26285183-fe1756dda492091903dd0174c&q=yellow+flowers&image_type=photo&page=2');
//         p.then(res => appendImage(res.hits));
//         // window.onscroll = '' 用于解除绑定
//     }
// }
//当页面加载的时候调用
window.onload = function () {
    //页面初始化调用
    let p = getImages('https://pixabay.com/api/?key=26285183-fe1756dda492091903dd0174c&q=yellow+flowers&image_type=photo');
    p.then(res => createImage(res.hits));

    //每次页面改变大小调用
    window.onresize = waterFall;
}
function waterFall() {
    // 1. 设置container盒子的宽度
    //      注意：浏览器的可视区域的宽度 / 一个item元素的宽度 = 一行的排列的元素的个数
    let container = document.getElementById("img-wrapper");
    let item = document.getElementsByClassName("item");
    //获取元素的宽度(含border，padding)
    let width = item[0].offsetWidth;
    //计算出浏览器窗口的宽度
    let clientWidth = document.documentElement.clientWidth;
    //计算出应该放几列（向下取整）
    let columnCount = Math.floor(clientWidth / width);
    //设置容器（父盒子）的宽度
    container.style.width = columnCount * width + "px";
    // 2.设置每一个item元素的排列位置
    //  第一行整体的top值都是0 后面的依次找上一行高度最小的容器，在它下面进行排列
    let hrr = []
    for (let i = 0; i < item.length; i++) {
        //定位第一行的图片
        if (i < columnCount) {
            item[i].style.top = "0px";
            item[i].style.left = i * width + "px";
            hrr.push(item[i].offsetHeight);
        } else {
            //第一行之后的
            //选择总高度最小的列
            let min = Math.min(...hrr);
            let index = hrr.indexOf(min);
            //将每个元素定位到当前总高度最小的列下
            item[i].style.top = min + "px";
            item[i].style.left = index * width + "px";
            //当前定位的元素加入该列
            hrr[index] += item[i].offsetHeight;
        }
    }
}
