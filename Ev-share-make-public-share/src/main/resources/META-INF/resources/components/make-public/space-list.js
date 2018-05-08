/**
 * Space list component.
 * 
 * @namespace Alfresco
 * @class Alfresco.SpaceList
 */
(function()
{
   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Event = YAHOO.util.Event;
      
   /**
    * SpaceList constructor.
    * 
    * @param {String} htmlId The HTML id of the parent element
    * @return {Alfresco.SpaceList} The new SpaceList instance
    * @constructor
    */
   Alfresco.SpaceList = function(htmlId)
   {
      Alfresco.SpaceList.superclass.constructor.call(this, "Alfresco.SpaceList", htmlId);
      return this;
   }
   
   YAHOO.extend(Alfresco.SpaceList, Alfresco.component.Base,
   {
       /**
       * Object container for initialization options
       *
       * @property options
       * @type object
       */
      options:
      {
         /**
          * Site
          * 
          * @property site
          * @type strtring
          * @default null
          */
         nodeRef: null
      },
      
      /**
       * Fired by YUI when parent element is available for scripting.
       * Component initialisation, including instantiation of YUI widgets and event listener binding.
       *
       * @method onReady
       */
      onReady: function UP_onReady()
      {
        
         /* construct the request url*/
    	 /*For installation*/
    	 var requestUrl =  window.location.protocol + "//" + window.location.host + "/alfresco/s/eu/xfel/make-public/doclist?nodeRef=" + this.options.nodeRef + "&guest=true";
    	  //var requestUrl =  Alfresco.constants.URL_CONTEXT + "proxy/alfresco-noauth/eu/xfel/make-public/doclist?nodeRef=" + this.options.nodeRef + "&guest=true";
    	  
    	  /*for standalone*/ 
    	 /* var requestUrl =  Alfresco.constants.PROXY_URI + "eu/xfel/make-public/doclist?nodeRef=" + this.options.nodeRef + "&guest=true";*/
    	  /*var requestUrl =  window.location.protocol + "/share/proxy/alfresco/eu/xfel/make-public/doclist?nodeRef=" + this.options.nodeRef;*/
         // execute ajax request
             Alfresco.util.Ajax.request(
            {
              url: requestUrl,
              method: Alfresco.util.Ajax.GET,
              requestContentType: "text/html",
              responseContentType: "text/html",
               successCallback:
               {
                  fn: this.loadDocumentList,
                  scope: this
               },
               failureCallback:
               {
                   fn: function dlA_ondoclist_refreshFailure(response)
                   {

                   },
                   scope: this
               }
            });
      },
      
      /**
       * Success handler for a document list request. Updates the UI using the data
       * provided in the response object.
       * 
       * @param response {object} the ajax request response
       */
      loadDocumentList: function loadDocumentListSuccess(response)
      {
         
         // get the container div to insert the the post into
         var viewDiv = Dom.get(this.id + '-space');
         
         if (viewDiv == null) 
             return;
                           
         viewDiv.innerHTML = response.serverResponse.responseText;

      },

      
   });
})();