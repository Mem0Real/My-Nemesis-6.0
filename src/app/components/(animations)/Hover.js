"use client";

import { useEffect, useRef, useState } from "react";

export default function Hover3d(ref, { x = 0, y = 0, z = 0 }) {
	const [coords, setCoords] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseMove = (e) => {
		const { offsetWidth: width, offsetHeight: height } = ref.current;
		const { clientX, clientY } = e;

		const x = (clientX - width / 2) / width;
		const y = (clientY - height / 2) / height;

		setCoords({ x, y });
	};

	const handleMouseEnter = () => {
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	useEffect(() => {
		const { current } = ref;

		current.addEventListener("mousemove", handleMouseMove);
		current.addEventListener("mouseenter", handleMouseEnter);
		current.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			current.removeEventListener("mousemove", handleMouseMove);
			current.removeEventListener("mouseenter", handleMouseEnter);
			current.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [ref]);

	const { x: XCoord, y: YCoord } = coords;

	const xTransform = isHovering ? XCoord * x : 0;
	const yTransform = isHovering ? YCoord * y : 0;
	const zTransform = isHovering ? z : 0;

	const transform = `perspective(1000px) rotateX(${yTransform}deg) rotateY(${xTransform}deg) translateZ(${zTransform}px)`;
	const transition = isHovering ? "all 0.3s ease-in-out" : "";

	return { transform, transition };
}
