
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { json } from 'stream/consumers';
import { stringify } from 'querystring';

const inter = Inter({ subsets: ['latin'] })

async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=12PLfzXUM1dOHCQtw7bs2lUP2Ps7bETiDDm_0UZ8zsE&content_type=blog`, { cache: 'no-store' });
  
 
 
  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  function documentToReactComponents(description: any): import("react").ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    console.log(JSON.stringify(blogs))
  )
}
