"use client";

import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="border-t border-slate-200 bg-[#f7f3eb] py-8 sm:py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-slate-600">
				<p className="text-xs sm:text-sm mb-3 sm:mb-4">
					Ashraf Adel Portfolio. 
				</p>
				<div className="flex items-center justify-center gap-6 sm:gap-8">
					<a
						href="https://www.linkedin.com/in/ashraf-adel-66184331a"
						target="_blank"
						aria-label="LinkedIn"
						className="text-slate-500 hover:text-emerald-900 transition hover:-translate-y-1 block"
					>
						<FaLinkedin size={24} />
					</a>
					<a
						href="https://github.com/ashrafadel2017"
						target="_blank"
						aria-label="GitHub"
						className="text-slate-500 hover:text-emerald-900 transition hover:-translate-y-1 block"
					>
						<FaGithub size={24} />
					</a>
					<a
						href="https://wa.me/qr/Z44TSA6V6PWWF1"
						target="_blank"
						aria-label="WhatsApp"
						className="text-slate-500 hover:text-emerald-900 transition hover:-translate-y-1 block"
					>
						<FaWhatsapp size={24} />
					</a>
				</div>
			</div>
		</footer>
	);
}
