"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Hero() {
	const sectionRef = useRef(null);
	const textRef = useRef(null);
	const imageRef = useRef(null);
	const buttonsRef = useRef(null);
	const [cvUrl, setCvUrl] = useState(null);
	const [downloading, setDownloading] = useState(false);

	// Fetch CV URL from Supabase
	useEffect(() => {
		async function fetchCV() {
			try {
				if (!supabase) return;
				const { data, error } = await supabase
					.from("user_cv")
					.select("cv_url, file_name")
					.limit(1)
					.single();

				if (error) throw error;
				if (data) {
					setCvUrl(data);
				}
			} catch (err) {
				console.error("Error fetching CV:", err);
			}
		}
		fetchCV();
	}, []);

	// GSAP Animations
	useEffect(() => {
		const section = sectionRef.current;
		const text = textRef.current;
		const image = imageRef.current;
		const buttons = buttonsRef.current;
		if (!section || !text || !image || !buttons) return;

		const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

		// Text reveal
		tl.fromTo(
			text.querySelectorAll(".hero-animate"),
			{ y: 60, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.9, stagger: 0.15 },
		);

		// Buttons
		tl.fromTo(
			buttons.children,
			{ y: 30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
			"-=0.4",
		);

		// Image card
		tl.fromTo(
			image,
			{ x: 80, opacity: 0, scale: 0.92 },
			{ x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
			"-=0.8",
		);

		// Floating animation for image
		gsap.to(image, {
			y: -18,
			duration: 2.5,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1,
		});

		return () => {
			tl.kill();
		};
	}, []);

	async function handleDownloadCV() {
		if (!cvUrl?.cv_url) return;
		setDownloading(true);
		try {
			const response = await fetch(cvUrl.cv_url);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = cvUrl.file_name || "CV.pdf";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (err) {
			console.error("Download failed:", err);
		} finally {
			setDownloading(false);
		}
	}

	function handleExploreProjects() {
		gsap.to(window, {
			duration: 1.2,
			scrollTo: { y: "#featured-projects", offsetY: 80 },
			ease: "power3.inOut",
		});
	}

	return (
		<section ref={sectionRef} className="relative overflow-hidden bg-[#f7f3eb]">
			<div className="absolute inset-x-0 top-0 h-48 sm:h-72 bg-emerald-50 z-0 pointer-events-none" />
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-28">
				<div className="grid gap-10 sm:gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center">
					<div ref={textRef} className="space-y-5 sm:space-y-8">
						<p className="hero-animate text-[10px] sm:text-xs uppercase tracking-[0.45em] text-slate-500 font-semibold">
							Data Scientist & Agronomist
						</p>
						<h1 className="hero-animate text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-tight">
							Cultivating clarity from complex data.
						</h1>
						<p className="hero-animate max-w-2xl text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-slate-600">
							Bridging the gap between agricultural intuition and data-driven
							precision through advanced analytics and sustainable insights.
						</p>
						<div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
							<button
								onClick={handleExploreProjects}
								className="rounded-full bg-emerald-900 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200/30 hover:bg-emerald-800 transition cursor-pointer text-center"
							>
								Explore Projects
							</button>
							<button
								onClick={handleDownloadCV}
								disabled={downloading || !cvUrl}
								className="rounded-full border border-slate-300 bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
							>
								{downloading ? (
									<span className="flex items-center justify-center gap-2">
										<svg
											className="animate-spin h-4 w-4"
											viewBox="0 0 24 24"
											fill="none"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											/>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
											/>
										</svg>
										Downloading…
									</span>
								) : (
									"Download CV"
								)}
							</button>
						</div>
					</div>

					<div ref={imageRef} className="relative">
						<div className="aspect-[4/3] w-full rounded-[2rem] sm:rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_55%)] p-4 sm:p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.35)]">
							<div className="h-full rounded-[1.5rem] sm:rounded-[2.5rem] border border-slate-200 bg-white/80 shadow-inner flex items-center justify-center">
								<div className="text-center p-4 sm:p-8">
									<div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📊</div>
									<p className="text-slate-500 text-xs sm:text-sm font-medium">
										Data Analytics Dashboard
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
