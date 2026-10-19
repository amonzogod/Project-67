import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Heart, Moon, Sparkles, Star } from "lucide-react";

type Chapter = "intro" | "quiz" | "memories" | "catch" | "egg" | "letter" | "finale";

const CHAPTERS: { id: Chapter; label: string; number: string }[] = [
  { id: "intro", label: "Beginning", number: "01" },
  { id: "quiz", label: "Quiz", number: "02" },
  { id: "memories", label: "Memories", number: "03" },
  { id: "catch", label: "Catch", number: "04" },
  { id: "egg", label: "Egg", number: "05" },
  { id: "letter", label: "Letter", number: "06" },
  { id: "finale", label: "The end", number: "07" },
];

const STORAGE_KEY = "little-world-manyata";

const QUESTIONS = [
  {
    q: "Before you, my days mostly felt…",
    options: ["Fine, I guess", "Busy", "Kind of empty", "Perfect already"],
    answer: 2,
    reaction: "Yeah. Then you showed up.",
  },
  {
    q: "What did you actually give me?",
    options: ["Stress", "My smile back", "More chaos only", "Nothing major"],
    answer: 1,
    reaction: "That's the whole point of this.",
  },
  {
    q: "When I call you Bauni, I mean…",
    options: ["I'm joking", "You're my person", "Random nickname", "I'm being annoying"],
    answer: 1,
    reaction: "Bauni. My person.",
  },
  {
    q: "Tharki / bar dancer energy is…",
    options: ["Insulting", "Affection, just unhinged", "A phase", "Your whole personality only"],
    answer: 1,
    reaction: "Unhinged, but it's love.",
  },
  {
    q: "This website exists because…",
    options: [
      "I had free time",
      "I wanted to flex",
      "I love you and a text felt too small",
      "Someone dared me",
    ],
    answer: 2,
    reaction: "A text was never going to be enough.",
  },
  {
    q: "Loving you feels like…",
    options: [
      "A decision I keep making",
      "A habit",
      "The easiest true thing I know",
      "Complicated",
    ],
    answer: 2,
    reaction: "Easy. True.",
  },
  {
    q: "If you remember one thing from today…",
    options: ["The design", "The quiz score", "That you matter to me", "The pink buttons"],
    answer: 2,
    reaction: "You matter. That's it.",
  },
] as const;

const MEMORIES = [
  {
    icon: Moon,
    title: "Late talks",
    text: "We met in a high school RP game on Roblox and somehow just stayed. Started as friends, played a bunch of games, talked for hours. I enjoyed every second with you — even during exams, we were still talking.",
  },
  {
    icon: Sparkles,
    title: "Only we get it",
    text: "Akshit catching Ls over and over. Aditya… nah. Those people disguising themselves as sheep to escape. And that MM2 day when the room got chaotic, people were watching, and the second you noticed — you just started running.",
  },
  {
    icon: Heart,
    title: "Quiet comfort",
    text: "When I first met you I honestly thought you were a guy because of the avatar. Then — plot twist — you weren't. And somehow that turned into us becoming friends. Still one of my favorite accidents.",
  },
  {
    icon: Star,
    title: "For you",
    text: "Thank you for everything. For the games, the talks, the chaos, the comfort. I love you so much. This little world is just my way of saying it properly.",
  },
] as const;

const LINES = [
  "late night talks",
  "your laugh",
  "exams and still talking",
  "bauni",
  "that MM2 chaos",
  "you weren't a boy",
  "my smile",
  "this little world",
];

const LETTER = [
  "I could've just texted you happy birthday. But that didn't feel like enough.",
  "There was a point where I wasn't really smiling much. Days felt kind of flat. I was just getting through them.",
  "Then you came into my life. And slowly, things started feeling lighter again. I started laughing more. Caring more. Actually looking forward to things.",
  "You gave me my smile back. And because of you, I'm enjoying my life again — for real.",
  "I love you. I mean that. Not in a dramatic way, just in the honest way. You're one of the best things that has happened to me.",
  "So I made this for you. A small world, just for your birthday, because you matter that much to me.",
  "Thank you for being here. Thank you for being you.",
  "Happy birthday, Manyata. I hope today feels as special as you are to me.",
];

function isChapter(value: string): value is Chapter {
  return CHAPTERS.some((chapter) => chapter.id === value);
}

