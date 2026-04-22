export default function ContactSection() {
	return (
		<section className="pb-24">
			<div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start">
				<div className="rounded-[2rem] bg-white p-10 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)]">
					<p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-4">
						Let&abs;s sow the seeds of a new project.
					</p>
					<h2 className="text-4xl font-semibold text-slate-900 mb-6">
						Whether you have a data challenge or just want to talk about
						sustainable agriculture, I&abs;m always open to meaningful connections.
					</h2>
					<div className="space-y-4 text-slate-700">
						<div className="flex items-center gap-3">
							<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
								✉️
							</span>
							<span>ashrafadel2017@gamil.com</span>
						</div>
					</div>
				</div>

				<div className="rounded-[2rem] bg-slate-50 p-10 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)]">
					<div className="grid gap-5">
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-2">
								Full Name
							</label>
							<input
								className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-200"
								placeholder="ashraf adel"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-2">
								Email Address
							</label>
							<input
								className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-200"
								placeholder="ashrafadel2017@gmail.com"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-slate-700 mb-2">
								Message
							</label>
							<textarea
								className="w-full min-h-[140px] rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 focus:ring-emerald-200"
								placeholder="How can I help you?"
							/>
						</div>
						<button className="mt-3 inline-flex w-full items-center justify-center rounded-3xl bg-emerald-800 px-6 py-4 text-white text-base font-semibold shadow-lg shadow-emerald-200/30 hover:bg-emerald-900 transition">
							Send Message
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
