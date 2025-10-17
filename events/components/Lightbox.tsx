"use client"
import { useState } from 'react'

type Img = string | { src: string; caption?: string }

export default function Lightbox({ images }: { images: Img[] }){
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((item, i)=> {
          const src = typeof item === 'string' ? item : item.src
          const caption = typeof item === 'string' ? undefined : item.caption
          const encoded = encodeURI(src)
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <figure key={src} className="flex flex-col gap-2">
              <img
                src={encoded}
                alt={caption || 'Gallery image'}
                className="aspect-video object-cover rounded-xl cursor-pointer bg-neutral-200"
                onClick={()=>{ setIdx(i); setOpen(true) }}
              />
              {caption && (
                <figcaption className="text-xs text-neutral-600">
                  {caption}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" role="dialog" aria-modal>
          <button aria-label="Close" className="absolute top-4 right-4 bk-btn" onClick={()=>setOpen(false)}>Close</button>
          <div className="max-w-5xl w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {(() => { const current = images[idx]; const src = typeof current === 'string' ? current : current.src; const caption = typeof current === 'string' ? undefined : current.caption; return (
              <>
                <img src={encodeURI(src)} alt={caption || 'Lightbox image'} className="w-full h-auto rounded-xl bg-neutral-200"/>
                {caption && <div className="mt-2 text-sm text-white/90">{caption}</div>}
              </>
            )})()}
            <div className="mt-4 flex justify-between">
              <button className="bk-btn" onClick={()=> setIdx((idx-1+images.length)%images.length)}>Prev</button>
              <button className="bk-btn" onClick={()=> setIdx((idx+1)%images.length)}>Next</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
