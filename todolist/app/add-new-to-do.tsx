"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SimpleGrid , useColorMode,Box, Button, Input, Heading, Divider } from "@chakra-ui/react";
import { Content } from "@next/font/google";


async function addToDo(refersh:any,name:any) {
  await fetch(`/api/todo/add`,{
  method: 'POSt',
  body:JSON.stringify({name}),
});
refersh();
}
export default function AddNewToDo(){
  const Router = useRouter();
  let [name, setName] = useState("");
    return(
      
      <SimpleGrid  as="div"  background="gray.100"  minW="100%" h={{base:'auto', md:'45vh'}} opacity={90}>
      
  

         <Heading as="h1" flexGrow={1} size="lg" textAlign="center" alignItems="center" justifyContent="center" letterSpacing={'.1 rem'}>
        To Do Assignment
        </Heading>
        <Box as="div" minW="100%" h={{base:"auto", md:"10vh"}} >
        <Heading as="h6" fontSize={25} w={285} textAlign="center" alignItems="center" justifyContent="center"  color="blackAlpha.700" m="5px auto">Add a New Task</Heading>
        
        
        </Box>
        
        
        
        <Box as="div" h={{base:"auto", md:"100vh"}} minW="100%">
        <Divider h={1} m={5} bg="blackAlpha.600"  orientation='vertical' />
        <center>
      <Input type="text" w={{base:"250px", md:"400px"}} color="blackAlpha.900" background="gray.500" height={55} onChange={(e) => setName(e.target.value)}/>
      
      <Button onClick={(e) => addToDo(Router.refresh,name)} mb={{base:"10px", md:"auto"}} mt={{base:"10px", md:"auto"}} height={50} ml={{base:"o", md:"5px"}} width={100} colorScheme="teal">Add</Button>
      </center>
      </Box>
      </SimpleGrid >
    )
}