/**
 * 山野主题 - 移动端导航切换
 */
(function() {
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // 点击外部收起菜单
  document.addEventListener('click', function() {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    }
  });

  // 阻止 nav 内部点击冒泡
  nav.addEventListener('click', function(e) {
    e.stopPropagation();
  });
})();
