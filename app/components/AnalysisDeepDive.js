export default function AnalysisDeepDive({ project, projectImages }) {
	return (
		<section className="max-w-7xl mx-auto px-6 py-16">
			<h2
				className="text-4xl font-light text-gray-900 mb-12"
				style={{ fontFamily: "var(--font-playfair)" }}
			>
				Analysis Deep Dive
			</h2>

			<div className="space-y-20">
				{/* Visualization Items */}
				{projectImages && projectImages.length > 0 ? (
					projectImages.map((item, idx) => (
						<div
							key={item.id}
							className={`flex flex-col lg:flex-row items-center gap-12 ${
								idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
							}`}
						>
							{/* Image */}
							<div className="flex-1 flex-shrink-0 w-full lg:w-auto">
								<div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-lg">
									{item.image_url ? (
										<img
											src={item.image_url}
											alt={item.title || `Analysis ${idx + 1}`}
											className="w-full h-full object-cover"
											loading="lazy"
											onError={(e) => {
												console.error(
													`Failed to load image: ${item.image_url}`,
												);
												e.target.style.display = "none";
												e.target.parentElement.innerHTML =
													'<div class="w-full h-full flex items-center justify-center bg-gray-100"><span class="text-gray-400">Failed to load image</span></div>';
											}}
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-gray-100">
											<span className="text-gray-400">Image not available</span>
										</div>
									)}
								</div>
							</div>

							{/* Explanation Text */}
							<div className="flex-1">
								<div className="p-8 rounded-lg bg-white border-l-4 border-teal-600">
									<h3
										className="text-xl font-light text-gray-900 mb-4"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										Analysis {idx + 1}
									</h3>
									<p className="text-gray-700 leading-relaxed text-base mb-6">
										{item.explanation ||
											"Detailed analysis and insights from this project visualization."}
									</p>
								</div>
							</div>
						</div>
					))
				) : (
					<>
						{/* Default Visualization 1 - Density Heatmapping */}
						<div className="flex flex-col lg:flex-row items-center gap-12">
							<div className="flex-1 flex-shrink-0 w-full lg:w-auto">
								<div className="relative h-80 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 rounded-lg overflow-hidden shadow-lg">
									<div className="w-full h-full opacity-90" />
								</div>
							</div>
							<div className="flex-1">
								<div className="p-8 rounded-lg bg-white border-l-4 border-teal-600">
									<h3
										className="text-xl font-light text-gray-900 mb-4"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										Density Heatmapping
									</h3>
									<p className="text-gray-700 leading-relaxed text-base mb-6">
										Satellite-derived thermal analysis revealing vegetation
										density distribution across the reforestation site,
										demonstrating spatial heterogeneity of forest growth
										patterns.
									</p>
									<p className="text-sm text-gray-600">
										<strong>SPATIAL RES:</strong> 10 meters
									</p>
								</div>
							</div>
						</div>

						{/* Default Visualization 2 - Biomass Accumulation */}
						<div className="flex flex-col lg:flex-row-reverse items-center gap-12">
							<div className="flex-1 flex-shrink-0 w-full lg:w-auto">
								<div className="relative h-80 bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center p-6">
									<div className="w-full h-full flex gap-0.5 items-end justify-center bg-gradient-to-t from-blue-950 to-blue-900">
										{[...Array(30)].map((_, i) => (
											<div
												key={i}
												className="flex-1 bg-gradient-to-t from-blue-400 to-blue-300"
												style={{
													height: `${30 + Math.sin(i * 0.3) * 40 + Math.random() * 20}%`,
												}}
											/>
										))}
									</div>
								</div>
							</div>
							<div className="flex-1">
								<div className="p-8 rounded-lg bg-white border-l-4 border-teal-600">
									<h3
										className="text-xl font-light text-gray-900 mb-4"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										Biomass Accumulation Trends
									</h3>
									<p className="text-gray-700 leading-relaxed text-base mb-6">
										Time-series analysis tracking carbon sequestration rates and
										aboveground biomass accumulation. Our data suggests rapid
										forest maturation with strong growth trajectories.
									</p>
									<div className="flex gap-6">
										<div>
											<p className="text-lg font-bold text-teal-600">94%</p>
											<p className="text-xs text-gray-500">Growth Rate</p>
										</div>
										<div>
											<p className="text-lg font-bold text-teal-600">8.2t</p>
											<p className="text-xs text-gray-500">CO₂/hectare</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Default Visualization 3 - Soil Analysis */}
						<div className="flex flex-col lg:flex-row items-center gap-12">
							<div className="flex-1 flex-shrink-0 w-full lg:w-auto">
								<div className="relative h-80 bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
									<div className="flex gap-0.5 items-end h-48 w-full justify-center px-6">
										{[...Array(25)].map((_, i) => (
											<div
												key={i}
												className="flex-1 bg-red-600"
												style={{
													height: `${35 + Math.sin(i * 0.4) * 35}%`,
												}}
											/>
										))}
									</div>
								</div>
							</div>
							<div className="flex-1">
								<div className="p-8 rounded-lg bg-white border-l-4 border-teal-600">
									<h3
										className="text-xl font-light text-gray-900 mb-4"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										Soil Soil Analysis
									</h3>
									<p className="text-gray-700 leading-relaxed text-base mb-6">
										Comprehensive in-situ soil sampling revealing improved
										nutrient profiles, pH stabilization, and enhanced microbial
										activity in restored soils compared to baseline.
									</p>
									<p className="text-sm text-gray-600">
										<strong>SALINITY:</strong> 0.8 ppt
									</p>
								</div>
							</div>
						</div>

						{/* Default Visualization 4 - Hydrological Restoration */}
						<div className="flex flex-col lg:flex-row-reverse items-center gap-12">
							<div className="flex-1 flex-shrink-0 w-full lg:w-auto">
								<div className="relative h-80 bg-gradient-to-br from-amber-700 to-yellow-600 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
									<div className="w-40 h-40 rounded-full border-8 border-amber-900 opacity-30" />
									<div className="w-24 h-24 rounded-full border-4 border-amber-800 absolute opacity-50" />
								</div>
							</div>
							<div className="flex-1">
								<div className="p-8 rounded-lg bg-white border-l-4 border-teal-600">
									<h3
										className="text-xl font-light text-gray-900 mb-4"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										Hydrological Restoration
									</h3>
									<p className="text-gray-700 leading-relaxed text-base mb-6">
										Water cycle analysis demonstrating enhanced hydrological
										function with increased soil moisture retention capacity and
										reduced surface runoff rates.
									</p>
									<p className="text-sm text-gray-600">
										<strong>Note:</strong> See our advanced hydrological
										modeling report for detailed parameters
									</p>
								</div>
							</div>
						</div>

						{/* Default Visualization 5 - Avian Species Migration */}
						<div className="flex flex-col lg:flex-row items-center gap-12">
							<div className="flex-1 flex-shrink-0 w-full lg:w-auto">
								<div className="relative h-80 bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
									<div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl opacity-80" />
								</div>
							</div>
							<div className="flex-1">
								<div className="p-8 rounded-lg bg-white border-l-4 border-teal-600">
									<h3
										className="text-xl font-light text-gray-900 mb-4"
										style={{ fontFamily: "var(--font-playfair)" }}
									>
										Avian Species Migration
									</h3>
									<p className="text-gray-700 leading-relaxed text-base mb-6">
										GPS telemetry analysis of migratory bird populations
										demonstrates significantly increased habitat selection and
										extended residency in reforested zones.
									</p>
									<p className="text-sm text-gray-600">
										<strong>Migration Confidence:</strong> +87%
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
