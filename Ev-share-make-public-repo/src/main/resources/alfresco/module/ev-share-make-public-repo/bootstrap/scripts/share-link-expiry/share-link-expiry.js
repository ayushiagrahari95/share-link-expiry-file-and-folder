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
logger.log("[zk] Starting effectivity qshared:");
for each(var node in nodes) {
	logger.log("expiring the file share");
	if(node.isDocument){ 
  logger.log("running file share expiration scripts");
  count = count + 1;
  logger.log(count + ": "+node.displayPath+"/"+node.name);
  logger.log("[zk] The public url is expired from file --> "+node.properties["cm:to"]);
  logger.log("[zk] Cleaning qshared aspect from file..");
  node.removeAspect("qshare:shared");
  logger.log("[zk] Cleaning effectivity aspect from file");
  node.removeAspect("cm:effectivity");
  node.save();
	}
	}
logger.log("[zk] Done.");
