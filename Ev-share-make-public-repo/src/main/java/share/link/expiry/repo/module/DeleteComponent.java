package share.link.expiry.repo.module;

import java.util.ArrayList;
import java.util.List;

import org.alfresco.model.ContentModel;
import org.alfresco.repo.module.AbstractModuleComponent;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.repository.StoreRef;
import org.alfresco.service.cmr.search.QueryConsistency;
import org.alfresco.service.cmr.search.ResultSet;
import org.alfresco.service.cmr.search.SearchParameters;
import org.alfresco.service.cmr.search.SearchService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * A component that will be started for this module and delete the custom and OOTB email templates
 *
 * @author Hiten Rastogi
 */
public class DeleteComponent extends AbstractModuleComponent {
    private static Log logger = LogFactory.getLog(DeleteComponent.class);

    private NodeService nodeService;
    
    private SearchService searchService;

    public void setSearchService(SearchService searchService) {
		this.searchService = searchService;
	}

    public void setNodeService(NodeService nodeService) {
        this.nodeService = nodeService;
    }

    /**
     * Control enters here
     */
    @Override
    protected void executeInternal() throws Throwable {
    	
    	/*String evEmailTemplatesPath = "PATH:\"/app:company_home/app:dictionary/app:email_templates/cm:EisenVault_Email_Templates\"";
    		XPath query will not work as the SOLR isn't fully initialized at this moment. So have to find it through
    		CMIS which takes more time
    	 Map<String,Serializable> params = new HashMap<>();
    	 params.put("query", evEmailTemplatesPath);
    	 NodeRef nodeRef = nodeLocatorService.getNode("xpath",null,params);*/
    	
    	 List<String> queryList = new ArrayList<>();
    	 
    	 queryList.add("SELECT * FROM  cmis:document WHERE  cmis:name = 'folder-share-link-expiry.js'");
    	 queryList.add("SELECT * FROM  cmis:document WHERE  cmis:name = 'share-link-expiry.js'");

    	 SearchParameters params = new SearchParameters();
    	 params.addStore(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE);
    	 params.setLanguage(SearchService.LANGUAGE_CMIS_ALFRESCO);
    	 params.setQueryConsistency(QueryConsistency.TRANSACTIONAL);
    	 
    	 for(String query : queryList){
    		 params.setQuery(query);
    		 ResultSet resultSet = searchService.query(params);
    		 if(resultSet.length() != 0){
        		 NodeRef nodeRef = resultSet.getNodeRef(0);
        		 logger.debug("\n\n");
        		 logger.debug("\n Got the noderef for " + nodeService.getProperty(nodeRef, ContentModel.PROP_NAME)+ " with noderef = " + nodeRef + " \n");
        		 logger.debug("\n Deleting the noderef " + nodeRef + " \n");
        		 logger.debug("\n\n");
        		 nodeService.deleteNode(nodeRef);
        	 }
    	 }
    }
}
