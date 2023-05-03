import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Image from 'next/image'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

<div className="flex justify-center bg-gray-300">
<div className="mx-4 order-last self-center">
<Image width={80} height={80} src={"/panaverse.png"} alt={"Panaverse Logo"}></Image>
</div>
<div className="mx-4 self-center text-center">
<h1 className="text-6xl font-bold text-blue-700">Welcome to Panaverse DAO</h1>
<h2 className="text-3xl font-semibold text-blue-300">
web 3.0 and Metavarse Community
</h2>
<button
className="my-4 px-4 py-2 border-2 border-black rounded-lg
text-white bg-blue-900 ">
Learn More
</button>
</div>
</div>
  )
}
