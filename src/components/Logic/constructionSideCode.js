export function getConstructionSideCode(constructionSideNode) {
  return constructionSideNode
    ? `${constructionSideNode.construction.location.postcode.title}.` +
        `${constructionSideNode.construction.numInDistrict}.` +
        `${constructionSideNode.advertisingSide.side.format.code || '_'}` +
        `.${constructionSideNode.advertisingSide.side.code || '_'}` +
        `.${constructionSideNode.advertisingSide.code || '_'}`
    : '';
}
