<#include "../../org/alfresco/include/alfresco-template.ftl" />

<@templateHeader/>

<@templateBody>
   <div id="hd">
      <@region id="guest-header" scope="template"/>
   </div>
   <div id="bd">
      <div>
         <div id="yui-main">
            <div>
               <@region id="doclist" scope="template" />
            </div>
         </div>
      </div>
   </div>
</@>

<@templateFooter>
   <div id="ft">
      <@region id="footer" scope="global" protected=true />
   </div>
</@>
