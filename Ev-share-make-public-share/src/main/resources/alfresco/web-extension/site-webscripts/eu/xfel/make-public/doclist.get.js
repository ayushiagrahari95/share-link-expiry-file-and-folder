/*
 * doclist
 *
 * Inputs:
 *  mandatory: nodeRef = parent space nodeRef
 *
 * Outputs: space - object containing documents to be listed publicly
 */

var nodeRef = page.url.args.nodeRef;
model.space = main(nodeRef);

function main(nodeRef)
{
    if (page.url.args["nodeRef"] == undefined)
    {
        // redirect to error page
        status.code = 400;
        status.message = "One or more parameters are missing";
        return;
    }
}
