import { MarkdownPostProcessorContext, Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

// interface MyPluginSettings {
// 	mySetting: string;
// }

// const DEFAULT_SETTINGS: MyPluginSettings = {
// 	mySetting: 'default'
// }

export default class BulletColoringPlugin extends Plugin {
	async onload() {
		// obsidian.MarkdownPreviewRenderer.registerPostProcessor(
		//   this.tagColorProcessor
		// );

		// this.registerCodeMirror((cm) => {
		//   cm.on('change', () => {
		//     // Get the currently active line
		//     const line = cm.getCursor().line;

		//     // Get the DOM element representing the line
		//     const lineElement = cm.getLineHandle(line);

		//     console.log('bullet', line, lineElement);

		//     this.tagColorProcessor(lineElement, null);
		//   });
		// });

		this.registerMarkdownPostProcessor(this.tagColorProcessor);
	}

	onunload() {}

	tagColorProcessor = (
		element: HTMLElement,
		ctx: MarkdownPostProcessorContext
	) => {
		const liBullets = element.querySelectorAll("li");
		if (!liBullets.length) return;

		liBullets.forEach((li) => {
			if (li.innerText.startsWith("M:")) {
				li.classList.add("bullet-task-moved");
			} else if (li.innerText.startsWith("I:")) {
				li.classList.add("bullet-task-important");
			} else if (li.innerText.startsWith("T:")) {
				li.classList.add("bullet-task-open");
			} else if (li.innerText.startsWith("D:")) {
				li.classList.add("bullet-task-done");
			}
		});
	};
}
