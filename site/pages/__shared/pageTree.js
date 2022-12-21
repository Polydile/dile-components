import { PageTree, SiteMenu } from '@rocket/engine';

export const pageTree = new PageTree();
const filepath = new URL('../pageTreeData.rocketGenerated.json', import.meta.url);
await pageTree.restore(filepath);