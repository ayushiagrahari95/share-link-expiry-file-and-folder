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
	logger.warn("expiring the folder share");
	if(node.isContainer){
  logger.warn("running folder share expiration scripts");
  count = count + 1;
  logger.warn(count + ": "+node.displayPath+"/"+node.name);
  logger.warn("[zk] The public url is expired from folder--> "+node.properties["cm:to"]);
  node.removeAspect("cm:effectivity");
  logger.warn("[zk] effectivity aspect removed from folder");
  node.removePermission("Consumer", "guest");
  logger.warn("trying to remove the guest access from "+node.displayPath+"/"+node.name);
  logger.warn("guest access removed from folder");  
  node.save();
}
}
logger.warn("[zk] Done.");
