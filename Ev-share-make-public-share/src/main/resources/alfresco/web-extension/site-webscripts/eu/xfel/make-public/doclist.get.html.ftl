<#assign el=args.htmlid?html>
<script type="text/javascript">//<![CDATA[
   var spaceList = new Alfresco.SpaceList("${el}").setOptions(
   {
      nodeRef: "${(page.url.args["nodeRef"]!null)?js_string}"
   }).setMessages(
      ${messages}
   );
//]]></script>
<p></p>
<div id="${el}-space">

</div>