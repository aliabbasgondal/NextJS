
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import ToDoList from './todolist'

import AddNewToDo from './add-new-to-do'



export default async function Home() {
  
  return (
    
      <><AddNewToDo />
        {/* @ts-expect-error Server Component */}
     <ToDoList /></>
    
  );
}