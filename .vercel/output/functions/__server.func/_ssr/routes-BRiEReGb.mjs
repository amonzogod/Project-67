import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Heart, i as Moon, n as Star, r as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BRiEReGb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHAPTERS = [
	{
		id: "intro",
		label: "Beginning",
		number: "01"
	},
	{
		id: "quiz",
		label: "Quiz",
		number: "02"
	},
	{
		id: "memories",
		label: "Memories",
		number: "03"
	},
	{
		id: "catch",
		label: "Catch",
		number: "04"
	},
	{
		id: "egg",
		label: "Egg",
		number: "05"
	},
	{
		id: "letter",
		label: "Letter",
		number: "06"
	},
	{
		id: "finale",
		label: "The end",
		number: "07"
	}
];
var STORAGE_KEY = "little-world-manyata";
var QUESTIONS = [
	{
		q: "Before you, my days mostly felt…",
		options: [
			"Fine, I guess",
			"Busy",
			"Kind of empty",
			"Perfect already"
		],
		answer: 2,
		reaction: "Yeah. Then you showed up."
	},
	{
		q: "What did you actually give me?",
		options: [
			"Stress",
			"My smile back",
			"More chaos only",
			"Nothing major"
		],
		answer: 1,
		reaction: "That's the whole point of this."
	},
	{
		q: "When I call you Bauni, I mean…",
		options: [
			"I'm joking",
			"You're my person",
			"Random nickname",
			"I'm being annoying"
		],
		answer: 1,
		reaction: "Bauni. My person."
	},
	{
		q: "Tharki / bar dancer energy is…",
		options: [
			"Insulting",
			"Affection, just unhinged",
			"A phase",
			"Your whole personality only"
		],
		answer: 1,
		reaction: "Unhinged, but it's love."
	},
	{
		q: "This website exists because…",
		options: [
			"I had free time",
			"I wanted to flex",
			"I love you and a text felt too small",
			"Someone dared me"
		],
		answer: 2,
		reaction: "A text was never going to be enough."
	},
	{
		q: "Loving you feels like…",
		options: [
			"A decision I keep making",
			"A habit",
			"The easiest true thing I know",
			"Complicated"
		],
		answer: 2,
		reaction: "Easy. True."
	},
	{
		q: "If you remember one thing from today…",
		options: [
			"The design",
			"The quiz score",
			"That you matter to me",
			"The pink buttons"
		],
		answer: 2,
		reaction: "You matter. That's it."
	}
];
var MEMORIES = [
	{
		icon: Moon,
		title: "Late talks",
		text: "We met in a high school RP game on Roblox and somehow just stayed. Started as friends, played a bunch of games, talked for hours. I enjoyed every second with you — even during exams, we were still talking."
	},
	{
		icon: Sparkles,
		title: "Only we get it",
		text: "Akshit catching Ls over and over. Aditya… nah. Those people disguising themselves as sheep to escape. And that MM2 day when the room got chaotic, people were watching, and the second you noticed — you just started running."
	},
	{
		icon: Heart,
		title: "Quiet comfort",
		text: "When I first met you I honestly thought you were a guy because of the avatar. Then — plot twist — you weren't. And somehow that turned into us becoming friends. Still one of my favorite accidents."
	},
	{
		icon: Star,
		title: "For you",
		text: "Thank you for everything. For the games, the talks, the chaos, the comfort. I love you so much. This little world is just my way of saying it properly."
	}
];
var LINES = [
	"late night talks",
	"your laugh",
	"exams and still talking",
	"bauni",
	"that MM2 chaos",
	"you weren't a boy",
	"my smile",
	"this little world"
];
var LETTER = [
	"I could've just texted you happy birthday. But that didn't feel like enough.",
	"There was a point where I wasn't really smiling much. Days felt kind of flat. I was just getting through them.",
	"Then you came into my life. And slowly, things started feeling lighter again. I started laughing more. Caring more. Actually looking forward to things.",
	"You gave me my smile back. And because of you, I'm enjoying my life again — for real.",
	"I love you. I mean that. Not in a dramatic way, just in the honest way. You're one of the best things that has happened to me.",
	"So I made this for you. A small world, just for your birthday, because you matter that much to me.",
	"Thank you for being here. Thank you for being you.",
	"Happy birthday, Manyata. I hope today feels as special as you are to me."
];
function isChapter(value) {
	return CHAPTERS.some((chapter) => chapter.id === value);
}
function Experience() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [chapter, setChapter] = (0, import_react.useState)("intro");
	const [started, setStarted] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [unlocked, setUnlocked] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const saved = JSON.parse(raw);
				if (saved.chapter && isChapter(saved.chapter)) {
					setChapter(saved.chapter);
					setStarted(saved.chapter !== "intro");
				}
				if (typeof saved.unlocked === "number") setUnlocked(saved.unlocked);
			}
		} catch {
			localStorage.removeItem(STORAGE_KEY);
		}
		const timer = window.setTimeout(() => setLoading(false), 700);
		return () => window.clearTimeout(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		if (loading) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			chapter,
			unlocked
		}));
	}, [
		chapter,
		unlocked,
		loading
	]);
	const index = CHAPTERS.findIndex((item) => item.id === chapter);
	const meta = CHAPTERS[index] ?? CHAPTERS[0];
	const go = (0, import_react.useCallback)((id) => {
		if (id === chapter || busy) return;
		const next = CHAPTERS.findIndex((item) => item.id === id);
		if (next < 0 || next > Math.max(unlocked, index + 1)) return;
		setBusy(true);
		window.setTimeout(() => {
			setChapter(id);
			setUnlocked((current) => Math.max(current, next));
			if (id !== "intro") setStarted(true);
			window.setTimeout(() => setBusy(false), 160);
		}, 260);
	}, [
		busy,
		chapter,
		index,
		unlocked
	]);
	const next = () => {
		const following = CHAPTERS[index + 1];
		if (following) go(following.id);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-bg text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stage-in text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "heart-pulse mx-auto size-8 text-rose" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs tracking-[0.35em] text-faint uppercase",
				children: "Preparing your little world"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "atmosphere",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow glow-a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glow glow-b" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain" })
				]
			}),
			started && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.28em] text-rose uppercase",
					children: meta.number
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-lg",
					children: meta.label
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-36 sm:w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex justify-between text-xs text-faint",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(index / (CHAPTERS.length - 1) * 100), "%"] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1 overflow-hidden rounded-full bg-line",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-rose transition-all duration-500",
							style: { width: `${index / (CHAPTERS.length - 1) * 100}%` }
						})
					})]
				})]
			}),
			started && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed right-3 bottom-20 z-20 flex gap-2 sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2 sm:flex-col",
				children: CHAPTERS.map((item, itemIndex) => {
					const open = itemIndex <= Math.max(unlocked, index);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": item.label,
						disabled: !open,
						onClick: () => go(item.id),
						className: `grid size-11 place-items-center ${open ? "" : "opacity-40"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-full border ${item.id === chapter ? "scale-125 border-rose bg-rose" : itemIndex < index ? "border-blush bg-blush" : "border-line bg-transparent"}` })
					}, item.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: `relative z-10 mx-auto flex min-h-dvh w-full max-w-3xl items-center px-5 py-24 ${busy ? "stage-out" : "stage-in"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full",
					children: [
						chapter === "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, { onStart: () => {
							setStarted(true);
							go("quiz");
						} }),
						chapter === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, { onDone: next }),
						chapter === "memories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Memories, { onDone: next }),
						chapter === "catch" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catch, { onDone: next }),
						chapter === "egg" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Egg, { onDone: next }),
						chapter === "letter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letter, { onDone: next }),
						chapter === "finale" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Finale, { onRestart: () => {
							setStarted(false);
							setUnlocked(0);
							setChapter("intro");
							localStorage.removeItem(STORAGE_KEY);
						} })
					]
				})
			})
		]
	});
}
function Intro({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.38em] text-rose uppercase",
				children: "A little world for you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-6 font-serif text-6xl leading-none sm:text-7xl",
				children: ["Happy birthday", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block text-blush",
					children: "Manyata."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-8 max-w-md text-lg leading-relaxed text-muted",
				children: "I could have just said happy birthday. But where's the fun in that?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-10",
				onClick: onStart,
				children: "Enter the world"
			})
		]
	});
}
function Quiz({ onDone }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const question = QUESTIONS[index];
	if (!question) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs tracking-[0.28em] text-rose uppercase",
			children: [
				"Quiz · ",
				index + 1,
				" / ",
				QUESTIONS.length
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-4 font-serif text-4xl leading-tight",
			children: question.q
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3",
			children: question.options.map((option, optionIndex) => {
				const picked = selected === optionIndex;
				const right = selected !== null && optionIndex === question.answer;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (selected !== null) return;
						setSelected(optionIndex);
						if (optionIndex === question.answer) setScore((value) => value + 1);
					},
					className: `flex min-h-12 items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${right ? "border-rose bg-rose/15" : picked ? "border-line opacity-60" : "border-line bg-panel hover:border-blush"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-bg text-sm text-blush",
						children: String.fromCharCode(65 + optionIndex)
					}), option]
				}, option);
			})
		}),
		selected !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-xl text-blush",
				children: question.reaction
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-6",
				onClick: () => {
					if (index === QUESTIONS.length - 1) {
						onDone();
						return;
					}
					setIndex((value) => value + 1);
					setSelected(null);
				},
				children: index === QUESTIONS.length - 1 ? "Continue" : "Next"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-sm text-faint",
			children: [
				"Score ",
				score,
				" / ",
				QUESTIONS.length
			]
		})
	] });
}
function Memories({ onDone }) {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.28em] text-rose uppercase",
			children: "Memory lane"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 font-serif text-5xl",
			children: "Some moments stay."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3",
			children: MEMORIES.map((memory, memoryIndex) => {
				const Icon = memory.icon;
				const active = open === memoryIndex;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setOpen(memoryIndex),
					className: `rounded-3xl border p-5 text-left transition ${active ? "border-rose bg-panel" : "border-line bg-bg/40"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-rose" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl",
							children: memory.title
						})]
					}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed text-muted",
						children: memory.text
					})]
				}, memory.title);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "rose-btn mt-8",
			onClick: onDone,
			children: "Continue"
		})
	] });
}
function Catch({ onDone }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [time, setTime] = (0, import_react.useState)(16);
	const [score, setScore] = (0, import_react.useState)(0);
	const [drops, setDrops] = (0, import_react.useState)([]);
	const [line, setLine] = (0, import_react.useState)("");
	const idRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (phase !== "play") return;
		if (time <= 0) {
			setPhase("done");
			setDrops([]);
			return;
		}
		const timer = window.setTimeout(() => setTime((value) => value - 1), 1e3);
		return () => window.clearTimeout(timer);
	}, [phase, time]);
	(0, import_react.useEffect)(() => {
		if (phase !== "play") return;
		const spawn = () => {
			const id = ++idRef.current;
			const drop = {
				id,
				left: 8 + Math.random() * 78,
				duration: 2.1 + Math.random() * 1.3,
				line: LINES[Math.floor(Math.random() * LINES.length)] ?? "us"
			};
			setDrops((current) => [...current, drop]);
			window.setTimeout(() => {
				setDrops((current) => current.filter((item) => item.id !== id));
			}, drop.duration * 1e3);
		};
		spawn();
		const interval = window.setInterval(spawn, 680);
		return () => window.clearInterval(interval);
	}, [phase]);
	if (phase === "ready") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.28em] text-rose uppercase",
				children: "Mini game"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-serif text-5xl",
				children: "Catch the moments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-md leading-relaxed text-muted",
				children: "Hearts fall for 16 seconds. Tap them before they disappear. Each one is a little piece of us."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-8",
				onClick: () => {
					setScore(0);
					setTime(16);
					setDrops([]);
					setLine("");
					setPhase("play");
				},
				children: "Start"
			})
		]
	});
	if (phase === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.28em] text-rose uppercase",
				children: "Caught"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-serif text-7xl text-rose",
				children: score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: score >= 10 ? "You caught almost every moment." : "Every one still counts."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-8",
				onClick: onDone,
				children: "Continue"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.28em] text-faint uppercase",
				children: "Time"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-serif text-4xl text-rose",
				children: [time, "s"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.28em] text-faint uppercase",
					children: "Caught"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-4xl",
					children: score
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 min-h-6 font-serif text-blush italic",
			children: line ? `“${line}”` : "Tap the hearts"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mt-4 h-80 overflow-hidden rounded-3xl border border-line bg-panel/50",
			children: drops.map((drop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "catch-item absolute top-0 grid size-12 place-items-center",
				style: {
					left: `${drop.left}%`,
					animationDuration: `${drop.duration}s`
				},
				onClick: () => {
					setDrops((current) => current.filter((item) => item.id !== drop.id));
					setScore((value) => value + 1);
					setLine(drop.line);
				},
				"aria-label": "Catch",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-7 fill-rose text-rose" })
			}, drop.id))
		})
	] });
}
function Egg({ onDone }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [power, setPower] = (0, import_react.useState)(0);
	const [hits, setHits] = (0, import_react.useState)(0);
	const [charging, setCharging] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("Hold, then release in the pink zone.");
	const powerRef = (0, import_react.useRef)(0);
	const dirRef = (0, import_react.useRef)(1);
	const frame = (0, import_react.useRef)(0);
	const needed = 4;
	(0, import_react.useEffect)(() => () => cancelAnimationFrame(frame.current), []);
	const tick = () => {
		powerRef.current += dirRef.current * 1.7;
		if (powerRef.current >= 100) {
			powerRef.current = 100;
			dirRef.current = -1;
		} else if (powerRef.current <= 0) {
			powerRef.current = 0;
			dirRef.current = 1;
		}
		setPower(powerRef.current);
		frame.current = requestAnimationFrame(tick);
	};
	const startCharge = () => {
		if (phase !== "play" || charging) return;
		setCharging(true);
		powerRef.current = 0;
		dirRef.current = 1;
		setPower(0);
		frame.current = requestAnimationFrame(tick);
	};
	const release = () => {
		if (!charging) return;
		cancelAnimationFrame(frame.current);
		setCharging(false);
		const value = powerRef.current;
		setPower(0);
		if (value < 55 || value > 92) {
			setNote("Too weak, or too late. Charge into the zone.");
			return;
		}
		const nextHits = hits + 1;
		setHits(nextHits);
		setShake(true);
		window.setTimeout(() => setShake(false), 350);
		if (nextHits >= needed) {
			setNote("It opened.");
			window.setTimeout(() => setPhase("done"), 500);
			return;
		}
		setNote(nextHits === 1 ? "First crack." : nextHits === 2 ? "It's breaking." : "Almost.");
	};
	if (phase === "ready") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.28em] text-rose uppercase",
				children: "Mini game"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-serif text-5xl",
				children: "Smash the egg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-md leading-relaxed text-muted",
				children: "Hold to charge. Release while the bar sits in the pink zone. Four real hits, not random taps."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-8",
				onClick: () => {
					setHits(0);
					setNote("Hold, then release in the pink zone.");
					setPhase("play");
				},
				children: "Start"
			})
		]
	});
	if (phase === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "heart-pulse mx-auto size-12 fill-rose text-rose" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 font-serif text-5xl",
				children: "Opened"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted",
				children: "The last part is the letter. Read it slowly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-8",
				onClick: onDone,
				children: "Open the letter"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl text-blush",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-center gap-2",
				children: Array.from({ length: needed }, (_, dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-full ${dot < hits ? "bg-rose" : "bg-line"}` }, dot))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `mx-auto mt-8 grid size-52 place-items-center rounded-full border border-line bg-panel ${shake ? "egg-shake" : ""}`,
				onPointerDown: startCharge,
				onPointerUp: release,
				onPointerLeave: () => charging && release(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-7xl text-blush",
					children: hits >= 3 ? "✦" : "○"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto mt-8 h-3 w-64 overflow-hidden rounded-full border border-line bg-bg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-[8%] bottom-0 left-[55%] bg-rose/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-rose",
					style: { width: `${power}%` }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-faint",
				children: charging ? "Release" : "Hold the circle"
			})
		]
	});
}
function Letter({ onDone }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.28em] text-rose uppercase",
			children: "A letter"
		}), !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-4 font-serif text-5xl",
			children: "There's something inside."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "rose-btn mt-8",
			onClick: () => setOpen(true),
			children: "Open the letter"
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-xl rounded-3xl border border-line bg-panel p-6 text-left sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-4xl",
					children: "Manyata,"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-4 leading-relaxed text-muted",
					children: LETTER.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-serif text-xl text-blush",
					children: "— From me"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rose-btn mt-8",
					onClick: onDone,
					children: "One last thing"
				})
			]
		})]
	});
}
function Finale({ onRestart }) {
	const words = (0, import_react.useMemo)(() => [
		"smile",
		"bauni",
		"roblox",
		"exams",
		"us"
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.28em] text-rose uppercase",
				children: "Final chapter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-4 font-serif text-6xl leading-none text-blush sm:text-7xl",
				children: ["Happy birthday", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block text-ink",
					children: "Manyata"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted",
				children: "And yes. I really made all of this for you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "heart-pulse mx-auto mt-8 size-12 fill-rose text-rose" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 flex flex-wrap justify-center gap-2",
				children: words.map((word) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-full border border-line px-3 py-1 text-sm text-blush",
					children: word
				}, word))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-xs tracking-[0.3em] text-faint uppercase",
				children: "October 20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "rose-btn mt-8",
				onClick: onRestart,
				children: "Start over"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {});
}
//#endregion
export { Home as component };
