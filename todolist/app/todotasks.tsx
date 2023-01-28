'use client';
import { useRouter } from "next/navigation";
import { Button, Center, Checkbox, Text, Divider } from "@chakra-ui/react";

async function updateToDo(refersh:any,id:any, isDone:any) {
    await fetch('/api/todo/update',{
    method: 'POST',
    body:JSON.stringify({id,isDone})
});
refersh();
}
async function deleteToDo(refersh:any,id:any) {
    await fetch(`/api/todo/delete?id=${id}`,{
    method: 'DELETE'
});
refersh();
}
  {/* @ts-expect-error Server Component */}
export default function ToDoTasks( {tasks} ){
    const router = useRouter();
    return(<>
    <Center>
    <Divider h={1} m={5} bg="blackAlpha.600"  orientation='vertical' />
        <Checkbox m={5} colorScheme='green' checked={tasks.isDone} onChange={(e) => updateToDo(router.refresh , tasks.id, e.target.checked)} />
       <Text m={5} w="40%" colorScheme='green'> {tasks.name}</Text>
        <Button m={5} width={75} bg="teal.100" onClick={(e) => deleteToDo(router.refresh,tasks.id)}>Delete</Button>
        </Center>
        </>
        );
}