import type { StorybookConfig } from "@storybook/react-vite";

import { dirname, join } from "node:path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
	return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
	stories: [
		// "../stories/**/*.mdx",
		// "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		{
			directory: "../../web/src",
			titlePrefix: "Web",
		},
	],
	addons: [
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/addon-interactions"),
		getAbsolutePath("@storybook/addon-themes"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
	typescript: {
		reactDocgenTypescriptOptions: {
			// この設定は monorepo 配下にある各種コンポーネントの JSDoc を認識させるために必要。
			// cf. https://github.com/storybookjs/storybook/issues/21399#issuecomment-1473800791
			include: ["../../../**/*.tsx"],
		},
	},
};
export default config;
