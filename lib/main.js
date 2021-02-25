import { defineAsyncComponent } from "vue";

const Stories = {
	install: (app, options) => {
		const StoriesComponent = defineAsyncComponent(() =>
			import("./components/Stories")
		);

		const StoryComponent = defineAsyncComponent(() =>
			import("./components/Story")
		);

		app.component("Stories", StoriesComponent);
		app.component("Story", StoryComponent);
	},
};

export default Stories;
