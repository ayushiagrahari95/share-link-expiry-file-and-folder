<#if space??>
	<#if (space.name != "")>
		<h1>
			<b>Folder Name:</b>${space.name}
		</h1>
	</#if>
	<#if (space.properties["cm:title"]!="")>
		<h2>
			<b>Title:</b>${space.properties["cm:title"]}
		</h2>
	</#if>
	<#if (space.properties["cm:description"]!="")>
		<h3>
			<b>Description:</b>${space.properties["cm:description"]}
		</h3>
	</#if>
<#-- Table of the documents in requested Space -->
<#-- Shows the Icon and link to the content for the doc, also the size in KB and lock status -->
	<#---<b>check value of children:${space.hasChildren?c}></b> --->
    <#if (space.hasChildren?c=="true")>
    <b>${message("templates.my_docs.name")}</b>
    <#list space.children as child>
    <table>
    <tr>
    <td><a href="${url.context}${child.url}" target="new"><img
    src="${url.context}${child.icon16}" border=0></a></td>
    <#if child.isDocument>
    <td><a href="${url.context}${child.url}" target="new">${child.properties.name}</a></td>
    <#else>
    	<td>${child.properties.name}</td>
    </#if>
    </tr>
    </table>
    </#list>
    <#else>
      	<p>${message("doclist.empty.folder")}</p>
      </#if>
<#else>
    <h1>${message("doclist.error.invalid.folder")}</h2>
</#if>