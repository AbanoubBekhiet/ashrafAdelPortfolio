"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Toast({ message, type = "success", onClose }) {
	const toastRef = useRef(null);

	useEffect(() => {
		const el = toastRef.current;
		if (!el) return;

		// Animate in
		gsap.fromTo(
			el,
			{ x: 100, opacity: 0, scale: 0.9 },
			{ x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" },
		);

		// Auto dismiss after 4 seconds
		const timer = setTimeout(() => {
			gsap.to(el, {
				x: 100,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
				onComplete: onClose,
			});
		}, 4000);

		return () => clearTimeout(timer);
	}, [onClose]);

	const bgColor =
		type === "success"
			? "bg-emerald-900"
			: type === "error"
				? "bg-red-600"
				: "bg-slate-800";

	const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

	return (
		<div
			ref={toastRef}
			className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 ${bgColor} text-white px-5 py-4 rounded-2xl shadow-2xl max-w-sm`}
			style={{ minWidth: "280px" }}
		>
			<span className="text-xl flex-shrink-0">{icon}</span>
			<p className="text-sm font-medium leading-snug">{message}</p>
			<button
				onClick={onClose}
				className="ml-auto flex-shrink-0 text-white/70 hover:text-white transition cursor-pointer"
			>
				<svg
					className="w-4 h-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	);
}
