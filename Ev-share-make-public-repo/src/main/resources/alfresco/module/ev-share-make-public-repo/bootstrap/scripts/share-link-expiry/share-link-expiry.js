//
// Script for quartz
// 
var def = {
   query: 'ASPECT:"qshare:shared" AND @cm\\:to:[MIN TO NOW]',
   language: "fts-alfresco"
};
var nodes = search.query(def);
//var nodes = search.luceneSearch('ASPECT:"qshare:shared" AND @cm\\:to:[MIN TO NOW]');
var count = 0;
logger.warn("[zk] Starting effectivity qshared:");
for each(var node in nodes) {
	logger.warn("expiring the file share");
	if(node.isDocument){ 
  logger.warn("running file share expiration scripts");
  count = count + 1;
  logger.warn(count + ": "+node.displayPath+"/"+node.name);
  logger.warn("[zk] The public url is expired from file --> "+node.properties["cm:to"]);
  logger.warn("[zk] Cleaning qshared aspect from file..");
  node.removeAspect("qshare:shared");
  logger.warn("[zk] Cleaning effectivity aspect from file");
  node.removeAspect("cm:effectivity");
  node.save();
	}
	}
logger.warn("[zk] Done.");
