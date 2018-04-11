/*
 * doclist
 *
 * Inputs:
 *  mandatory: nodeRef = parent space nodeRef
 *
 * Outputs: space - object containing documents to be listed publicly
 */

var nodeRef = args["nodeRef"];
model.space = main(nodeRef);

function main(nodeRef)
{
   var space = null;
   if (nodeRef != null) {
       space = search.findNode(nodeRef);
   }
   return space;
}
