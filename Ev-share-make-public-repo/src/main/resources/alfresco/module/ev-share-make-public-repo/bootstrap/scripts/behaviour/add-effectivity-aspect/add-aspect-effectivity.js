//
// Effectivity script for custom behaviour on adding aspect qshared
// 
var ctxt = Packages.org.springframework.web.context.ContextLoader.getCurrentWebApplicationContext();
var properties =  ctxt.getBean('global-properties', java.util.Properties);

function getFormattedDate(mydate) {
    var str = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate() 
    return str;
}

// Have a look at the behaviour object that should have been passed
if (behaviour == null) {
    logger.log("The behaviour object has not been set.");
    scriptFailed = true;
}

// Check the name of the behaviour
if (behaviour.name == null && behaviour.name != "onUpdateProperties") {
    logger.log("The behaviour name has not been set correctly.");
    scriptFailed = true;
} else {
    logger.log("Behaviour name: " + behaviour.name);
    //logger.log("behav:"+behaviour);
}

// Check behaviour arguments
if (behaviour.args == null) {
    logger.log("The args have not been set.");
    scriptFailed = true;

} else {
    var node       = behaviour.args[0];
    //var before = behaviour.args[1];
    //var after  = behaviour.args[2];

    var date1      = new Date();
    var date2      = new Date();
    var expiration = new Number(properties["qshared.effectivity.expiration.days"]);
    date2.setDate(date2.getDate()+expiration);

    node.addAspect("cm:effectivity");
    node.properties["cm:from"] = getFormattedDate(date1);
    node.properties["cm:to"]   = getFormattedDate(date2);
    
    logger.log("[zk] Expiration period (days): " + properties["qshared.effectivity.expiration.days"]);
    logger.log("[zk] Setting effectivity sharing to: " + getFormattedDate(date2) );
    node.save();
}
