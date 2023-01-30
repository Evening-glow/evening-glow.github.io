
//重构代码 封装思想
function renderImage(url, method = 'get') {
    //请求图片资源
    let list = getImages(url, method);
    //获取到资源后将元素添加到容器内
    list.then(res => appendImages(res.hits)).then(() => resizeRender()).catch(err => console.log('error'));
}
function getImages(url, method = 'get') {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
                let result = JSON.parse(xhr.responseText);
                resolve(result);
            }
        };
        xhr.send();
    });
}
function appendImages(list) {
    return new Promise(resolve => {
        let tempCount = 0;//记录加载图片总数
        const fragment = document.createDocumentFragment();//创建一个空白的文档片段
        //显示加载动画 骨架屏
        let length = list.length;
        loading(length);
        list.forEach(item => {
            //创建li
            let li = document.createElement('li');
            li.className = 'items';
            //创建图片
            let img = new Image();
            img.src = item.webformatURL;
            img.onload = () => {
                //图片加载成功后将总数累加
                tempCount += 1;
                li.appendChild(img);
                fragment.appendChild(li);
                if (tempCount === length) {
                    //当图片都加载完毕后才能获取到图片的高
                    //将文档片段添加到容器中
                    const container = document.getElementById('img-wrapper');
                    container.appendChild(fragment);
                    //文档片段添加到容器后将骨架屏清除
                    const skeleton = document.getElementById('skeleton');
                    skeleton.style.display = 'none';
                    resolve();
                }
            }
        });
    });
}
function resizeRender() {
    let container = document.getElementById("img-wrapper");
    let item = document.getElementsByClassName("items");
    const rowGap = colGap = 15;
    let width = item[0].offsetWidth;
    console.log(width)
    let clientWidth = document.documentElement.clientWidth;
    let columnCount = Math.floor(clientWidth / (width + rowGap));
    container.style.width = columnCount * width + "px";
    // container.style.margin = '0 auto';
    let hrr = []
    for (let i = 0; i < item.length; i++) {
        if (i < columnCount) {
            item[i].style.top = "0px";
            item[i].style.left = i * width + rowGap * i + "px";
            hrr.push(item[i].offsetHeight + colGap);
        } else {
            let min = Math.min(...hrr);
            let index = hrr.indexOf(min);
            item[i].style.top = min + "px";
            item[i].style.left = index * width + index * rowGap + "px";
            hrr[index] += (item[i].offsetHeight + colGap);
        }
    }
}
function loading(length) {
    const fragment = document.createDocumentFragment();
    const container = document.getElementById('skeleton');
    //间距
    const rowGap = 15;
    const colGap = 15;
    const width = 400;
    //获取容器宽度计算出能放几列
    const conWidth = document.documentElement.clientWidth;
    const col = Math.floor(conWidth / (width + rowGap));
    //给container赋予width margin居中
    container.style.width = col * width + 'px';
    //记录每个图片的高度
    const heightArr = [];
    for (let i = 0; i < length; i += 1) {
        const height = Math.floor(Math.random() * 280 + 50);
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.className = 'aniLoading';
        li.style.width = width + 'px';
        li.style.height = height + 'px';
        span.className = 'shadow';
        if (i < col) {
            li.style.top = '0px';
            li.style.left = i * width + rowGap * i + 'px';
            heightArr.push(height + colGap);
        } else {
            //获取最小高度的列
            let minHeight = Math.min(...heightArr);
            let minCol = heightArr.indexOf(minHeight);
            li.style.left = minCol * width + rowGap * minCol + 'px';
            li.style.top = minHeight + 'px';

            //再将当前的高度累加到列中
            heightArr[minCol] += (height + colGap);
        }
        li.appendChild(span);
        fragment.appendChild(li);
    }
    container.appendChild(fragment);
}
window.addEventListener('load', function () {
    //测试加载动画
    // loading(20);
    renderImage('https://pixabay.com/api/?key=26285183-fe1756dda492091903dd0174c&q=yellow+flowers&image_type=photo&per_page=40');
});

window.addEventListener('resize', function () {
    resizeRender();
});

//等待所有的图片加载会有很长的白屏时间；要么使用一个个的添加，要么用临时占位显示加载动画；

//从1到2 在原有的基础上插入图片 当滚动到底部时添加图片