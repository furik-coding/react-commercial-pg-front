export const stubDataBrands = (item) => ({
  key: item.node.id,
  brand: item.node.title && item.node.title,
  partner: item.node.partner ? item.node.partner:'',
  workingSector: item.node.workingSector && item.node.workingSector
});
