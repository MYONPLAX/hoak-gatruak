import type TagGraphData from './classes/TagGraphData.js';

/**
 * Generate graph which tags parent-child relationship as directed acyclic graph
 * @param graphData // Class for bind nodes (tags) and classes: `TagGraphData`
 * @returns // Generated HTML data: `string`
 */
export function generateTagsGraph(graphData: TagGraphData): string {
  // Styles for flowchart
  const init = {
    theme: 'base',
    themeVariables: {
      primaryTextColor: '#16160E',
      primaryColor: '#CAE9FC',
      primaryBorderColor: '#A3BCCC',
      lineColor: '#888888',
    },
    flowchart: { curve: 'monotoneX' },
  } as const;

  // Calculate tag and relations
  const tags = graphData.getNodes().join(' ');
  const relations = graphData.getEdges().join(' ');

  // Add class to specific nodes
  const classRoot = `class ${graphData.getRootTags().join(',')} tag-root;`;
  const classLeaf = `class ${graphData.getLeafTags().join(',')} tag-leaf;`;
  const classVirtual = `class ${graphData.getVirtualTags().join(',')} tag-virtual;`;
  const classList = `${classRoot} ${classLeaf} ${classVirtual}`;

  // Mermaid syntax
  const graph = `%%{init: ${JSON.stringify(init)}}%% flowchart LR; ${tags} ${classList} ${relations}`;
  const graphSample = `%%{init: ${JSON.stringify(init)}}%%
  flowchart LR;
	parent1("Primary Parent");
	parent2("Parent");
	child("Child");

	parent1 --> child
	parent2 -.-> child

    default("Default Tag")
    root("Tag (Root)");
	leaf("Tag (Leaf)");
	virtual("Tag (Virtual)");

	class root tag-root;
	class leaf tag-leaf;
	class virtual tag-virtual;

	root --> default --> virtual --> leaf
	`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="./tagGraph.css">
		<script type="module">
			import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
			mermaid.initialize({ startOnLoad: true });
		</script>
	</head>
	<body>
    	<!-- prettier-ignore -->
		<pre class="mermaid">${graph}</pre>
    	<!-- prettier-ignore -->
		<pre class="mermaid">${graphSample}</pre>
	</body>
</html>`;

  return htmlContent;
}
