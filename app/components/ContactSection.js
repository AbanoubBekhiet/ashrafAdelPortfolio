"use client";

import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Toast from "./Toast";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
	const sectionRef = useRef(null);
	const contentRef = useRef(null);
	const formRef = useRef(null);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState("idle");
	const [toast, setToast] = useState({ show: false, message: "", type: "" });

	useEffect(() => {
		const section = sectionRef.current;
		const content = contentRef.current;
		const form = formRef.current;
		if (!section || !content || !form) return;

		gsap.fromTo(
			content,
			{ x: -50, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 80%",
					end: "top 45%",
					scrub: 1,
				},
			},
		);

		gsap.fromTo(
			form,
			{ x: 50, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 75%",
					end: "top 40%",
					scrub: 1,
				},
			},
		);
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const showToast = (message, type) => {
		setToast({ show: true, message, type });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name || !formData.email || !formData.message) {
			showToast("Please fill in all fields.", "error");
			return;
		}

		const emailWrapperRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailWrapperRegex.test(formData.email)) {
			showToast("Please enter a valid email address.", "error");
			return;
		}

		setStatus("sending");

		const templateParams = {
			from_name: formData.name,
			from_email: formData.email,
			message: formData.message,
			to_name: "Ashraf",
		};

		try {
			const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
			const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

			if (!serviceId || !templateId || !publicKey) {
				console.error("EmailJS environment variables are missing.");
				showToast("Contact form configuration error.", "error");
				setStatus("idle");
				return;
			}

			await emailjs.send(serviceId, templateId, templateParams, publicKey);
			showToast("Message sent successfully!", "success");
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			console.error("Failed to send email:", error);
			showToast("Failed to send message. Please try again later.", "error");
		} finally {
			setStatus("idle");
		}
	};

	return (
		<section id="contact-section" ref={sectionRef} className="py-16 sm:py-24">
			{toast.show && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast({ show: false, message: "", type: "" })}
				/>
			)}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start overflow-x-hidden">
				<div ref={contentRef} className="rounded-[2rem] bg-white p-8 sm:p-10 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.2)]">
					<p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-500 mb-3 sm:mb-4">
						Let&apos;s sow the seeds of a new project.
					</p>
					<h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 sm:mb-6 leading-tight">
						Whether you have a data challenge or just want to talk about
						sustainable agriculture, I&apos;m always open to meaningful connections.
					</h2>
					<div className="space-y-4 text-slate-700 text-sm sm:text-base">
						<div className="flex items-center gap-3">
							<span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
								✉️
							</span>
							<span style={{ overflowWrap: "anywhere" }}>ashrafadel2017@gmail.com</span>
						</div>
					</div>
				</div>

				<div ref={formRef} className="rounded-[2rem] bg-white border border-slate-200 p-8 sm:p-10 shadow-[0_25px_80px_-50px_rgba(15,23,42,0.1)] relative">
					<form onSubmit={handleSubmit} className="grid gap-5">
						<div>
							<label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								value={formData.name}
								onChange={handleChange}
								className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:py-4 text-sm sm:text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
								placeholder="ashraf adel"
								disabled={status === "sending"}
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
								Email Address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:py-4 text-sm sm:text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400"
								placeholder="ashraf@example.com"
								disabled={status === "sending"}
							/>
						</div>
						<div>
							<label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows="4"
								className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:py-4 text-sm sm:text-base text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-400 resize-none"
								placeholder="How can I help you?"
								disabled={status === "sending"}
							/>
						</div>
						<button
							type="submit"
							disabled={status === "sending"}
							className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-950 px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-900 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
						>
							{status === "sending" ? (
								<span className="flex items-center gap-2">
									<svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
									</svg>
									Sending...
								</span>
							) : (
								"Send Message"
							)}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
