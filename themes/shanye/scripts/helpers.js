/* global hexo */
'use strict';

/**
 * 山野主题 · 模板辅助函数
 * ------------------------------------------------------------------
 * 职责：把「分类」翻译成模块 / 列表页 / URL，供 EJS 模板直接调用。
 * 模块与分类的展示信息来自主题配置 themes/shanye/_config.yml，
 * URL 片段来自站点配置 _config.yml 的 category_map。
 * 因此：新增分类只需写进文章 front-matter + 补一条 category_map，
 * 无需改动任何模板代码（PRD 验收标准 4）。
 */

/* ---------------- 基础工具 ---------------- */

/** 主题配置里的三大模块 */
function getModules() {
  const config = hexo.theme.config;
  return (config && config.modules) || [];
}

/** 文章的 Category 对象数组 */
function catsOf(post) {
  if (!post || !post.categories) return [];
  const cats = post.categories;
  return typeof cats.toArray === 'function' ? cats.toArray() : Array.prototype.slice.call(cats);
}

/** 分类中文名 -> URL 片段 */
function slugOf(name) {
  const map = hexo.config.category_map || {};
  return Object.prototype.hasOwnProperty.call(map, name) ? map[name] : name;
}

/** 在一组分类名里找到所属模块 */
function matchModule(names) {
  const mods = getModules();
  for (let i = 0; i < mods.length; i++) {
    if (names.indexOf(mods[i].name) !== -1) return mods[i];
  }
  return null;
}

/* ---------------- 分类 / 模块 ---------------- */

/** 分类中文名 -> URL 片段（模板里也可用） */
hexo.extend.helper.register('slug_of', slugOf);

/** 模块列表页 URL，如 /portfolio/ */
hexo.extend.helper.register('mod_url', function (mod) {
  return mod ? this.url_for(slugOf(mod.name) + '/') : this.url_for('/');
});

/** 分类列表页 URL，如 /portfolio/web/ */
hexo.extend.helper.register('cat_url', function (mod, catName) {
  if (!mod) return this.url_for('/');
  return this.url_for(slugOf(mod.name) + '/' + slugOf(catName) + '/');
});

/** 文章所属模块（一级分类） */
hexo.extend.helper.register('mod_of_post', function (post) {
  return matchModule(catsOf(post).map(function (c) { return c.name; }));
});

/** 文章的二级分类名 */
hexo.extend.helper.register('sub_of_post', function (post) {
  const mod = matchModule(catsOf(post).map(function (c) { return c.name; }));
  const sub = catsOf(post).find(function (c) { return !mod || c.name !== mod.name; });
  return sub ? sub.name : '';
});

/** 由分类名反查所属模块（分类页用，一级/二级都能命中） */
hexo.extend.helper.register('mod_of_category', function (name) {
  const mods = getModules();
  const direct = mods.find(function (m) { return m.name === name; });
  if (direct) return direct;
  return mods.find(function (m) {
    return (m.categories || []).some(function (c) { return c.name === name; });
  }) || null;
});

/** 模块下的全部二级分类 */
hexo.extend.helper.register('mod_categories', function (mod) {
  return (mod && mod.categories) || [];
});

/* ---------------- 文章 ---------------- */

/** 某个模块下的全部文章（按时间倒序） */
hexo.extend.helper.register('posts_of', function (mod) {
  if (!mod) return [];
  return this.site.posts.filter(function (post) {
    return catsOf(post).some(function (c) { return c.name === mod.name; });
  }).sort('-date');
});

/** 摘要：优先用 front-matter 的 description，否则截取正文纯文本 */
hexo.extend.helper.register('summary_of', function (post, len) {
  if (post.description) return post.description;
  const text = String(post.content || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const max = len || 88;
  return text.length > max ? text.slice(0, max) + '…' : text;
});

/* ---------------- 装饰元素 ---------------- */

const ICONS = {
  mountain: '<polyline points="3 20 9 8 13 14 16 10 21 20"/><line x1="3" y1="20" x2="21" y2="20"/>',
  pen: '<path d="M4 20l1-5L16 4l4 4L9 19l-5 1z"/><line x1="14" y1="6" x2="18" y2="10"/>',
  book: '<path d="M4 6a2 2 0 0 1 2-2h5v16H6a2 2 0 0 0-2 2V6z"/><path d="M20 6a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2V6z"/>',
  wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>'
};

/** 线性风景图标 */
hexo.extend.helper.register('icon', function (name) {
  const paths = ICONS[name] || ICONS.mountain;
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"'
    + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
});

/** 山峦分隔线 */
hexo.extend.helper.register('ridge', function () {
  return '<svg class="ridge" viewBox="0 0 1200 64" preserveAspectRatio="none" aria-hidden="true">'
    + '<path d="M0,64 L0,40 L140,14 L260,44 L400,10 L540,42 L700,16 L840,46 L980,18 L1120,44 L1200,26 L1200,64 Z" fill="#e9f6f1"/>'
    + '<path d="M0,64 L0,52 L160,32 L300,54 L440,28 L600,54 L760,34 L900,56 L1040,34 L1200,50 L1200,64 Z" fill="#eaf6fb"/>'
    + '</svg>';
});
