<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<style>

#share_page tr:nth-child(odd){background-color: #f2f2f2;}

#share_page tr:hover {background-color: #ddd;}

#share_page{
margin: 0 auto !important;
width:100%;
}

.image{
text-align:right;
}

.document{
width:55%;
}

h3{
	padding-top:14px;
	padding-bottom: 14px;
	padding-left: 14px;
	text-align: left;
	background-color: #4CAF50;
	color: white;
	text-align: center;
}

</style>
</head>

<body>
<#if space??>
	<#if (space.name != "")>
		</br>
			<h1>Folder Name: <b>${space.name}</b></h1>
	</#if>
	<#if (space.properties["cm:title"]!="")>
		</br>
			<h2>Folder Title: <b>${space.properties["cm:title"]}</b></h2>
	</#if>
	<#if (space.properties["cm:description"]!="")>
		</br>
			<h2>Folder Description: <b>${space.properties["cm:description"]}</b></br></h2>
	</#if>
	<#-- Table of the documents in requested Space -->
	<#-- Shows the Icon and link to the content for the doc, also the size in KB and lock status -->
	<#---<b>check value of children:${space.hasChildren?c}></b> --->
    <#if (space.hasChildren?c=="true")>
    </br><h3><b>${message("doclist.folder.contents")}</b></h3></br>
    <table id="share_page">
    <#list space.children as child>
    <tr>
    <#if child.isDocument && (child.hasAspect("cm:workingcopy")?c=="false")>
	    	<td class="image">
	    		<a href="${url.context}${child.url}" target="new">
	    		<img src="${url.context}${child.icon16}" border=0></a>
	    	</td>
	    	<td class="document">
	    		<b><a href="${url.context}${child.url}" target="new">${child.properties.name}</a></b>
	    	</td>
    <#elseif child.typeShort=="cm:folder">
    	<td class="image"><img src="${url.context}${child.icon16}" border=0></a></td>
    	<td class="document">
    		<b>${child.properties.name}</b>
    	</td>
    </#if>
    </tr>
    </#list>
    </table>
    <#else>
      	<h3><b>${message("doclist.empty.folder")}</b></h3>
     </#if>
<#else>
    <h3><b>${message("doclist.error.invalid.folder")}</b></h3>
</#if>
</body>