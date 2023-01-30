let itemList = news.result.data;
function createItems(obj) {
    //生成每个项节点
    let newItems = createEle({ classNames: 'news-items' });

    let left = createEle({ classNames: 'left' });
    let img = createEle({ nodeName: 'img' });
    img.src = obj.thumbnail_pic_s ? obj.thumbnail_pic_s : './images/lose.png';
    img.alt = 'news_title';
    left.appendChild(img);

    let right = createEle({ classNames: 'right' });
    let a = createEle({ nodeName: 'a', content: obj.title });
    a.href = obj.url;
    right.appendChild(a);

    let newInfo = createEle({ classNames: 'news-info' });
    let date = createEle({ nodeName: 'span', content: obj.date, classNames: 'date' });
    let author_name = createEle({ nodeName: 'span', content: obj.author_name, classNames: 'author_name' });
    let category = createEle({ nodeName: 'span', classNames: 'category', content: obj.category });
    newInfo.appendChild(date);
    newInfo.appendChild(author_name);
    newInfo.appendChild(category);
    right.appendChild(newInfo)

    newItems.appendChild(left);
    newItems.appendChild(right);
    return newItems;
}
function createEle(options) {
    let { classNames, content, nodeName } = options;
    if (!nodeName) { nodeName = 'div'; }
    if (!content) { content = ''; }
    let ele = document.createElement(nodeName);
    if (Array.isArray(classNames)) {
        ele.classList.add(...classNames);
    }
    if (classNames && !Array.isArray(classNames)) {
        ele.classList.add(classNames);
    }
    let text = content;
    if (typeof content === 'string') {
        text = document.createTextNode(content);
    }
    ele.appendChild(text);
    return ele;
}
function addItemsNode(itemList) {
    //添加项节点
    const newContainer = document.querySelector('.news-container');
    const fragment = document.createDocumentFragment();
    itemList.forEach(i => {
        let node = createItems(i);
        fragment.appendChild(node);
    });
    newContainer.appendChild(fragment);
}

window.onload = function () {
    addItemsNode(itemList);
}