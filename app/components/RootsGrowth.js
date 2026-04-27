"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

export default function RootsGrowth() {
	const sectionRef = useRef(null);
	const leftRef = useRef(null);
	const rightRef = useRef(null);
	const [experiences, setExperiences] = useState([]);
	const [currentExp, setCurrentExp] = useState(null);
	const [firstExp, setFirstExp] = useState(null);
	const [education, setEducation] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				if (!supabase) return;
				
				// Fetch Experiences
				const { data: expData, error: expError } = await supabase
					.from("experiences")
					.select("*")
					.order("is_current", { ascending: false })
					.order("created_at", { ascending: false });

				if (!expError && expData) {
					setExperiences(expData);
					const current = expData.find((exp) => exp.is_current);
					if (current) setCurrentExp(current);
					
					// Find the first (oldest) experience
					if (expData.length > 0) {
						const sortedByDate = [...expData].sort((a, b) => 
							new Date(a.created_at) - new Date(b.created_at)
						);
						setFirstExp(sortedByDate[0]);
					}
				}

				// Fetch Education
				const { data: eduData, error: eduError } = await supabase
					.from("education")
					.select("*")
					.limit(1)
					.single();

				if (!eduError && eduData) {
					setEducation(eduData);
				}
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		const left = leftRef.current;
		const right = rightRef.current;
		const section = sectionRef.current;
		if (!left || !right || !section) return;

		gsap.fromTo(
			left,
			{ x: -60, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 80%",
					end: "top 40%",
					scrub: 1,
				},
			},
		);

		gsap.fromTo(
			right,
			{ x: 60, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 75%",
					end: "top 35%",
					scrub: 1,
				},
			},
		);

		const cards = right.querySelectorAll(".roots-card");
		if (cards.length > 0) {
			gsap.fromTo(
				cards,
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 0.1,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						start: "top 70%",
						end: "top 30%",
						scrub: 1,
					},
				},
			);
		}
	}, []);

	return (
		<section ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
			<div className="rounded-[1.5rem] sm:rounded-[2rem] bg-white shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)] overflow-hidden">
				<div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
					<div ref={leftRef} className="p-6 sm:p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-200">
						<p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500 mb-3 sm:mb-4">
							Roots & Growth
						</p>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 mb-4 sm:mb-6">
							A journey from the fields to the server room, cultivating a unique
							perspective on biological and technical systems.
						</h2>
						<div className="flex flex-col gap-8 text-slate-600 leading-6 sm:leading-7 text-sm sm:text-base">
							{experiences.map((exp) => (
								<div key={exp.id}>
									<p className="text-slate-900 font-semibold">{exp.position}</p>
									<p className="text-emerald-800 font-medium text-sm">
										{exp.company} · {exp.duration}
										{exp.is_current ? " — Present" : ""}
									</p>
									<p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-3">
										{exp.description}
									</p>
								</div>
							))}
						</div>
					</div>

					<div ref={rightRef} className="bg-slate-50 p-6 sm:p-10 lg:p-16">
						<div className="space-y-4 sm:space-y-8">
							<div className="roots-card rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8 border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1">
								<p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-emerald-700 mb-2 sm:mb-3">
									{currentExp ? currentExp.position : "Data Analyst"}
								</p>
								<p className="text-slate-700 leading-6 sm:leading-7 text-sm sm:text-base uppercase">
									{currentExp
										? `${currentExp.company} — ${currentExp.duration} — Present`
										: "FREELANCER — Present"}
								</p>
							</div>
							<div className="roots-card rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8 border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1">
								<p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-emerald-700 mb-2 sm:mb-3">
									{education ? education.faculty_name : "Faculty of SCIENCE,ALEXANDRIA UNIVERSITY"}
								</p>
								<p className="text-slate-700 leading-6 sm:leading-7 text-sm sm:text-base">
									{education ? `${education.degree} · ${education.duration}` : "Bachelor of Science, Botanty Department. · 2014 — 2018"}
								</p>
							</div>
							<div className="roots-card rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8 border border-slate-200 shadow-sm transition-transform duration-300 hover:-translate-y-1">
								<p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-emerald-700 mb-2 sm:mb-3">
									{firstExp ? firstExp.position : "Alexandria, Egypt"}
								</p>
								<p className="text-slate-700 leading-6 sm:leading-7 text-sm sm:text-base">
									{firstExp 
										? `${firstExp.company} · ${firstExp.duration}`
										: "Building analytics systems rooted in environmental insight and sustainable decision-making."}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
