//
// Script for quartz
// 
var def = {
   query: 'ASPECT:"cm:effectivity" AND @cm\\:to:[MIN TO NOW]',
   language: "fts-alfresco"
};
var nodes = search.query(def);
//var nodes = search.luceneSearch('ASPECT:"qshare:shared" AND @cm\\:to:[MIN TO NOW]');
var count = 0;
for each(var node in nodes) {
	logger.log("expiring the folder share");
	if(node.isContainer){
  logger.log("running folder share expiration scripts");
  count = count + 1;
  logger.log(count + ": "+node.displayPath+"/"+node.name);
  logger.log("[zk] The public url is expired from folder--> "+node.properties["cm:to"]);
  node.removeAspect("cm:effectivity");
  logger.log("[zk] effectivity aspect removed from folder");
  node.removePermission("Consumer", "guest");
  logger.log("trying to remove the guest access from "+node.displayPath+"/"+node.name);
  logger.log("guest access removed from folder");  
  node.save();
}
}
logger.log("[zk] Done.");
