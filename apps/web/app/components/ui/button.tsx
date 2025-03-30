export default function Button({ children }: { children: React.ReactNode }) {
	return (
		<button
			className="bg-zinc-900 text-white rounded-full px-4 py-2"
			type="button"
		>
			{children}
		</button>
	);
}
