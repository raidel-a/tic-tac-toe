import { Noto_Sans, Noto_Serif, Oswald, Source_Sans_3, Figtree, Roboto_Slab, Josefin_Sans } from 'next/font/google'
// import localFont from 'next/font/local'
 
// define your variable fonts
const notoSerif = Noto_Serif({ subsets: ['latin']})
const notoSans = Noto_Sans({ subsets: ['latin']})
const oswald = Oswald({ subsets: ['latin']})
const figtree = Figtree({ subsets: ['latin']})
const robotoSlab = Roboto_Slab({ subsets: ['latin']})
const josefinSans = Josefin_Sans({ subsets: ['latin']})

// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({ subsets: ['latin'], weight: '400' })
const sourceCodePro700 = Source_Sans_3({ subsets: ['latin'], weight: '700' })

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })
 
export { notoSans, notoSerif, oswald, sourceCodePro400, sourceCodePro700, figtree, robotoSlab,josefinSans }
