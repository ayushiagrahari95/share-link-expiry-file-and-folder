<@standalone>
   <@markup id="css" >
      <#-- CSS Dependencies -->
      <@link rel="stylesheet" type="text/css" href="${url.context}/res/components/quickshare/header.css" />
   </@>

   <@markup id="js"/>

   <@markup id="widgets"/>

   <@markup id="html">
      <@uniqueIdDiv>
         <div class="quickshare-header">

            <div class="quickshare-header-left">
               <img width="180" src="${url.context}/res/themes/baseTheme/images/company_logo.png">
            </div>

            <#if page.url.args.error! == "true">
               <script>
                  Alfresco.util.PopupManager.displayMessage({
                     text: "${authfailureMessage?js_string}"
                  });
               </script>
            </#if>

            <div class="clear"></div>

         </div>
      </@>
   </@>
</@>