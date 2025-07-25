import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../tailwind.css";
import { handlers } from "./mocks/handlers";

initialize();

const preview: Preview = {
	loaders: [mswLoader],
	parameters: {
		html: {
			root: "#html-addon-root",
			removeEmptyComments: true,
		},
		controls: {
			hideNoControlsWarning: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
		docs: {
			codePanel: true,
		},
		msw: {
			handlers,
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
