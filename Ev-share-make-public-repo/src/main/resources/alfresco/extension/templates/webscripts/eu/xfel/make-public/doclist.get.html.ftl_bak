<#if space??>
<h1>${space.name}</h1>
<h2>${space.properties["cm:title"]}</h2>
<h3>${space.properties["cm:description"]}</h3>
<#-- Table of the documents in requested Space -->
<#-- Shows the Icon and link to the content for the doc, also the size in KB and lock status -->
<table>
    <tr>
    <td></td>
    <td><b>${message("templates.my_docs.name")}</b></td>
    <td><b>${message("templates.my_docs.size")}</b></td>
    </tr>
    <#list space.children as child>
    <#if child.isDocument>
    <tr>
    <td><a href="${url.context}${child.url}" target="new"><img
    src="${url.context}${child.icon16}" border=0></a></td>
    <td><a href="${url.context}${child.url}" target="new">${child.properties.name}</a></td>
    <td>${(child.size / 1000)?string("0.##")} ${message("templates.my_docs.kb")}</td>
    </tr>
    </#if>
    </#list>
</table>
<#else>
    <h1>${message("doclist.error.invalid.folder")}</h2>
</#if>