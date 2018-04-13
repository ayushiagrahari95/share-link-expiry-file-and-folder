<#if space??>
	<#if (space.name != "")>
		</br>
			Folder Name: <b>${space.name}</b>
	</#if>
	<#if (space.properties["cm:title"]!="")>
		</br>
			Folder Title: <b>${space.properties["cm:title"]}</b>
	</#if>
	<#if (space.properties["cm:description"]!="")>
		</br>
			Folder Description: <b>${space.properties["cm:description"]}</b></br>
	</#if>
	<#-- Table of the documents in requested Space -->
	<#-- Shows the Icon and link to the content for the doc, also the size in KB and lock status -->
	<#---<b>check value of children:${space.hasChildren?c}></b> --->
    <#if (space.hasChildren?c=="true")>
    </br><b>${message("doclist.folder.contents")}</b></br>
    <#list space.children as child>
    <table>
    <tr>
    <#if child.isDocument>
    	<td>
    		<a href="${url.context}${child.url}" target="new">
    		<img src="${url.context}${child.icon16}" border=0></a>
    	</td>
    	<td>
    		<b><a href="${url.context}${child.url}" target="new">${child.properties.name}</a></b>
    	</td>
    <#else>
    	<td><img src="${url.context}${child.icon16}" border=0></a></td>
    	<td>
    		<b>${child.properties.name}</b>
    	</td>
    </#if>
    </tr>
    </table>
    </#list>
    <#else>
      	<p><h3>${message("doclist.empty.folder")}</h3></p>
     </#if>
<#else>
    <h3>${message("doclist.error.invalid.folder")}</h3>
</#if>