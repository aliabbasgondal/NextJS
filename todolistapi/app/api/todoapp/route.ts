import { NextRequest, NextResponse } from "next/server"
import postgres from "postgres";
import { drizzle } from 'drizzle-orm/node-postgres';
import { boolean, integer, pgTable, serial, text, time, timestamp, varchar } from 'drizzle-orm/pg-core';
import { InferModel, eq, sql } from 'drizzle-orm';
import { Pool } from 'pg';
import { format } from 'date-fns';

const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  taskname: text('taskname').notNull(),
  taskdetail: text('taskdetail').notNull(),
  taskdate: text('taskdate').notNull(),
  tasktime: text('tasktime').notNull(),
  isdone: boolean('isdone').notNull()
});
  
export type Task = InferModel<typeof tasks>;
export type NewTask = InferModel<typeof tasks, 'insert'>;

export async function POST(request: Request) {


   
  try {
   const req = await request.json();
   
   if(req.taskNamePassed && req.taskDatePassed && req.taskTimepassed){
   const pool = new Pool({
    connectionString: 'postgres://default:ca3eFoC1HvOh@ep-sparkling-hat-837881-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
  });

  const db = drizzle(pool);
    const newTask: NewTask = {
        taskname: req.taskNamePassed,
        taskdetail: req.detailPassed === ''? 'No Detail Avilable': req.detailPassed,
        taskdate: req.taskDatePassed,
        tasktime: req.taskTimepassed,
        isdone: req.isDoneTask
      };
    
      const insertask /* : User[] */ = await db.insert(tasks).values(newTask).returning();
      const insertedTask = insertask[0]!
       
    if (insertask.length === 0) {
      return new NextResponse("No data found", { status: 404 });
    }else{
  
    return new NextResponse(JSON.stringify(insertedTask));
}

}else{return new Response('Task  is Empty')}
  } catch (e) {
    console.error(e);
    return new Response(`${e}`, { status: 400 });
  }
}

export async function GET() {


   
  try {

   
   
   const pool = new Pool({
    connectionString: 'postgres://default:ca3eFoC1HvOh@ep-sparkling-hat-837881-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
  });

  const db = drizzle(pool);
    

      const selectTasks /* : User[] */ =  await db.select().from(tasks);
            
    if (selectTasks.length === 0) {
      return new NextResponse("No data found", { status: 404 });
    }else{
  
    return new NextResponse(JSON.stringify(selectTasks));
}

    
 

  } catch (e) {
    console.error(e);
    return new Response(`${e}`, { status: 400 });
  }
}
export async function PUT(request: Request) {


   
  try {

    const req = await request.json();
    
   if(req.id && req.status){
        const pool = new Pool({
          connectionString: 'postgres://default:ca3eFoC1HvOh@ep-sparkling-hat-837881-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require',
        });

        const db = drizzle(pool);
    
        console.log(req.id, req.status);
         const updatedTasks =  await db.update(tasks)
            .set({ 
              isdone: req.status,
            
            })
            .where(eq(tasks.id, req.id))
            .returning({tasks});
         
                if (updatedTasks.length === 0) {
                  return new NextResponse("No data found", { status: 404 });
                }else{
              
                return new NextResponse(JSON.stringify(updatedTasks));
                
            }
          }
            else{return new NextResponse("No data found", { status: 404 });}
 

  } catch (e) {
    console.error(e);
    return new Response(`${e}`, { status: 400 });
  }
}

