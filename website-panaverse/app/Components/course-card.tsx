import { SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, ChakraProvider, OrderedList, ListItem } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const items = ["Karachi", "Lahore", "Islamabad", "Peshawar"];
import { Fragment, ReactNode, useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
interface mycontent {
  heading: string;
  content: string;
  links: {
    name: string;
    url: string;
  };
}

function ThirdPartyComponent() {
  const [sitepageContent, setpageContent] = useState<mycontent[]>([]);
  
  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=homeHowItWorks`, { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const json = await res.json();
      const itemArray: mycontent[] = [];

      json.items[0].fields.howItWorksContent.forEach((e: any) => {
        const entry = json.includes.Entry.find((entry: any) => e.sys.id === entry.sys.id);
        
        if (entry.fields instanceof Object) {
          let arrayItem: mycontent = {
            heading: "",
            content: "",
            links: { name: "", url: "" }
          };

          Object.keys(entry.fields).forEach(async (itemByKey: any) => {
            if (itemByKey === 'content') {
              arrayItem.content = documentToHtmlString(entry.fields[itemByKey]);
            } else if (itemByKey === 'sectionButton') {
              const resLinks = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries/${entry.fields[itemByKey][0].sys.id}?access_token=${process.env.CONTENTFUL_ACCESS_KEY}`, { cache: 'no-store' });
              if (!resLinks.ok) {
                throw new Error('Failed to fetch data');
              }
              const resJson = await resLinks.json();
              arrayItem.links.name = resJson.fields.button;
              arrayItem.links.url = resJson.fields.buttonlink;
            } else if (itemByKey === 'header') {
              arrayItem.heading = entry.fields[itemByKey];
            }
          });
          
          itemArray.push(arrayItem);
        }
      });

      setpageContent(itemArray);
    }
    
    getContent();
  }, []);
  return(
    <SimpleGrid spacing={4} templateColumns={'repeat(auto-fill, minmax(250px, 1fr))' }
    background={"whiteAlpha.700"} maxW={"1000px"} px={5} py={{ base: 10, md: 8 }} m={"0 auto"} 
    alignSelf={"center"}
    justifyContent="space-around"
    alignItems={"center"}
    
    rounded={"lg"}
    boxShadow={"#159957 lg"}
    >
    {sitepageContent.map((siteItem:any,index) => (
      <motion.div key={index} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>  
        <Card>
          <CardHeader>
            <Heading size={"md"} color={"#159957"}>{siteItem.heading}</Heading>
          </CardHeader>
          <CardBody>
            <Text dangerouslySetInnerHTML={{ __html: siteItem.content}}></Text>
          </CardBody>
          <CardFooter justifyContent={"right"}>
            {siteItem.length == 3 ?
              <Link href={siteItem.links.url}>
                <Button color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}}>
                  {siteItem.links.name}
                </Button>
              </Link>
              : ""
            }
          </CardFooter>
        </Card>
        </motion.div>
    ))}
  
  
</SimpleGrid>

  );
}

const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});


export default function HowItWorks() {
  return (
    <ChakraProvider>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      
      >
   
      
      <DynamicThirdPartyComponent></DynamicThirdPartyComponent>
  
  

</motion.div>
</ChakraProvider>
  );
}
function traverseNodes(content: any): any {
  throw new Error("Function not implemented.");
}

