const hourEle = document.getElementById('hour-hand');
const minuteEle = document.getElementById('minute-hand');
const secondEle = document.getElementById('second-hand');

function rotation(element, angle) {
    element.style.transform = `rotate(${angle}deg)`;
}
function getClock() {
    let date = new Date();
    //获取当前时间，计算出旋转角度
    let hour = 30 * ((date.getHours() % 12) + date.getMinutes() / 59);
    let minute = 6 * date.getMinutes();
    let second = 6 * date.getSeconds();

    rotation(hourEle, hour);
    rotation(minuteEle, minute);
    rotation(secondEle, second);

    requestAnimationFrame(getClock)
}
window.onload = getClock();


const btn = document.querySelector('.btn');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');
const light = [
    ['--bg-color', 'linear-gradient(158.53deg, #eef0f5 14.11%, #e2e4ea 85.89%)'],
    ['--clock-bg', 'linear-gradient(134.17deg, #e6e9ef 4.98%, #e6e9ef 4.99%, #eef0f5 94.88%)'],
    ['--clock-border', 'linear-gradient(170deg, #ffffff, #bac3cf)'],
    ['--clock-shadow', `19px 25px 92px -32px rgba(166, 180, 200, 0.45), -20px -20px 61px rgba(255, 255, 255, 0.53),
        13px 14px 12px -6px rgba(166, 180, 200, 0.57)`],
    ['--clock-inner-bg', 'linear-gradient(90deg, #eceef3 0%, #f1f2f7 100%)'],
    ['--clock-inner-shadow', `inset -12px -12px 30px rgba(255, 255, 255, 0.2), inset 7px 7px 8px rgba(166, 180, 200, 0.52),
        inset 10px 11px 30px -1px rgba(166, 180, 200, 0.71)`],
    ['--hand-color', '#646e82'],
    ['--second-hand-color', '#fd382d']
];
const dark = [
    ['--bg-color', 'linear-gradient(158.53deg, #363e46 14.11%, #2c343c 85.89%)'],
    ['--clock-bg', 'linear-gradient(134.17deg, #3e464f 4.99%, #424a53 94.88%)'],
    ['--clock-border', 'linear-gradient(170deg, #5d666d, #232a30)'],
    ['--clock-shadow', `19px 25px 92px -32px rgba(35, 40, 45, 0.35), -20px -20px 61px rgba(72, 83, 92, 0.25),
            13px 14px 12px - 6px rgba(35, 40, 45, 0.5)`],
    ['--clock-inner-bg', 'linear-gradient(248.53deg, #363e46 -12.81%, #2c343c 305.95%)'],
    ['--clock-inner-shadow', `inset -12px -12px 30px rgba(72, 83, 92, 0.3), inset 7px 7px 8px rgba(35, 40, 45, 0.25),
            inset 10px 11px 30px - 1px rgba(35, 40, 45, 0.5)`],
    ['--hand-color', '#8e98a1']
];
let control = true;
btn.onclick = function () {
    sun.classList.toggle('checked');
    moon.classList.toggle('checked');

    control = !control;
    if (control) {
        changeTheme(light);
    } else {
        changeTheme(dark);
    }
}
function changeTheme(theme) {
    for (const t of theme) {
        document.documentElement.style.setProperty(...t);
    }
}