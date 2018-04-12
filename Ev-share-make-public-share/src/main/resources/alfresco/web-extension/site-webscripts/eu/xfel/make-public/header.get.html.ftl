<#include "../../../org/alfresco/components/component.head.inc">
<@markup id="css" >
      <#-- CSS Dependencies -->
      <@link rel="stylesheet" type="text/css" href="${url.context}/res/components/quickshare/header.css" />
      <@link rel="stylesheet" type="text/css" href="${page.url.context}/res/components/make-public/header.css" />
</@>
   

<#assign activePage = page.url.templateArgs.pageid!"">
<#assign siteTitle>${(page.url.args["title"]!"")?js_string}</#assign>
<div class="theme-bg-color-1 theme-border-1">
   <div class="title">
      <h1 class="theme-color-3"><span>${siteTitle}</span></h1>
   </div>
   <div class="make-public-logo">
        <img class="public-logo" src="${url.context}/res/themes/baseTheme/images/company_logo.png" width="180" style="background-color:white"/>
   </div>
</div>