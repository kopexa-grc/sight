import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */

// biome-ignore lint/suspicious/noExplicitAny: not relevant
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
	stories: [
		"../src/**/*.mdx",
		"../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../../components/**/stories/**/*.stories.@(js|jsx|ts|tsx)",
		// ⛔️ exclude imported stories from nested node_modules in other workspace packages
		"!../../**/node_modules/**/*.stories.@(js|jsx|ts|tsx)",
		"!../../components/*/node_modules/**/*.stories.@(js|jsx|ts|tsx)",
		"!../../components/**/node_modules/**/*.stories.@(js|jsx|ts|tsx)",
		"!../**/node_modules/**/*.stories.@(js|jsx|ts|tsx)",
	],
	staticDirs: ["../public"],
	addons: [
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-vitest"),
		getAbsolutePath("@storybook/addon-themes"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
	core: {
		disableTelemetry: true,
	},
	typescript: {
		reactDocgen: false,
	},
	features: {
		backgrounds: false,
	},
};
export default config;
