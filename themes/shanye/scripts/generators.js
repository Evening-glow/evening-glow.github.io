/* global hexo */
'use strict';

/**
 * 山野主题 · 强制页面生成器
 * ------------------------------------------------------------------
 * 职责：Hexo 默认不生成没有文章的分类页。
 * 本脚本通过读取主题配置的 modules，强制为所有定义的分类生成占位页，
 * 从而确保前端点击「空分类」时能看到占位符而不是 404。
 */

hexo.extend.generator.register('empty_category_pages', function(site) {
  const themeConfig = hexo.theme.config;
  const siteConfig = hexo.config;
  const modules = themeConfig.modules || [];
  const categoryMap = siteConfig.category_map || {};
  const routes = [];

  // 获取分类映射的 Slug
  function getSlug(name) {
    return categoryMap[name] || name;
  }

  // 遍历所有模块和子分类
  modules.forEach(mod => {
    const modSlug = getSlug(mod.name);
    
    // 1. 处理一级模块页 (如 /portfolio/)
    const modPath = modSlug + '/';
    const hasModPage = site.categories.findOne({ name: mod.name });
    
    // 如果 Hexo 没生成该一级分类页，我们手动补一个
    if (!hasModPage) {
      routes.push({
        path: modPath + 'index.html',
        layout: ['category', 'archive', 'index'],
        data: {
          base: modPath,
          total: 1,
          current: 1,
          current_url: modPath,
          posts: site.posts.limit(0), // 传空列表
          category: mod.name,
          page_type: 'category'
        }
      });
    }

    // 2. 处理二级分类页 (如 /portfolio/web/)
    const subCats = mod.categories || [];
    subCats.forEach(cat => {
      const catSlug = getSlug(cat.name);
      const catPath = modSlug + '/' + catSlug + '/';
      
      // 检查站点中是否已有该二级分类的数据
      const hasCatPage = site.categories.findOne({ name: cat.name });
      
      // 注意：Hexo 的 site.categories 是扁平的，这里我们要确保生成的路径是 /一级/二级/
      // 如果没有文章命中该分类，强制生成
      if (!hasCatPage) {
        routes.push({
          path: catPath + 'index.html',
          layout: ['category', 'archive', 'index'],
          data: {
            base: catPath,
            total: 1,
            current: 1,
            current_url: catPath,
            posts: site.posts.limit(0),
            category: cat.name,
            page_type: 'category'
          }
        });
      }
    });
  });

  return routes;
});
