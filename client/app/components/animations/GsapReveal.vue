<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, provide } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type RevealVariant = "curtain-left" | "fade" | "none";

type RevealItem = {
	el: HTMLElement;
	order: number;
};

const props = withDefaults(
	defineProps<{
		variant?: RevealVariant;
		once?: boolean;
		start?: string;
		end?: string;
		step?: number;
	}>(),
	{
		variant: "curtain-left",
		once: true,
		start: "top 85%",
		end: "bottom 15%",
		step: 0.12,
	},
);

const root = ref<HTMLElement | null>(null);
const items = ref<RevealItem[]>([]);

let ctx: gsap.Context | undefined;

function buildFromVars(variant: RevealVariant): gsap.TweenVars {
	if (variant === "fade") {
		return {
			opacity: 0,
			duration: 0.5,
			ease: "power2.out",
		};
	}

	if (variant === "curtain-left") {
		return {
			xPercent: -20,
			opacity: 0,
			clipPath: "inset(0 100% 0 0)",
			duration: 0.8,
			ease: "power3.out",
		};
	}

	return { duration: 0 };
}

function buildToVars(): gsap.TweenVars {
	return {
		xPercent: 0,
		opacity: 1,
		clipPath: "inset(0 0% 0 0)",
	};
}

function register(el: HTMLElement, order = 0) {
	items.value.push({ el, order });
}

provide("gsapRevealRegister", register);

onMounted(() => {
	if (!import.meta.client) return;

	gsap.registerPlugin(ScrollTrigger);

	ctx = gsap.context(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: root.value,
				start: props.start,
				end: props.end,
				once: props.once,
			},
		});

		if (props.variant === "none") return;

		const fromVars = buildFromVars(props.variant);
		const toVars = buildToVars();

		const sorted = items.value.slice().sort((a, b) => a.order - b.order);

		if (!sorted.length && root.value) {
			tl.fromTo(root.value, fromVars, toVars);
			return;
		}

		let lastOrder = sorted[0]?.order ?? 0;
		let t = 0;

		for (let i = 0; i < sorted.length; i++) {
			const item = sorted[i];
			if (!item) continue;

			const { el, order } = item;
			const gap = i === 0 ? 0 : Math.max(0, order - lastOrder);

			t += gap * props.step;

			tl.fromTo(el, fromVars, toVars, t);
			lastOrder = order;
		}
	}, root);
});

onBeforeUnmount(() => {
	ctx?.revert();
});
</script>

<template>
	<div ref="root">
		<slot />
	</div>
</template>
