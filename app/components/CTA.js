export default function CTA({ variant = "home" }) {
	if (variant === "home") {
		return (
			<section className="max-w-7xl mx-auto px-6 py-24">
				<div className="bg-teal-700 rounded-xl p-16 md:p-24 text-center text-white">
					<h2
						className="text-5xl font-light mb-5"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						Have a complex dataset?
					</h2>
					<p className="text-lg text-teal-50 mb-10 max-w-2xl mx-auto">
						Let&abs;s find the narrative hidden in your numbers. Now accepting
						projects for Q4 2024.
					</p>
					<button className="px-8 py-3 bg-white text-teal-700 font-semibold rounded hover:bg-gray-100 transition">
						Schedule a Consultation
					</button>
				</div>
			</section>
		);
	}

	if (variant === "project") {
		return (
			<section className="bg-gradient-to-r from-teal-100 to-green-100 py-20 my-12">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<h2
						className="text-4xl font-light text-gray-900 mb-6"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						Ready for the Full Technical Audit?
					</h2>
					<p className="text-gray-600 mb-8 max-w-2xl mx-auto">
						Access comprehensive technical documentation, interactive
						dashboards, and detailed methodology reports.
					</p>
					<div className="flex gap-4 justify-center">
						<button className="px-8 py-3 bg-teal-700 text-white rounded font-medium hover:bg-teal-800 transition">
							Download Full Report (2.4 MB)
						</button>
						<button className="px-8 py-3 border-2 border-teal-700 text-teal-700 rounded font-medium hover:bg-teal-50 transition">
							Contact Lead Scientist
						</button>
					</div>
				</div>
			</section>
		);
	}

	return null;
}
