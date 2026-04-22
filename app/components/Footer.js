export default function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-[#f7f3eb] py-12">
			<div className="max-w-7xl mx-auto px-6 text-center text-slate-600">
				<p className="text-sm mb-4">TerraData Portfolio. Rooted in insights.</p>
				<div className="flex flex-wrap items-center justify-center gap-6 text-sm">
					<a href="#" className="hover:text-slate-900 transition">
						LinkedIn
					</a>
					<a href="#" className="hover:text-slate-900 transition">
						GitHub
					</a>
					<a href="#" className="hover:text-slate-900 transition">
						Tableau Public
					</a>
					<a href="#" className="hover:text-slate-900 transition">
						Medium
					</a>
				</div>
			</div>
		</footer>
	);
}
