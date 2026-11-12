import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import ScreenFrame from '../components/ScreenFrame'
import PillButton from '../components/PillButton'
import type { NavProps } from '../nav'
import { MUSEUM } from '../data/artifacts'

export default function Screen01({ go, selectArtifact }: NavProps) {
  const points = [[.08,.88],[.31,.83],[.51,.78],[.51,.48],[.76,.48],[.88,.31],[.82,.08],[.56,.05],[.34,.08],[.16,.34],[.20,.52]]
  const path = points.map(([x,y], index) => `${index ? 'L' : 'M'} ${x*100} ${y*100}`).join(' ')
  const artifacts = ['amphora','head','coin','figurine','bowl','relief','bracelet']
  const choose = (index: number) => { selectArtifact(artifacts[index % artifacts.length]); go(index === 0 ? 2 : 4) }
  return <ScreenFrame n={1} go={go} footer={<PillButton className="-translate-y-12" variant="dark" onClick={() => go(4)} icon={<ArrowRight size={19} />}>OPEN MY COLLECTION</PillButton>}>
    <div className="pt-5">
      <h1 className="text-[1.8rem] font-semibold leading-[.98] tracking-[-.045em]">YOUR VISIT<br />IS READY</h1>
      <p className="mt-3 text-[.88rem]">{MUSEUM.name} <span className="mx-2 text-slate-400">·</span> {MUSEUM.duration}</p>
      <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl" aria-label="Interactive museum route">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px] overflow-hidden rounded-2xl">
          {Array.from({length:9},(_,i)=><div key={i} className="glass-tile relative overflow-hidden rounded-[9px] border border-white/45"><img src={`${import.meta.env.BASE_URL}artifacts/route-map.webp`} alt="" className="absolute h-full max-w-none opacity-90" style={{width:'300%',height:'300%',left:`${-(i%3)*100}%`,top:`${-(Math.floor(i/3))*100}%`}} /></div>)}
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible"><motion.path d={path} fill="none" stroke="#0128ff" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="300" initial={{strokeDashoffset:300}} animate={{strokeDashoffset:[300,0]}} transition={{duration:5,repeat:Infinity,repeatType:'reverse',ease:'easeInOut'}} /></svg>
        {points.slice(1,8).map(([x,y],i)=><button key={i} type="button" aria-label={`Explore ${artifacts[i]}`} onClick={()=>choose(i)} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-blue ${i===0||i===4?'h-6 w-6 bg-[#f9c201]':'h-2.5 w-2.5 bg-blue'} ${i===0?'animate-pulse':''}`} style={{left:`${x*100}%`,top:`${y*100}%`}} />)}
      </div>
      <div className="mt-2 flex items-baseline gap-2"><strong className="text-[2.05rem] font-semibold leading-none">7</strong><span className="text-[1rem] font-semibold text-blue">ARTIFACTS SAVED</span></div>
      <div className="mt-1 flex items-start gap-3"><span className="mt-1 grid grid-cols-3 gap-[2px]">{Array.from({length:9},(_,i)=><i key={i} className="h-[3px] w-[3px] bg-blue" />)}</span><p className="text-[.8rem] leading-snug">Follow the route, explore the marked spots,<br className="hidden"/> and save the artifacts you discover.</p></div>
    </div>
  </ScreenFrame>
}
