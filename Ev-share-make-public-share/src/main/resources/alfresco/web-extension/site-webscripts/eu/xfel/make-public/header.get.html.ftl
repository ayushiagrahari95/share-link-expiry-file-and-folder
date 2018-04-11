<#assign activePage = page.url.templateArgs.pageid!"">
<#assign siteTitle>${(page.url.args["title"]!"")?js_string}</#assign>
 <#assign logo=msg("header.logo")><#if logo="header.logo"><#assign logo="app-logo-share.png"></#if>
<div class="theme-bg-color-1 theme-border-1">
   <div class="title">
      <h1 class="theme-color-3"><span>${siteTitle}</span></h1>
   </div>
   <div class="make-public-logo">
        <img class="public-logo" src="${url.context}/res/themes/baseTheme/images/${logo}" width="84" height="84"/>
   </div>
</div>