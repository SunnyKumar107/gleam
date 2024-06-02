import { leckerliOne } from '@/lib/fonts'
import { cn } from '@/lib/utils'

const Logo = () => {
  return (
    <>
      <h1 className={cn('text-3xl md:text-4xl', leckerliOne.className)}>Gleam</h1>
    </>
  )
}

export default Logo
