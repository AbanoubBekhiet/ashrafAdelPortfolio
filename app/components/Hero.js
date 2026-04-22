export default function Hero() {
	return (
		<section className="relative overflow-hidden bg-[#f7f3eb]">
			<div className="absolute inset-x-0 top-0 h-72 bg-emerald-50 z-0 pointer-events-none" />
			<div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
				<div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
					<div className="space-y-8">
						<p className="text-xs uppercase tracking-[0.45em] text-slate-500 font-semibold">
							Data Scientist & Agronomist
						</p>
						<h1 className="text-5xl font-semibold tracking-tight text-slate-900 leading-tight md:text-6xl">
							Cultivating clarity from complex data.
						</h1>
						<p className="max-w-2xl text-lg leading-8 text-slate-600">
							Bridging the gap between agricultural intuition and data-driven
							precision through advanced analytics and sustainable insights.
						</p>
						<div className="flex flex-wrap gap-4">
							<button className="rounded-full bg-emerald-900 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200/30 hover:bg-emerald-800 transition">
								Explore Projects
							</button>
							<button className="rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition">
								Download CV
							</button>
						</div>
					</div>

					<div className="relative">
						<div className="aspect-[4/3] w-full rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_55%)] p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)]">
							<div className="h-full rounded-[2.5rem] border border-slate-200 bg-white/80 shadow-inner" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
