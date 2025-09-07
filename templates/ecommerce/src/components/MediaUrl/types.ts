export type MediaUrlItem = {
  url: string
  alt: string
  caption?: string
}

export type MediaUrlProps = {
  media: MediaUrlItem | MediaUrlItem[]
  className?: string
  imgClassName?: string
  showCaption?: boolean
}
