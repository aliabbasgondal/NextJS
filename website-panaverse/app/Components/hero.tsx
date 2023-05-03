import { Box, Button, ButtonGroup, ChakraProvider, Heading, Image, Link, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode , useEffect, useState,ReactDOM, Fragment} from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
function ThirdPartyComponent() {
  
  interface siteItems{
    welcomeMessage:string,
    tagLine:string,
    secondTagLine:string,
    thirdTagLine:string,
    fourthTagLine:string,
    btns:[{
      btnName:string,
      btnLink:string
    }],
    heroPic:string

  }
  const [sitepageContent, setpageContent] = useState<siteItems>();
  const router = useRouter();
  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=heroSection`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await res.json();
      const Content:siteItems={
        welcomeMessage:'',
        tagLine:'',
        secondTagLine:'',
        thirdTagLine:'',
        fourthTagLine:'',
        btns:[{
          btnName:'',
          btnLink:''
        }],
        heroPic:''
      } 
      const returnedItems=json.items[0].fields;
      Content.welcomeMessage=documentToHtmlString(returnedItems.welcomMessage);
      Content.secondTagLine=documentToHtmlString(returnedItems.secondTagLine);;
      Content.thirdTagLine=documentToHtmlString(returnedItems.thirdTagLine);
      Content.fourthTagLine=documentToHtmlString(returnedItems.fourthTagline);
      Content.btns = returnedItems.buttonLink.map((e: any) => {
        const socialEntry = json.includes.Entry.find((social: any) => e.sys.id === social.sys.id);
        if (socialEntry) {
          return {
            btnName: socialEntry.fields.button,
            btnLink: socialEntry.fields.buttonlink
          };
        }
        return null;
      });
      Content.heroPic=json.includes.Asset[0].fields.file.url;

      setpageContent(Content);
      
    }
    getContent();
  }, []);
  return(  <Box
    height="75vh"
    display="flex"
    justifyContent="left"
    alignItems="center"
    w={"100%"}
    px={10}
    zIndex={2}
    backdropBlur={"2xl"}
    background = {"rgba(255, 255, 255, 0.10)"}
    border={"1px solid rgba(255, 255, 255, 0.40)"}
    boxShadow='#159957 lg'  roundedBottom={"lg"}
    justifySelf={"center"}
    mb={{base:'10px', md:'20px'}}
    flexDirection={{ base: "column", md: "row" }}
        >
    <motion.div
    initial={{opacity:0, x:-50}}
    animate={{opacity:1,y:5,x:0}}
    
    transition={{duration:1.5}} >
      <Image src={sitepageContent?.heroPic} alt="ertified Web 3.0 and Metaverse Developer" maxH={'75vh'} w={"container.xl"} ></Image>
    </motion.div>      
    {sitepageContent && (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 1 }}
    
    >
      <Heading w={"full"} as="h1" size="3xl" color="#AF172C" py={"5px"}  dangerouslySetInnerHTML={{ __html: sitepageContent.welcomeMessage}}>
        
        
      </Heading>
      <motion.div
    initial={{opacity:0, y:-50}}
    animate={{opacity:1,y:5,x:0}}
    
    transition={{duration:1.5}} >
      <Heading as="h2" fontSize="lg" w={"full"} color="#159957" py={"5px"}  dangerouslySetInnerHTML={{ __html:  sitepageContent.secondTagLine}}>
       
      </Heading>
    </motion.div>
    <motion.div
    initial={{opacity:0, y:-50}}
    animate={{opacity:1,y:5,x:0}}
    
    transition={{duration:1.5}} >
      <Text fontSize="md" w={"full"} color="rgb(79, 79, 79)" py={"5px"}  dangerouslySetInnerHTML={{ __html:  sitepageContent.thirdTagLine}}>
      
      </Text>
    </motion.div>
    <motion.div
    initial={{opacity:0, y:-50}}
    animate={{opacity:1,y:5,x:0}}
    
    transition={{duration:1.5}} >
      <Text fontSize="md" w={"full"} color="rgb(79, 79, 79)" py={"5px"} dangerouslySetInnerHTML={{ __html:  sitepageContent.fourthTagLine}}>
      
      </Text>
      <br></br>
      <ButtonGroup gap='4' my={"10px"}>
        {sitepageContent?.btns.map((e,index)=>(
    <Button key={index} color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}}><Link onClick={() => router.push(e.btnLink)}>{e.btnName}</Link></Button>
    ))}
    
  </ButtonGroup>
      
    </motion.div>
    
    </motion.div>
    )}
    
  </Box> );
}
const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});

const SiteHero = () => {
  return (
    <ChakraProvider>
      <DynamicThirdPartyComponent></DynamicThirdPartyComponent>
   
    </ChakraProvider>
  );
};

export default SiteHero;