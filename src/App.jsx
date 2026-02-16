import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sparkles, PerspectiveCamera } from '@react-three/drei'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronRight, ChevronLeft, Bell, Volume2, VolumeX, ArrowDownCircle } from 'lucide-react'
// --- Custom Components ---

function CursorFollower() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const cursorX = useSpring(0, { stiffness: 500, damping: 30 })
    const cursorY = useSpring(0, { stiffness: 500, damping: 30 })

    useEffect(() => {
        const move = (e) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full bg-shiva-gold mix-blend-difference pointer-events-none z-[9999] opacity-50 blur-sm"
            style={{ x: cursorX, y: cursorY }}
        />
    )
}

function CosmicShiva() {
    const meshRef = useRef()
    const { scrollYProgress } = useScroll()
    const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2])
    const color = useTransform(scrollYProgress, [0, 0.5, 1], ["#2a2a4e", "#4e2a2a", "#FFD700"])

    useFrame((state) => {
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
            <motion.mesh ref={meshRef} rotation-y={rotationY}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <MeshDistortMaterial
                    color="#FFD700"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    metalness={1}
                    roughness={0}
                />
            </motion.mesh>
        </Float>
    )
}

// Stotram Lyrics Component with Synchronized Highlighting
function StotramLyrics() {
    const [currentLine, setCurrentLine] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const lyrics = [
        { text: "सौराष्ट्रे सोमनाथं च श्रीशैले मल्लिकार्जुनम् ।", time: 0 },
        { text: "उज्जयिन्यां महाकालमोङ्कारममलेश्वरम् ॥", time: 8 },
        { text: "परल्यां वैद्यनाथं च डाकिन्यां भीमशङ्करम् ।", time: 16 },
        { text: "सेतुबन्धे तु रामेशं नागेशं दारुकावने ॥", time: 24 },
        { text: "वाराणस्यां तु विश्वेशं त्र्यम्बकं गौतमीतटे ।", time: 33 },
        { text: "हिमालये तु केदारं घुश्मेशं च शिवालये ॥", time: 41 }
    ];

    useEffect(() => {
        const audio = document.getElementById('stotram-audio');
        if (!audio) return;

        const updateLyrics = () => {
            const currentTime = audio.currentTime;
            const activeIndex = lyrics.findIndex((line, idx) => {
                const nextLine = lyrics[idx + 1];
                return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
            });
            if (activeIndex !== -1) {
                setCurrentLine(activeIndex);
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateLyrics);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        return () => {
            audio.removeEventListener('timeupdate', updateLyrics);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, []);

    return (
        <div className="font-hindi text-xl md:text-2xl lg:text-3xl leading-loose space-y-6">
            {lyrics.map((line, idx) => (
                <motion.p
                    key={idx}
                    animate={{
                        color: currentLine === idx ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                        scale: currentLine === idx ? 1.05 : 1,
                        textShadow: currentLine === idx
                            ? '0 0 20px rgba(255, 215, 0, 0.5)'
                            : '0 0 0px rgba(255, 215, 0, 0)'
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => {
                        const audio = document.getElementById('stotram-audio');
                        if (audio) {
                            audio.currentTime = line.time;
                            audio.play();
                        }
                    }}
                >
                    {line.text}
                </motion.p>
            ))}
        </div>
    );
}

// --- Data ---

const Jyotirlingas = [
    {
        id: "01",
        name: "Somnath",
        hindi: "सोमनाथ",
        loc: "Saurashtra, Gujarat",
        importance: "यह १२ ज्योतिर्लिंगों में प्रथम है। इसका निर्माण स्वयं चंद्रमा ने किया था।",
        img: "/somnath.jpg"
    },
    {
        id: "02",
        name: "Mallikarjuna",
        hindi: "मल्लिकार्जुन",
        loc: "Srisailam, Andhra Pradesh",
        importance: "इसे 'दक्षिण के कैलाश' के रूप में जाना जाता है। शिव-शक्ति का साक्षात वास।",
        img: "/Mallikarjuna.jpg"
    },
    {
        id: "03",
        name: "Mahakaleshwar",
        hindi: "महाकालेश्वर",
        loc: "Ujjain, Madhya Pradesh",
        importance: "एकमात्र दक्षिणमुखी ज्योतिर्लिंग, जो काल के अधिपति हैं।",
        img: "/Mahakaleshwar.jpg"
    },
    {
        id: "04",
        name: "Omkareshwar",
        hindi: "ओंकारेश्वर",
        loc: "Khandwa, Madhya Pradesh",
        importance: "नर्मदा नदी के बीच स्थित द्वीप जो प्राकृतिक 'ॐ' के आकार का है।",
        img: "/Omkareshwar.jpg"
    },
    {
        id: "05",
        name: "Kedarnath",
        hindi: "केदारनाथ",
        loc: "Rudraprayag, Uttarakhand",
        importance: "हिमालय की गोद में स्थित, यह मंदिर मोक्ष का परम द्वार है।",
        img: "/Kedarnath.jpg"
    },
    {
        id: "06",
        name: "Bhimashankar",
        hindi: "भीमाशंकर",
        loc: "Pune, Maharashtra",
        importance: "भीमा नदी का उद्गम स्थल और महादेव की असुर-विनाशिनी शक्ति का प्रतीक।",
        img: "/Bhimashankar.jpg"
    },
    {
        id: "07",
        name: "Kashi Vishwanath",
        hindi: "काशी विश्वनाथ",
        loc: "Varanasi, Uttar Pradesh",
        importance: "ब्रह्मांड की सबसे प्राचीन नगरी काशी, जो शिव के त्रिशूल पर विराजमान है।",
        img: "/KashiVishwanath.jpg"
    },
    {
        id: "08",
        name: "Trimbakeshwar",
        hindi: "त्र्यंबकेश्वर",
        loc: "Nashik, Maharashtra",
        importance: "यहाँ लिंग के भीतर ब्रह्मा, विष्णु और महेश तीनों का वास है।",
        img: "/Trimbakeshwar.jpg"
    },
    {
        id: "09",
        name: "Vaidyanath",
        hindi: "वैद्यनाथ",
        loc: "Deoghar, Jharkhand",
        importance: "रावण द्वारा स्थापित, यह रोगों को नष्ट करने वाले देव का धाम है।",
        img: "/Vaidyanath.jpg"
    },
    {
        id: "10",
        name: "Nageshwar",
        hindi: "नागेश्वर",
        loc: "Dwarka, Gujarat",
        importance: "दुष्टों का नाश करने वाले नागों के स्वामी का पवित्र स्थान।",
        img: "/Nageshwar.jpg"
    },
    {
        id: "11",
        name: "Rameshwaram",
        hindi: "रामेश्वरम",
        loc: "Tamil Nadu",
        importance: "भगवान राम द्वारा स्थापित, जहाँ उन्होंने रावण विजय का आशीर्वाद लिया।",
        img: "/Rameshware.jpg"
    },
    {
        id: "12",
        name: "Grishneshwar",
        hindi: "घृष्णेश्वर",
        loc: "Aurangabad, Maharashtra",
        importance: "बारहवां ज्योतिर्लिंग, जो श्रद्धा और क्षमा का अनुपम प्रतीक है।",
        img: "/Grishneshwar.jpg"
    }
]

const StorySteps = [
    {
        title: "The Adiyogi",
        hindi: "आदियोगी",
        text: "The source of yoga, silence, and all existence.",
        hText: "योग के प्रवर्तक, शून्य और अनंत के स्वामी।",
        img: "https://imgs.search.brave.com/hzGz0lJKtPxLaBni8f_BKb3tRkG_g1lujaJOLLD6jIk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFCc0RMLTV0c0wu/anBn"
    },
    {
        title: "The Neelkanth",
        hindi: "नीलकंठ",
        text: "The compassion that swallowed the cosmic poison.",
        hText: "वह करुणा जिसने सृष्टि के लिए हलाहल को गले लगाया।",
        img: "https://i.pinimg.com/736x/9e/8c/f2/9e8cf28e13396a028717cb3b4884cf83.jpg"
    }
]

// --- Main App ---

export default function App() {
    const [activeStory, setActiveStory] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [secretRevealed, setSecretRevealed] = useState(false)
    const [keySequence, setKeySequence] = useState('')
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false)
    const { scrollYProgress } = useScroll()
    const yRange = useTransform(scrollYProgress, [0, 0.2], [0, -50])
    const opacityRange = useTransform(scrollYProgress, [0, 0.1], [1, 0])

    // Secret Easter Egg - Type "harharmahadev" to reveal special blessing
    useEffect(() => {
        const handleKeyPress = (e) => {
            const newSequence = (keySequence + e.key).toLowerCase().slice(-14);
            setKeySequence(newSequence);

            if (newSequence === 'harharmahadev') {
                setSecretRevealed(true);
                setTimeout(() => setSecretRevealed(false), 8000);
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [keySequence]);

    return (
        <div className="min-h-screen bg-shiva-deep selection:bg-shiva-gold selection:text-shiva-deep relative">
            <div className="hidden md:block">
                <CursorFollower />
            </div>

            {/* Floating Om Particles */}
            <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl opacity-10"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, Math.random() * 50 - 25, 0],
                            opacity: [0.05, 0.15, 0.05],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: i * 2,
                        }}
                    >
                        🕉️
                    </motion.div>
                ))}
            </div>

            {/* Secret Easter Egg Blessing */}
            <AnimatePresence>
                {secretRevealed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -100 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                    >
                        <div className="glass-panel p-12 rounded-[3rem] border-4 border-shiva-gold shadow-[0_0_100px_rgba(255,215,0,0.8)] max-w-2xl mx-4">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <p className="text-8xl mb-6">🕉️</p>
                            </motion.div>
                            <h2 className="font-hindi text-5xl text-shiva-gold mb-4">
                                आपको मिला महादेव का विशेष आशीर्वाद!
                            </h2>
                            <p className="font-hindi text-2xl text-white/90 leading-relaxed">
                                सच्चे भक्त को नमन! आपकी भक्ति से प्रसन्न होकर भगवान शिव आपको<br />
                                अनंत शक्ति, ज्ञान और शांति का आशीर्वाद देते हैं।
                            </p>
                            <p className="font-cinzel text-lg text-shiva-gold/60 mt-6 italic">
                                "You have discovered the secret blessing of Lord Shiva!"
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Background */}
            <div className="fixed inset-0 z-0">
                <Canvas shadow={true}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#FFD700" />
                    <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={100} scale={10} size={2} color="#FFD700" opacity={0.5} />
                    <Suspense fallback={null}>
                        <CosmicShiva />
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* Hero Section - Fully Responsive */}
            <section className="relative min-h-screen flex flex-col items-center justify-center z-10 text-center overflow-hidden px-4">
                <motion.div
                    style={{ y: yRange, opacity: opacityRange }}
                    className="space-y-4 md:space-y-6"
                >
                    <motion.h2
                        initial={{ opacity: 0, letterSpacing: "1rem" }}
                        animate={{ opacity: 1, letterSpacing: "0.2rem" }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="text-shiva-gold font-hindi text-base sm:text-xl md:text-2xl lg:text-3xl px-4"
                    >
                        नमस्ते सदाशिव | Salutation to Lord Shiva
                    </motion.h2>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="font-hindi text-[18vw] sm:text-[7rem] md:text-[10rem] lg:text-[12rem] xl:text-[15rem] leading-none text-gold-gradient drop-shadow-2xl">
                            शिव
                        </h1>
                    </motion.div>
                    <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl lg:text-4xl text-white/40 tracking-[0.5rem] md:tracking-[1rem] lg:tracking-[1.5rem] uppercase font-light px-4">
                        Infinity
                    </h3>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 md:bottom-16 flex flex-col items-center gap-2 md:gap-4 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    whileHover={{ scale: 1.1 }}
                >
                    <span className="font-cinzel text-[8px] md:text-[10px] tracking-[0.3rem] md:tracking-[0.5rem] opacity-30 uppercase">The Eternal Journey</span>
                    <ArrowDownCircle className="text-shiva-gold animate-bounce" size={24} />
                </motion.div>
            </section>

            {/* Narrative Section - Responsive */}
            <section className="relative py-20 md:py-32 lg:py-40 z-10 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="absolute -inset-4 bg-shiva-gold/10 blur-3xl opacity-30" />
                            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeStory}
                                        src={StorySteps[activeStory].img}
                                        initial={{ scale: 1.2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 1.1, opacity: 0 }}
                                        transition={{ duration: 1.2 }}
                                        className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-shiva-deep via-transparent to-transparent" />
                            </div>
                        </motion.div>

                        <div className="space-y-8 md:space-y-12 order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                            >
                                <h4 className="text-shiva-gold font-hindi text-4xl sm:text-5xl md:text-6xl mb-4 italic">{StorySteps[activeStory].hindi}</h4>
                                <h5 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-white/50 tracking-wider">0{activeStory + 1} // {StorySteps[activeStory].title}</h5>
                            </motion.div>

                            <p className="font-hindi text-xl sm:text-2xl md:text-3xl leading-relaxed text-white/90 border-l-4 border-shiva-gold pl-6 md:pl-8">
                                {StorySteps[activeStory].hText}
                            </p>

                            <div className="flex gap-4 md:gap-6">
                                <button
                                    onClick={() => setActiveStory(prev => (prev - 1 + StorySteps.length) % StorySteps.length)}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-shiva-gold/20 flex items-center justify-center text-shiva-gold hover:bg-shiva-gold hover:text-shiva-deep transition-all duration-500"
                                >
                                    <ChevronLeft size={20} className="md:w-6 md:h-6" />
                                </button>
                                <button
                                    onClick={() => setActiveStory(prev => (prev + 1) % StorySteps.length)}
                                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-shiva-gold/20 flex items-center justify-center text-shiva-gold hover:bg-shiva-gold hover:text-shiva-deep transition-all duration-500"
                                >
                                    <ChevronRight size={20} className="md:w-6 md:h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mantra Wall - Auto-plays Stotram (Once Only) - Responsive */}
            <motion.section
                className="relative py-20 md:py-32 lg:py-40 z-10"
                onViewportEnter={() => {
                    const audio = document.getElementById('stotram-audio');
                    if (audio && audio.paused && !hasAutoPlayed) {
                        audio.play().catch(e => console.log('Audio autoplay prevented'));
                        setHasAutoPlayed(true);
                        setIsPlaying(true);
                    }
                }}
                viewport={{ once: true, margin: "-20%" }}
            >
                <div className="overflow-hidden whitespace-nowrap flex select-none">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex gap-4 md:gap-20 text-[12vw] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-hindi text-white/5 uppercase tracking-tighter"
                    >
                        <span>ॐ नमः शिवाय</span>
                        <span>हर हर महादेव</span>
                        <span>ॐ नमः शिवाय</span>
                        <span>हर हर महादेव</span>
                        <span>ॐ नमः शिवाय</span>
                        <span>हर हर महादेव</span>
                    </motion.div>
                </div>
            </motion.section>

            {/* Sacred Stotram Section with Manual Control - Responsive */}
            <section className="relative py-20 md:py-32 lg:py-40 z-10 bg-gradient-to-b from-transparent via-shiva-indigo/20 to-transparent">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-5xl mx-auto px-4 md:px-6"
                >
                    <div className="glass-panel p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem] border border-shiva-gold/10 relative overflow-hidden">
                        <div className="absolute -top-32 -right-32 w-96 h-96 bg-shiva-gold/5 blur-[120px]" />
                        <div className="relative space-y-8 md:space-y-12 text-center">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                                <h2 className="text-shiva-gold font-hindi text-3xl sm:text-4xl md:text-5xl">द्वादश ज्योतिर्लिंग स्तोत्रम्</h2>
                                <button
                                    onClick={() => {
                                        const audio = document.getElementById('stotram-audio');
                                        if (audio.paused) {
                                            audio.play();
                                            setIsPlaying(true);
                                        } else {
                                            audio.pause();
                                            setIsPlaying(false);
                                        }
                                    }}
                                    className="w-14 h-14 rounded-full bg-shiva-gold/10 border-2 border-shiva-gold/30 flex items-center justify-center hover:bg-shiva-gold/20 transition-all group"
                                >
                                    {isPlaying ? (
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <VolumeX size={24} className="text-shiva-gold" />
                                        </motion.div>
                                    ) : (
                                        <Volume2 size={24} className="text-shiva-gold" />
                                    )}
                                </button>
                            </div>

                            {/* Audio Element */}
                            <audio
                                id="stotram-audio"
                                loop
                                className="hidden"
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                            >
                                <source src="/stotram.mp3" type="audio/mpeg" />
                                {/* Fallback for different formats */}
                                <source src="/stotram.ogg" type="audio/ogg" />
                                <source src="/stotram.wav" type="audio/wav" />
                            </audio>

                            <StotramLyrics />

                            <div className="pt-8 border-t border-white/5">
                                <p className="font-cinzel text-white/30 tracking-[0.5rem] text-xs uppercase italic">
                                    The Sacred Verse of the 12 Eternal Lights • Click any line to jump
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Yatra Cards - Responsive Grid */}
            <section className="relative py-20 md:py-32 lg:py-40 z-10 px-4 md:px-6 bg-shiva-indigo/10">
                <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-shiva-gold font-hindi text-3xl sm:text-4xl md:text-5xl">पावन ज्योतिर्लिंग</h2>
                        <p className="font-cinzel text-white/20 tracking-[0.3rem] md:tracking-[0.5rem] lg:tracking-[1rem] uppercase text-xs md:text-sm">Abodes of the Infinite Light</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                        {Jyotirlingas.map((jy) => (
                            <motion.div
                                key={jy.id}
                                whileHover={{ y: -15, rotateX: 5, rotateY: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="group relative h-[350px] sm:h-[450px] md:h-[500px] glass-panel rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 hover:border-shiva-gold/30 transition-colors"
                            >
                                <img src={jy.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-shiva-deep" />

                                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 p-2 space-y-2 md:space-y-4">
                                    <span className="text-shiva-gold font-hindi text-xl sm:text-2xl md:text-3xl block">{jy.hindi}</span>
                                    <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl text-white font-bold">{jy.name}</h3>
                                    <p className="text-white/50 text-xs md:text-sm italic pr-4 md:pr-10">{jy.importance}</p>
                                </div>
                                <span className="absolute top-6 md:top-8 right-6 md:right-8 font-cinzel text-5xl md:text-7xl opacity-5 text-shiva-gold pointer-events-none">{jy.id}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Blessing Section for Mahadev Devotees */}
            <section className="relative min-h-screen flex items-center justify-center z-10 py-40">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto px-6"
                >
                    <div className="glass-panel p-6 sm:p-8 md:p-16 lg:p-24 rounded-[2rem] md:rounded-[4rem] text-center border-shiva-gold/10 shadow-[0_0_100px_rgba(255,215,0,0.05)] relative overflow-hidden">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-shiva-gold/5 blur-[100px]" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-shiva-gold/5 blur-[100px]" />

                        <motion.h3
                            className="font-hindi text-3xl sm:text-5xl lg:text-6xl text-white mb-8"
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(255,215,0,0.3)",
                                    "0 0 40px rgba(255,215,0,0.6)",
                                    "0 0 20px rgba(255,215,0,0.3)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            हर हर महादेव
                        </motion.h3>

                        <p className="font-hindi text-lg sm:text-2xl text-white/70 mb-8 md:mb-12 leading-relaxed">
                            शिव भक्तों के लिए विशेष आशीर्वाद
                        </p>

                        {/* Interactive Trishul and Bell */}
                        <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12 mb-12 md:mb-16">
                            {/* Trishul */}
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="cursor-pointer"
                            >
                                <div className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl">🔱</div>
                            </motion.div>

                            {/* Bell */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: [0, -15, 15, -15, 0] }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    // Show blessing message
                                    const blessing = document.getElementById('blessing-message');
                                    if (blessing) {
                                        blessing.classList.remove('hidden');
                                        setTimeout(() => blessing.classList.add('hidden'), 5000);
                                    }
                                }}
                                className="relative z-10 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-shiva-gold to-orange-500 flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.3)] group"
                            >
                                <Bell className="text-shiva-deep group-hover:animate-swing w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                            </motion.button>

                            {/* Damaru */}
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: -360 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="cursor-pointer"
                            >
                                <div className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl">🥁</div>
                            </motion.div>
                        </div>

                        {/* Blessing Message */}
                        <motion.div
                            id="blessing-message"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hidden mb-12 p-8 bg-shiva-gold/10 rounded-3xl border border-shiva-gold/30"
                        >
                            <p className="font-hindi text-xl sm:text-3xl text-shiva-gold mb-4">🕉️ शिव का आशीर्वाद 🕉️</p>
                            <p className="font-hindi text-base sm:text-xl text-white/90 leading-relaxed">
                                भगवान शिव आपको और आपके परिवार को सुख, समृद्धि और शांति प्रदान करें।<br />
                                आपकी सभी मनोकामनाएं पूर्ण हों। हर हर महादेव!
                            </p>
                        </motion.div>

                        {/* Devotee Counter */}
                        <div className="mb-12 p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
                            <p className="font-cinzel text-sm text-white/40 uppercase tracking-widest mb-2">Devotees Worldwide</p>
                            <motion.p
                                className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-shiva-gold font-bold"
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                ∞ Infinite
                            </motion.p>
                        </div>

                        {/* Special Message for Devotees */}
                        <div className="space-y-6 border-t border-white/10 pt-12">
                            <p className="font-hindi text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
                                "जो भी इस पवित्र यात्रा में शामिल हुआ है,<br />
                                महादेव की कृपा सदा उस पर बनी रहे।"
                            </p>
                            <p className="font-cinzel text-sm text-white/40 italic">
                                "May Lord Shiva's grace be upon all who embark on this sacred journey"
                            </p>
                        </div>

                        <div className="mt-16 pt-8 border-t border-white/5">
                            <p className="font-cinzel text-xs tracking-[0.2rem] sm:tracking-[0.5rem] md:tracking-[1rem] opacity-20 text-white uppercase">
                                Divine Unity • Mahashivratri 2026
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Floating Audio Controller */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                    const audio = document.getElementById('stotram-audio');
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                }}
                className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full glass-panel border border-shiva-gold/20 flex items-center justify-center text-shiva-gold shadow-2xl hover:border-shiva-gold/40 transition-all"
            >
                {isPlaying ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </motion.button>

            <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes swing {
          0%, 100% { transform: rotate(0); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-15deg); }
          60% { transform: rotate(10deg); }
          80% { transform: rotate(-10deg); }
        }
        .animate-swing { animation: swing 0.8s ease-in-out; }
      `}</style>
        </div>
    )
}
