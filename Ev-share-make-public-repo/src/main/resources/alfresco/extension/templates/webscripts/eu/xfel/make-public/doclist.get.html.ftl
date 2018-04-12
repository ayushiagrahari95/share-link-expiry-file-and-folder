<#if space??>
	<#if (space.name != "")>
		<h1></br>
			<b>Folder Name:</b>${space.name}
		</h1>
	</#if>
	<#if (space.properties["cm:title"]!="")>
		<h2></br>
			<b>Title:</b>${space.properties["cm:title"]}
		</h2>
	</#if>
	<#if (space.properties["cm:description"]!="")>
		<h3></br>
			<b>Description:</b> ${space.properties["cm:description"]}</br>
		</h3>
	</#if>
<#-- Table of the documents in requested Space -->
<#-- Shows the Icon and link to the content for the doc, also the size in KB and lock status -->
	<#---<b>check value of children:${space.hasChildren?c}></b> --->
    <#if (space.hasChildren?c=="true")>
    <b>${message("doclist.folder.contents")}</b>
    <#list space.children as child>
    <table>
    <tr>
    <#if child.isDocument>
    	<td>
    		<a href="${url.context}${child.url}" target="new">
    		<img src="${url.context}${child.icon16}" border=0></a>
    	</td>
    	<td><a href="${url.context}${child.url}" target="new">${child.properties.name}</a></td>
    <#else>
    	<td><img src="${url.context}${child.icon16}" border=0></a></td>
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