export function Experience() {
  const [loading, setLoading] = useState(true);
  const [chapter, setChapter] = useState<Chapter>("intro");
  const [started, setStarted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [unlocked, setUnlocked] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { chapter?: string; unlocked?: number };
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

  useEffect(() => {
    if (loading) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ chapter, unlocked }));
  }, [chapter, unlocked, loading]);

  const index = CHAPTERS.findIndex((item) => item.id === chapter);
  const meta = CHAPTERS[index] ?? CHAPTERS[0];

  const go = useCallback(
    (id: Chapter) => {
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
    },
    [busy, chapter, index, unlocked],
  );

  const next = () => {
    const following = CHAPTERS[index + 1];
    if (following) go(following.id);
  };

  if (loading) {
    return (
      <main className="grid min-h-dvh place-items-center bg-bg text-ink">
        <div className="stage-in text-center">
          <Heart className="heart-pulse mx-auto size-8 text-rose" />
          <p className="mt-6 text-xs tracking-[0.35em] text-faint uppercase">
            Preparing your little world
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-dvh bg-bg text-ink">
      <div className="atmosphere" aria-hidden>
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="grain" />
      </div>

      {started && (
        <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <div>
            <p className="text-xs tracking-[0.28em] text-rose uppercase">{meta.number}</p>
            <p className="font-serif text-lg">{meta.label}</p>
          </div>
          <div className="w-36 sm:w-48">
            <div className="mb-2 flex justify-between text-xs text-faint">
              <span>Progress</span>
              <span>{Math.round((index / (CHAPTERS.length - 1)) * 100)}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-rose transition-all duration-500"
                style={{ width: `${(index / (CHAPTERS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </header>
      )}

      {started && (
        <nav className="fixed right-3 bottom-20 z-20 flex gap-2 sm:top-1/2 sm:right-6 sm:bottom-auto sm:-translate-y-1/2 sm:flex-col">
          {CHAPTERS.map((item, itemIndex) => {
            const open = itemIndex <= Math.max(unlocked, index);
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                disabled={!open}
                onClick={() => go(item.id)}
                className={`grid size-11 place-items-center ${open ? "" : "opacity-40"}`}
              >
                <span
                  className={`size-2.5 rounded-full border ${
                    item.id === chapter
                      ? "scale-125 border-rose bg-rose"
                      : itemIndex < index
                        ? "border-blush bg-blush"
                        : "border-line bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      )}

      <main
        className={`relative z-10 mx-auto flex min-h-dvh w-full max-w-3xl items-center px-5 py-24 ${
          busy ? "stage-out" : "stage-in"
        }`}
      >
        <div className="w-full">
          {chapter === "intro" && (
            <Intro
              onStart={() => {
                setStarted(true);
                go("quiz");
              }}
            />
          )}
          {chapter === "quiz" && <Quiz onDone={next} />}
          {chapter === "memories" && <Memories onDone={next} />}
          {chapter === "catch" && <Catch onDone={next} />}
          {chapter === "egg" && <Egg onDone={next} />}
          {chapter === "letter" && <Letter onDone={next} />}
          {chapter === "finale" && (
            <Finale
              onRestart={() => {
                setStarted(false);
                setUnlocked(0);
                setChapter("intro");
                localStorage.removeItem(STORAGE_KEY);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="text-center">
      <p className="text-xs tracking-[0.38em] text-rose uppercase">A little world for you</p>
      <h1 className="mt-6 font-serif text-6xl leading-none sm:text-7xl">
        Happy birthday
        <span className="mt-2 block text-blush">Manyata.</span>
      </h1>
      <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-muted">
        I could have just said happy birthday. But where's the fun in that?
      </p>
      <button type="button" className="rose-btn mt-10" onClick={onStart}>
        Enter the world
      </button>
    </section>
  );
}

function Quiz({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const question = QUESTIONS[index];
  if (!question) return null;

  return (
    <section>
      <p className="text-xs tracking-[0.28em] text-rose uppercase">
        Quiz · {index + 1} / {QUESTIONS.length}
      </p>
      <h2 className="mt-4 font-serif text-4xl leading-tight">{question.q}</h2>
      <div className="mt-8 grid gap-3">
        {question.options.map((option, optionIndex) => {
          const picked = selected === optionIndex;
          const right = selected !== null && optionIndex === question.answer;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (selected !== null) return;
                setSelected(optionIndex);
                if (optionIndex === question.answer) setScore((value) => value + 1);
              }}
              className={`flex min-h-12 items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                right
                  ? "border-rose bg-rose/15"
                  : picked
                    ? "border-line opacity-60"
                    : "border-line bg-panel hover:border-blush"
              }`}
            >
              <span className="grid size-8 place-items-center rounded-lg bg-bg text-sm text-blush">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-6">
          <p className="font-serif text-xl text-blush">{question.reaction}</p>
          <button
            type="button"
            className="rose-btn mt-6"
            onClick={() => {
              if (index === QUESTIONS.length - 1) {
                onDone();
                return;
              }
              setIndex((value) => value + 1);
              setSelected(null);
            }}
          >
            {index === QUESTIONS.length - 1 ? "Continue" : "Next"}
          </button>
        </div>
      )}
      <p className="mt-6 text-sm text-faint">
        Score {score} / {QUESTIONS.length}
      </p>
    </section>
  );
}

function Memories({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(0);
  return (
    <section>
      <p className="text-xs tracking-[0.28em] text-rose uppercase">Memory lane</p>
      <h2 className="mt-3 font-serif text-5xl">Some moments stay.</h2>
      <div className="mt-8 grid gap-3">
        {MEMORIES.map((memory, memoryIndex) => {
          const Icon = memory.icon;
          const active = open === memoryIndex;
          return (
            <button
              key={memory.title}
              type="button"
              onClick={() => setOpen(memoryIndex)}
              className={`rounded-3xl border p-5 text-left transition ${
                active ? "border-rose bg-panel" : "border-line bg-bg/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="size-5 text-rose" />
                <h3 className="font-serif text-2xl">{memory.title}</h3>
              </div>
              {active && <p className="mt-3 leading-relaxed text-muted">{memory.text}</p>}
            </button>
          );
        })}
      </div>
      <button type="button" className="rose-btn mt-8" onClick={onDone}>
        Continue
      </button>
    </section>
  );
}

type Drop = { id: number; left: number; duration: number; line: string };

function Catch({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [time, setTime] = useState(16);
  const [score, setScore] = useState(0);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [line, setLine] = useState("");
  const idRef = useRef(0);

  useEffect(() => {
    if (phase !== "play") return;
    if (time <= 0) {
      setPhase("done");
      setDrops([]);
      return;
    }
    const timer = window.setTimeout(() => setTime((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [phase, time]);

  useEffect(() => {
    if (phase !== "play") return;
    const spawn = () => {
      const id = ++idRef.current;
      const drop: Drop = {
        id,
        left: 8 + Math.random() * 78,
        duration: 2.1 + Math.random() * 1.3,
        line: LINES[Math.floor(Math.random() * LINES.length)] ?? "us",
      };
      setDrops((current) => [...current, drop]);
      window.setTimeout(() => {
        setDrops((current) => current.filter((item) => item.id !== id));
      }, drop.duration * 1000);
    };
    spawn();
    const interval = window.setInterval(spawn, 680);
    return () => window.clearInterval(interval);
  }, [phase]);

  if (phase === "ready") {
    return (
      <section className="text-center">
        <p className="text-xs tracking-[0.28em] text-rose uppercase">Mini game</p>
        <h2 className="mt-3 font-serif text-5xl">Catch the moments</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Hearts fall for 16 seconds. Tap them before they disappear. Each one is a little piece of us.
        </p>
        <button
          type="button"
          className="rose-btn mt-8"
          onClick={() => {
            setScore(0);
            setTime(16);
            setDrops([]);
            setLine("");
            setPhase("play");
          }}
        >
          Start
        </button>
      </section>
    );
  }

  if (phase === "done") {
    return (
      <section className="text-center">
        <p className="text-xs tracking-[0.28em] text-rose uppercase">Caught</p>
        <p className="mt-4 font-serif text-7xl text-rose">{score}</p>
        <p className="mt-4 text-muted">
          {score >= 10 ? "You caught almost every moment." : "Every one still counts."}
        </p>
        <button type="button" className="rose-btn mt-8" onClick={onDone}>
          Continue
        </button>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.28em] text-faint uppercase">Time</p>
          <p className="font-serif text-4xl text-rose">{time}s</p>
        </div>
        <div className="text-right">
          <p className="text-xs tracking-[0.28em] text-faint uppercase">Caught</p>
          <p className="font-serif text-4xl">{score}</p>
        </div>
      </div>
      <p className="mt-3 min-h-6 font-serif text-blush italic">{line ? `“${line}”` : "Tap the hearts"}</p>
      <div className="relative mt-4 h-80 overflow-hidden rounded-3xl border border-line bg-panel/50">
        {drops.map((drop) => (
          <button
            key={drop.id}
            type="button"
            className="catch-item absolute top-0 grid size-12 place-items-center"
            style={{ left: `${drop.left}%`, animationDuration: `${drop.duration}s` }}
            onClick={() => {
              setDrops((current) => current.filter((item) => item.id !== drop.id));
              setScore((value) => value + 1);
              setLine(drop.line);
            }}
            aria-label="Catch"
          >
            <Heart className="size-7 fill-rose text-rose" />
          </button>
        ))}
      </div>
    </section>
  );
}

function Egg({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [power, setPower] = useState(0);
  const [hits, setHits] = useState(0);
  const [charging, setCharging] = useState(false);
  const [shake, setShake] = useState(false);
  const [note, setNote] = useState("Hold, then release in the pink zone.");
  const powerRef = useRef(0);
  const dirRef = useRef(1);
  const frame = useRef(0);
  const needed = 4;

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

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

  if (phase === "ready") {
    return (
      <section className="text-center">
        <p className="text-xs tracking-[0.28em] text-rose uppercase">Mini game</p>
        <h2 className="mt-3 font-serif text-5xl">Smash the egg</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Hold to charge. Release while the bar sits in the pink zone. Four real hits, not random taps.
        </p>
        <button
          type="button"
          className="rose-btn mt-8"
          onClick={() => {
            setHits(0);
            setNote("Hold, then release in the pink zone.");
            setPhase("play");
          }}
        >
          Start
        </button>
      </section>
    );
  }

  if (phase === "done") {
    return (
      <section className="text-center">
        <Heart className="heart-pulse mx-auto size-12 fill-rose text-rose" />
        <h2 className="mt-6 font-serif text-5xl">Opened</h2>
        <p className="mt-4 text-muted">The last part is the letter. Read it slowly.</p>
        <button type="button" className="rose-btn mt-8" onClick={onDone}>
          Open the letter
        </button>
      </section>
    );
  }

  return (
    <section className="text-center">
      <p className="font-serif text-2xl text-blush">{note}</p>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: needed }, (_, dot) => (
          <span
            key={dot}
            className={`size-2.5 rounded-full ${dot < hits ? "bg-rose" : "bg-line"}`}
          />
        ))}
      </div>
      <button
        type="button"
        className={`mx-auto mt-8 grid size-52 place-items-center rounded-full border border-line bg-panel ${
          shake ? "egg-shake" : ""
        }`}
        onPointerDown={startCharge}
        onPointerUp={release}
        onPointerLeave={() => charging && release()}
      >
        <span className="font-serif text-7xl text-blush">{hits >= 3 ? "✦" : "○"}</span>
      </button>
      <div className="relative mx-auto mt-8 h-3 w-64 overflow-hidden rounded-full border border-line bg-bg">
        <div className="absolute top-0 right-[8%] bottom-0 left-[55%] bg-rose/30" />
        <div className="h-full bg-rose" style={{ width: `${power}%` }} />
      </div>
      <p className="mt-3 text-sm text-faint">{charging ? "Release" : "Hold the circle"}</p>
    </section>
  );
}

function Letter({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="text-center">
      <p className="text-xs tracking-[0.28em] text-rose uppercase">A letter</p>
      {!open ? (
        <>
          <h2 className="mt-4 font-serif text-5xl">There's something inside.</h2>
          <button type="button" className="rose-btn mt-8" onClick={() => setOpen(true)}>
            Open the letter
          </button>
        </>
      ) : (
        <article className="mx-auto max-w-xl rounded-3xl border border-line bg-panel p-6 text-left sm:p-8">
          <h2 className="font-serif text-4xl">Manyata,</h2>
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            {LETTER.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 font-serif text-xl text-blush">— From me</p>
          <button type="button" className="rose-btn mt-8" onClick={onDone}>
            One last thing
          </button>
        </article>
      )}
    </section>
  );
}

function Finale({ onRestart }: { onRestart: () => void }) {
  const words = useMemo(() => ["smile", "bauni", "roblox", "exams", "us"], []);
  return (
    <section className="text-center">
      <p className="text-xs tracking-[0.28em] text-rose uppercase">Final chapter</p>
      <h2 className="mt-4 font-serif text-6xl leading-none text-blush sm:text-7xl">
        Happy birthday
        <span className="mt-2 block text-ink">Manyata</span>
      </h2>
      <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted">
        And yes. I really made all of this for you.
      </p>
      <Heart className="heart-pulse mx-auto mt-8 size-12 fill-rose text-rose" />
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {words.map((word) => (
          <li key={word} className="rounded-full border border-line px-3 py-1 text-sm text-blush">
            {word}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-xs tracking-[0.3em] text-faint uppercase">October 20</p>
      <button type="button" className="rose-btn mt-8" onClick={onRestart}>
        Start over
      </button>
    </section>
  );
}
