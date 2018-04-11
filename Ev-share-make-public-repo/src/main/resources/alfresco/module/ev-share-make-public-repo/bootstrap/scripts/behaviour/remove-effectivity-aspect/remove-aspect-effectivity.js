//
// Effectivity script for custom behaviour on removing aspect qshared
//

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
var node = behaviour.args[0];
node.removeAspect("cm:effectivity");
logger.warn("effectivity aspect removed after unsharing the file from"+node.name);
node.save
}