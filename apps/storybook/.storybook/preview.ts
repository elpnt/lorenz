import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/react";

import "../styles.css";

export const decorators: Decorator[] = [
	withThemeByClassName({
		themes: {
			light: "light",
			dark: "dark",
		},
		defaultTheme: "light",
	}),
];

const preview: Preview = {
	parameters: {
		backgrounds: {
			values: [
				{ name: "Light", value: "#ffffff" },
				{ name: "Dark", value: "#18181b" }, // equivalent to bg-zinc-900
			],
			default: "Light",
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
