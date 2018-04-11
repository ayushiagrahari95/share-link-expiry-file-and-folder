/**
 * DocumentList Make or Remove public action
 * 
 * @namespace Alfresco
 * @class Alfresco.DocumentList
 */
(function () {

    /**
     * Renders public URL on document list
     * 
     * @method registerRenderer
     * @param record {object} Object literal representing one file or folder to be actioned upon
     * @param label {object}
     */
    if (Alfresco.DocumentList)
    {
        YAHOO.Bubbling.fire("registerRenderer",
                {
                    propertyName: "public-url",
                    renderer: function public_renderer(record, label)
                    {
                        var jsNode = record.jsNode,
                                html = "";
                        
                        /*if (jsNode.isContainer)*/
                        var href = window.location.protocol + "//" + window.location.host + "/share/page/guest-access?nodeRef=" + jsNode.nodeRef;
                       /* if (!jsNode.isContainer) {
                            var nRef = jsNode.nodeRef.storeType + "/" + jsNode.nodeRef.storeId + "/" + jsNode.nodeRef.id;
                            href = window.location.protocol + "//" + window.location.host + "/alfresco/d/a/" + nRef + "/" +
                                    jsNode.properties["cm:name"];*/
                            
                        /*}*/
                        html = '<span class="item">' + label + '<b>' + "<a href='" + href + "' target='_blank'>" + href + '</a>' + '</b></span>';

                        return html;
                    }
                });
    }

    /**
     * Make Public Action. Adds Guest access to folder or document
     *
     * @method makePublicAction
     * @param file {object} Object literal representing one file or folder to be actioned upon
     */
    YAHOO.Bubbling.fire("registerAction",
            {
                actionName: "makePublicAction",
                fn: function makePublic(file) {
                    var msg = this.msg("message.make-public.confirm", file.displayName)
                    if (file.jsNode.isContainer) {
                        msg = this.msg("message.make-public.folder.confirm", file.displayName)
                    }
                    var rv = confirm(msg);
                    if (rv === false) {
                        return false;
                    }
                    this.modules.actions.genericAction({
                        success: {
                            events: [{
                                    name: "metadataRefresh"
                                }],
                            callback: {
                                fn: function DL_oAN_success(data) {
                                    var resultJson = YAHOO.lang.JSON.parse(data.serverResponse.responseText);
                                    var added = resultJson.results[0].added;
                                    if (added)
                                        Alfresco.util.PopupManager.displayMessage({
                                            text: this.msg("message.public.added", file.displayName)
                                        });
                                    else
                                        Alfresco.util.PopupManager.displayMessage({
                                            text: this.msg("message.make-public.failure", file.displayName)
                                        });
                                },
                                scope: this
                            }
                        },
                        failure: {
                            message: this.msg("message.make-public.failure", file.displayName)
                        },
                        webscript: {
                            name: "eu/xfel/make-public",
                            stem: Alfresco.constants.PROXY_URI,
                            method: Alfresco.util.Ajax.POST
                        },
                        config: {
                            requestContentType: Alfresco.util.Ajax.JSON,
                            dataObj: {
                                nodeRefs: [file.nodeRef]
                            }
                        }
                    });
                }
            });

    /**
     * Remove Public Action. Removes Guest access from folder and children or single document
     *
     * @method removePublicAction
     * @param file {object} Object literal representing one file or folder to be actioned upon
     */
    YAHOO.Bubbling.fire("registerAction", {
        actionName: "removePublicAction",
        fn: function makePublic(file) {
            this.modules.actions.genericAction({
                success: {
                    events: [{
                            name: "metadataRefresh"
                        }],
                    callback: {
                        fn: function DL_oAN_success(data) {
                            var resultJson = YAHOO.lang.JSON.parse(data.serverResponse.responseText);
                            var removed = resultJson.results[0].removed;
                            if (removed)
                                Alfresco.util.PopupManager.displayMessage({
                                    text: this.msg("message.public.removed", file.displayName)
                                });
                            else
                                Alfresco.util.PopupManager.displayMessage({
                                    text: this.msg("message.remove-public.failure", file.displayName)
                                });
                        },
                        scope: this
                    }
                },
                failure: {
                    message: this.msg("message.remove-public.failure", file.displayName)
                },
                webscript: {
                    name: "eu/xfel/remove-public",
                    stem: Alfresco.constants.PROXY_URI,
                    method: Alfresco.util.Ajax.POST
                },
                config: {
                    requestContentType: Alfresco.util.Ajax.JSON,
                    dataObj: {
                        nodeRefs: [file.nodeRef]
                    }
                }
            });
        }
    });
})();
