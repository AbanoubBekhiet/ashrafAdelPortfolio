"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FaHome, FaBriefcase } from "react-icons/fa";

gsap.registerPlugin(ScrollToPlugin);

export default function Header({ variant = "default" }) {
	const router = useRouter();
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	function handleContactClick() {
		if (pathname === "/") {
			gsap.to(window, {
				duration: 1.2,
				scrollTo: { y: "#contact-section", offsetY: 40 },
				ease: "power3.inOut",
			});
		} else {
			router.push("/#contact-section");
		}
	}

	return (
		<header
			className={`sticky top-0 z-50 transition-all duration-300 ${
				isScrolled
					? "bg-white/80 backdrop-blur-md shadow-sm py-4"
					: "bg-transparent py-4 sm:py-6"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
				<Link
					href="/"
					className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight"
				>
					Ashraf Adel Senada
				</Link>
				<nav className="flex items-center gap-6 md:gap-8 text-xl md:text-2xl font-medium text-slate-600">
					<Link
						href="/"
						className={`transition p-2 rounded-full hover:bg-slate-100 ${pathname === "/" ? "text-emerald-900 bg-emerald-50 shadow-sm" : "hover:text-slate-900"}`}
						title="Home"
					>
						<FaHome />
					</Link>
					<Link
						href="/projects"
						className={`transition p-2 rounded-full hover:bg-slate-100 ${pathname === "/projects" ? "text-emerald-900 bg-emerald-50 shadow-sm" : "hover:text-slate-900"}`}
						title="Projects"
					>
						<FaBriefcase />
					</Link>
				</nav>
				<div className="flex items-center gap-3">
					<button
						onClick={handleContactClick}
						className="rounded-full bg-emerald-900 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-800 transition cursor-pointer shadow-md shadow-emerald-200/20"
					>
						Contact Me
					</button>
				</div>
			</div>
		</header>
	);
}
