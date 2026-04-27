"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function GSAPProvider({ children }) {
	useEffect(() => {
		// Refresh ScrollTrigger after DOM is fully loaded
		const timeout = setTimeout(() => {
			ScrollTrigger.refresh();
		}, 100);

		return () => {
			clearTimeout(timeout);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return <>{children}</>;
}
