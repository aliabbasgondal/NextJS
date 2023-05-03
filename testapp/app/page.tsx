import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })
async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=blog`);
  
  return res.json()
  
}
export default async function Home() {
  const blogs = await getBlogs();
  return (
    <ul>
      {blogs.items.map((item: any,index:any) => (
        <li key={index}>{item.fields.title}</li>
      ))}
    </ul>
  )
}
