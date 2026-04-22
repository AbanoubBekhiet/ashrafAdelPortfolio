import Link from "next/link";

export default function Header({ variant = "home" }) {
	return (
		<nav className="border-b border-slate-200 bg-[#f7f3eb] sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
				<Link
					href="/"
					className="text-2xl font-semibold tracking-tight text-slate-900"
				>
					TerraData
				</Link>
				<div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
					<Link href="/" className="hover:text-slate-900">
						Home
					</Link>
					<Link href="/projects" className="hover:text-slate-900">
						Projects
					</Link>
					<a href="#" className="hover:text-slate-900">
						Resume
					</a>
					<a href="#" className="hover:text-slate-900">
						About
					</a>
				</div>
				<button className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-200/30 hover:bg-emerald-800 transition">
					Contact Me
				</button>
			</div>
		</nav>
	);
}
