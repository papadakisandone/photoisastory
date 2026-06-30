"use client";
import Image from "next/image";
import Link from "next/link";
import {AnimatePresence,motion} from "framer-motion";
import {ArrowLeft,ChevronLeft,ChevronRight,Heart,Menu,Search,ShoppingBag,X} from "lucide-react";
import {useEffect,useState} from "react";
const photos=[
{src:"/images/stillness-lake.png",title:"Where Silence Lives",place:"The Alps",category:"Landscape"},
{src:"/images/winter-solitude.png",title:"Winter Solitude",place:"Lofoten",category:"Landscape"},
{src:"/images/glacial-river.png",title:"Veins of the Earth",place:"Iceland",category:"Drone"},
{src:"/images/forest-light.png",title:"Between the Pines",place:"Black Forest",category:"Nature"},
{src:"/images/atlantic-silence.png",title:"Atlantic Silence",place:"Faroe Islands",category:"Seascape"},
{src:"/images/afentis-christos.webp",title:"Afentis Christos",place:"Crete",category:"Landscape"},
{src:"/images/dsc-1671.webp",title:"Untold Story",place:"Greece",category:"Travel"},
{src:"/images/limani.webp",title:"At the Harbour",place:"Greece",category:"Travel"},
{src:"/images/pagkaki.webp",title:"The Empty Bench",place:"Greece",category:"Story"},
{src:"/images/pleasure-beach.webp",title:"Pleasure Beach",place:"Crete",category:"Drone"},
{src:"/images/theatro.webp",title:"The Theatre",place:"Greece",category:"Architecture"}
];
const Logo=()=> <Link href="/" className="logo">Photo<span>.</span>is<span>.</span>a<span>.</span>Story<small>FINE ART PHOTOGRAPHY</small></Link>;
export default function Gallery(){const[open,setOpen]=useState<number|null>(null);const[filter,setFilter]=useState("All");const cats=["All",...Array.from(new Set(photos.map(x=>x.category)))];const shown=filter==="All"?photos:photos.filter(x=>x.category===filter);useEffect(()=>{const key=(e:KeyboardEvent)=>{if(open===null)return;if(e.key==="Escape")setOpen(null);if(e.key==="ArrowRight")setOpen((open+1)%photos.length);if(e.key==="ArrowLeft")setOpen((open-1+photos.length)%photos.length)};window.addEventListener("keydown",key);return()=>window.removeEventListener("keydown",key)},[open]);return <main className="galleryPage"><header className="galleryNav"><Logo/><Link href="/"><ArrowLeft/> Back home</Link><div><Search/><Heart/><ShoppingBag/><Menu/></div></header><section className="galleryHero"><p className="eyebrow">THE COMPLETE ARCHIVE</p><h1>Every frame holds<br/>a <em>story.</em></h1><p>A growing collection of quiet places, fleeting light and landscapes worth remembering.</p></section><div className="filters">{cats.map(x=><button className={filter===x?"active":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div><section className="fullGrid">{shown.map((p,i)=>{const original=photos.indexOf(p);return <motion.button className="galleryCard" key={p.src} onClick={()=>setOpen(original)} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}><span className="galleryVisual"><Image src={p.src} alt={p.title} fill sizes="(max-width:700px) 100vw, 33vw"/></span><span className="galleryCaption"><span><b>{p.title}</b><small>{p.place} · {p.category}</small></span><i>{String(i+1).padStart(2,"0")}</i></span></motion.button>})}</section><AnimatePresence>{open!==null&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="lightboxClose" onClick={()=>setOpen(null)} aria-label="Close"><X/></button><button className="lightboxPrev" onClick={()=>setOpen((open-1+photos.length)%photos.length)} aria-label="Previous"><ChevronLeft/></button><motion.div className="lightboxImage" key={photos[open].src} initial={{opacity:0,scale:.98}} animate={{opacity:1,scale:1}}><Image src={photos[open].src} alt={photos[open].title} fill sizes="100vw" priority/><div><b>{photos[open].title}</b><small>{photos[open].place} · {photos[open].category}</small></div></motion.div><button className="lightboxNext" onClick={()=>setOpen((open+1)%photos.length)} aria-label="Next"><ChevronRight/></button></motion.div>}</AnimatePresence></main>}