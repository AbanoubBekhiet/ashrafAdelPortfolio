export default function Toolkit() {
	const items = [
		{
			title: "Python",
			description:
				"Advanced automation, predictive modeling, and ETL pipelines using Pandas, NumPy, and Scikit-Learn.",
			accent: "bg-emerald-50 text-emerald-900",
		},
		{
			title: "SQL",
			description:
				"Efficient querying and architectural design for relational databases.",
			accent: "bg-amber-50 text-amber-900",
		},
		{
			title: "Tableau",
			description: "Dynamic storytelling through interactive dashboards.",
			accent: "bg-slate-50 text-slate-900",
		},
		{
			title: "Power BI",
			description:
				"Enterprise-level data modeling and business intelligence visualization for strategic decision making.",
			accent: "bg-slate-100 text-slate-900",
		},
		{
			title: "Data Storytelling",
			description:
				"Translating numbers into actionable narratives that stakeholders love.",
			accent: "bg-emerald-950 text-white",
			dark: true,
		},
	];

	return (
		<section className="max-w-7xl mx-auto px-6 pb-24">
			<div className="text-center mb-12">
				<p className="text-sm uppercase tracking-[0.4em] text-slate-500 mb-3">
					The Toolkit
				</p>
				<p className="text-lg text-slate-600 max-w-2xl mx-auto">
					Specialized in turning raw datasets into growth stories.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-5 md:grid-cols-2">
				{items.map((item) => (
					<div
						key={item.title}
						className={`rounded-3xl border border-slate-200 p-8 min-h-[220px] ${item.dark ? "bg-slate-900" : "bg-white"}`}
					>
						<div
							className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.accent}`}
						>
							{item.title}
						</div>
						<p
							className={`mt-6 text-sm leading-7 ${item.dark ? "text-slate-100" : "text-slate-700"}`}
						>
							{item.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
