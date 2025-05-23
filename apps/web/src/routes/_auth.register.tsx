import { createFileRoute } from "@tanstack/react-router";

import { GoogleIcon } from "../components/icons";
import { Button } from "../components/ui/button";
import { Divider } from "../components/ui/divider";
import { Heading } from "../components/ui/heading";
import { Strong, Text, TextLink } from "../components/ui/text";
import { TextField } from "../components/ui/text-field";
import { signIn } from "../lib/auth-client";

export const Route = createFileRoute("/_auth/register")({
	component: Register,
});

function Register() {
	return (
		<form
			action="#"
			method="POST"
			className="grid w-full max-w-sm grid-cols-1 gap-8"
		>
			{/* <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /> */}
			<Heading>Create your account</Heading>

			<TextField label="Email" name="email" type="email" />
			<TextField label="Password" name="password" type="password" />
			<Button type="submit" className="w-full">
				Create account
			</Button>
			<Divider>Or continue with</Divider>
			<Button
				intent="outline"
				onPress={async () => {
					await signIn.social({
						provider: "google",
						callbackURL: "http://localhost:3000",
					});
				}}
			>
				<GoogleIcon />
				Google
			</Button>
			<Text>
				Already have an account?{" "}
				<TextLink to="/login">
					<Strong>Sign in</Strong>
				</TextLink>
			</Text>
		</form>
	);
}
