export default function Stats() {
	return (
		<section className="border-y border-gray-200 py-20">
			<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-center">
				<div>
					<p
						className="text-5xl font-light text-gray-900"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						120+
					</p>
					<p className="text-xs uppercase tracking-wider text-gray-500 mt-3">
						Datasets Analyzed
					</p>
				</div>
				<div>
					<p
						className="text-5xl font-light text-gray-900"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						1.4k
					</p>
					<p className="text-xs uppercase tracking-wider text-gray-500 mt-3">
						Reports Created
					</p>
				</div>
				<div>
					<p
						className="text-5xl font-light text-gray-900"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						98%
					</p>
					<p className="text-xs uppercase tracking-wider text-gray-500 mt-3">
						Accuracy Rating
					</p>
				</div>
				<div>
					<p
						className="text-5xl font-light text-gray-900"
						style={{ fontFamily: "var(--font-playfair)" }}
					>
						15
					</p>
					<p className="text-xs uppercase tracking-wider text-gray-500 mt-3">
						Global Partners
					</p>
				</div>
			</div>
		</section>
	);
}
