function drawTurntable(todoList) {
    //绘制转盘
    //初始化canvas
    const w = 600;
    const h = 600;
    let ctx = initCanvas(w, h);
    const gap = 20;
    // 绘制一个圆
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - gap, 0, 2 * Math.PI);
    ctx.stroke();


    let length = todoList.length;

    ctx.translate(w / 2, h / 2);
    let angle = 360 / length;
    ctx.font = '20px sans-serif'
    for (let i = 0; i < length; i += 1) {
        ctx.rotate(i * angle * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w / 2 - gap, 0);
        ctx.fillText(todoList[i], 50, h / 3 + 40)
        ctx.stroke();
    }


}
function initCanvas(width = 400, height = 400, canvas = document.getElementById('turntable')) {
    if (!canvas) { throw new Error('The web page does not have a canvas named turntable!'); }
    canvas.width = width;
    canvas.height = height;
    canvas.style.transform = 'rotate(30deg)';
    return canvas.getContext("2d");
}
window.onload = () => {
    let canvas = document.getElementById('turntable')
    //绑定点击事件
    const btn = document.querySelector('.btn');
    btn.onclick = function () {
        let a = Math.random() * 1000 + 400;
        canvas.style.transform = `rotate(${a}deg)`;
    }
    const todoList = ['微信小程序', 'node.is', '响应式布局', 'webpack', 'es6', '面试题', 'vue', '项目'];
    drawTurntable(todoList);
}