<import resource="classpath:/alfresco/templates/webscripts/org/alfresco/slingshot/documentlibrary/action/action.lib.js">
/**
 * Makes document or folder and its child documents public by adding the guest user
 * as consumer.
 * 
 * @method POST
 */

/**
 * Entrypoint required by action.lib.js
 * 
 * @method runAction
 * @param p_params
 *            {object} Object literal containing files array
 * @return {object|null} object representation of action results
 */

function runAction(p_params) {
    var results = [];
    var nodeString = p_params.files[0];
    var nodeRef = utils.getNodeFromString(nodeString);

    var result = {
        action: "makePublicAction",
        success: true,
        added: false
    }

    logger.log("name " + nodeRef.name);

    if (grantGuestAccess(nodeRef))
        result.added = true;

    results.push(result);

    return results;
}

function grantGuestAccess(nodeRef) {
    var added = false;
    try {
    	logger.log("guest access is granted to "+nodeRef.name);
        nodeRef.setPermission("Consumer", "guest");
        var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
        var properties =  ctxt.getBean('global-properties', java.util.Properties);

        function getFormattedDate(mydate) {
            var str = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate() 
            return str;
        }

        var date1      = new Date();
        var date2      = new Date();
        var expiration = new Number(properties["qshared.effectivity.expiration.days"]);
        date2.setDate(date2.getDate()+expiration);

        nodeRef.addAspect("cm:effectivity");
        nodeRef.properties["cm:from"] = getFormattedDate(date1);
        nodeRef.properties["cm:to"]   = getFormattedDate(date2);

        /* logger.warn("[zk] Expiration period (days): " + properties["qshared.effectivity.expiration.days"]);
        logger.warn("[zk] Setting effectivity sharing to: " + getFormattedDate(date2) );*/
        nodeRef.save();
        logger.log("effectivity aspect is added");
        /*if (nodeRef.isContainer) {
            grantChildrenAccess(nodeRef, true);
        }*/
        added = true;
    } catch (e)
    {
        logger.log("Exception is"+e);
    }
    return added;
}

/* Bootstrap action script */
main();
