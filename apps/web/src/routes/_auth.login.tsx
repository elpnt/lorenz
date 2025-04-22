import { createFileRoute } from "@tanstack/react-router";

import { GoogleIcon } from "../components/icons";
import { Button } from "../components/ui/button";
import { Checkbox, CheckboxField } from "../components/ui/checkbox";
import { Divider } from "../components/ui/divider";
import { Heading } from "../components/ui/heading";
import { Strong, Text, TextLink } from "../components/ui/text";
import { TextField } from "../components/ui/text-field";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/_auth/login")({
	component: Login,
});

function Login() {
	return (
		<form
			action="#"
			method="POST"
			className="grid w-full max-w-sm grid-cols-1 gap-8"
		>
			{/* <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /> */}
			<Heading>Sign in to your account</Heading>

			<TextField label="Email" name="email" type="email" />
			<TextField label="Password" name="password" type="password" />
			<div className="flex items-center justify-between">
				<CheckboxField>
					<Checkbox name="remember">Remember me</Checkbox>
				</CheckboxField>
				<Text>
					<TextLink href="/forgot-password">
						<Strong>Forgot password?</Strong>
					</TextLink>
				</Text>
			</div>
			<Button type="submit" className="w-full">
				Login
			</Button>
			<Divider>Or continue with</Divider>
			<Button
				intent="outline"
				onPress={async () => {
					await authClient.signIn.social({
						provider: "google",
						callbackURL: "http://localhost:3000/auth-callback",
					});
				}}
			>
				<GoogleIcon />
				Google
			</Button>
			<Text>
				Don't have an account?{" "}
				<TextLink href="/register">
					<Strong>Sign up</Strong>
				</TextLink>
			</Text>
		</form>
	);
}
