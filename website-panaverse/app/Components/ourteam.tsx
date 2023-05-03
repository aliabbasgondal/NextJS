import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    ChakraProvider,
    Icon,
  } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import dynamic from 'next/dynamic';  
import { useState, useEffect, ReactNode } from "react";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { profile } from 'console';


  interface teamProfile{
    
    id:number,    
    name:string,
        designation:string,
        profile:ReactNode,
        facebook:string,
        twitter:string,
        pic:string
  }  
  function ThirdPartyComponent() {

    const [heading, setHeading] = useState();
    const [pageDescription, setPageDescription] = useState<ReactNode>();
    const [siteteamProfile, setteamProfile] = useState<teamProfile[]>([]);
    const colorMode=useColorModeValue('white', 'gray.900');
    const colorModeGray=useColorModeValue('gray.700', 'gray.400');
  
  
    useEffect(() => {
      async function getContent() {
        const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=outTime`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await res.json();
  
        const itemLinks = json.includes.Entry.map((fieldName: any) => {
  
          return fieldName.fields;
  
        });
  
        const allKeys = itemLinks.reduce((keys: any, item: any) => {
          return keys.concat(Object.keys(item)); 
        }, []);
        const uniqueKey = Array.from(new Set(allKeys));
        
      
        
        
         setHeading(json.items[0].fields.title);
        setPageDescription(documentToReactComponents(json.items[0].fields.description));
        var count =0;
        const arrayOfProfile: teamProfile[]=[];
        json.items[0].fields.teamProfile.map((team: any) => {
          json.includes.Entry.map((item:any)=>{
           
           
           if(team.sys.id === item.sys.id)
           {
           
            
            const profileItem = {id:0,name:'',
              designation:'',
              profile:'',
              facebook:'',
              twitter:'',
              pic:''}
              arrayOfProfile.push(profileItem);
           uniqueKey.map((items: any) => {
           
            const itemData = item.fields[items];
            
                   if(typeof(itemData) === 'object' && itemData.nodeType ==='document')
                   {
                    
                    arrayOfProfile[count].profile= documentToReactComponents(itemData); 
                    
                   }
                   else if(typeof(itemData[0]) ==='object' && itemData[0].sys.linkType ==='Entry')
                   {
       
                    let counts = count;
                    itemData.forEach(async (e:any)=>{
                        
                         const resLinks = await fetch(`https://cdn.contentful.com/spaces//${process.env.CONTENTFUL_SPACE_ID}/entries/${e.sys.id}?access_token=${process.env.CONTENTFUL_ACCESS_KEY}`, { cache: 'no-store' });
                         
                         if (!resLinks.ok) {
                           throw new Error('Failed to fetch data');
                         }
                         const json = await resLinks.json();
                         
                         json.fields.socialMediaField == 'Twitter'? 
                         arrayOfProfile[counts].twitter= json.fields.socialIconsUrl
                         :arrayOfProfile[counts].facebook= json.fields.socialIconsUrl 
                       })
                   }else if(typeof(itemData) ==='object' && itemData.sys.linkType ==='Asset')
                   {
         
                     json.includes.Asset.map((picID:any)=>{
                         picID.sys.id===itemData.sys.id? arrayOfProfile[count].pic= picID.fields.file.url : ""
                     })
                   } else if(items =='name'){arrayOfProfile[count].name=itemData;
                    }else if(items =='designation'){arrayOfProfile[count].designation=itemData;}
                   else{
                     null;
                   }
                   
                 });
                 arrayOfProfile[count].id=count;
                 count = count + 1;
               }else{null;}
          }); 

}); 
arrayOfProfile.sort((a, b) => (a.name < b.name) ? 1 : -1);
  
        { setteamProfile(arrayOfProfile); }
  
      }
      getContent();
    }, []);
    return(
      <motion.div
      initial={{opacity:0, x:-50}}
      animate={{opacity:1,y:5,x:0}}
      
      transition={{duration:1.5}} >
      <Box gap={4} maxW={'3xl'} justifySelf={"center"} m={"70px auto"} py={"10px"}>
      <Heading w={"full"} as="h1" size="xl" color="#159957" textAlign={"center"} py={"5px"}>
       {heading}
      </Heading>
      <Heading w={"full"} as="h4" size="md"  textAlign={"center"} py={"5px"}>
    {pageDescription}
      </Heading>
      </Box>
    <Center py={6} minH={"500px"} justifySelf="center" my={"20px"} zIndex={"10"}>
    
      {siteteamProfile.map((index,keyv) =>(
            
            
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={keyv.toString()}
            >
       <Box
        key={index.id}
        maxW={'320px'}
        w={'full'}
        bg={colorMode}
        boxShadow={'2xl'}
        rounded={'lg'}
        mx={6}
        textAlign={'center'}
        p={6}
        >
        <Avatar
          key={index.id}
          size={'xl'}
          src={
            index.pic
          }
          
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading   key={index.id} fontSize={'2xl'} fontFamily={'body'}>
          {index.name}
        </Heading>
        <Text   key={index.id} fontWeight={600} color={'gray.500'} mb={4}>
          {index.designation}
        </Text>
        <Text   key={index.id}
          textAlign={'center'}
          color={colorModeGray}
          px={3}>
          {index.profile}
          
        </Text>
             

        <Stack   key={index.id} mt={8} direction={'row'} spacing={4} justifyContent="center">
        <Link   key={index.id} _hover={{
    textDecoration: 'none',
    background:"#159957",
      bgGradient:"linear-gradient(120deg, #155799, #159957)",
      color:"#AF172C",
  }}  px={2}
  py={1}
  rounded={'md'} alignContent="center" color="#AF172C" href={index.facebook}>
    <Icon  h="30px" w="30px" as={FaFacebook} />
    </Link>
    <Link   key={index.id} _hover={{
    textDecoration: 'none',
    background:"#159957",
      bgGradient:"linear-gradient(120deg, #155799, #159957)",
      color:"#AF172C",
  }}  px={2}
  py={1}
  rounded={'md'} alignContent="center" color="#AF172C" href={index.twitter}>
    <Icon  h="30px" w="30px" as={FaTwitter} />
    </Link>
        </Stack>
      </Box>
      </motion.button>
         ))}
             
    </Center>
    </motion.div>
    );
  }


  const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
    ssr: false
  });
  
  export default function SocialProfileTeam() {
   
    return (
        <ChakraProvider>
          <DynamicThirdPartyComponent></DynamicThirdPartyComponent>
          
        
       
      
      </ChakraProvider>
    );
  }

  