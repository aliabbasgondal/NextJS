"use client";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, ChakraProvider, Heading, Highlight, Stack } from '@chakra-ui/react';
import { ReactNode , useEffect, useState,ReactDOM, Fragment} from 'react';
import { Chrono } from 'react-chrono';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';


function ThirdPartyComponent() {
  interface pageItems{
    title:string,
    cardTitle:string,
    cardSubtitle:string,
    cardDetailedText:string
  }
  const [pageItem, setpageContent] = useState<pageItems[]>([]);
  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=courseContent`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await res.json();
      const parser = new DOMParser();
      const arryofPageItems: pageItems[] = json.items.map((item: any) => {
        return {
          title: item.fields.title,
          cardTitle: item.fields.shortTitle,
          cardSubtitle: item.fields.longTitle,
          cardDetailedText: item.fields.description.content
          .map((ContentData: any) =>
            ContentData.content
              .map((innerContent: any) => {return documentToHtmlString(innerContent)} )

              .join('')
          )
        .join(''),

        };
      });
     


    
     
      arryofPageItems.sort((a, b) => (a.title > b.title) ? 1 : -1);


      { setpageContent(arryofPageItems); }
      

    }
    getContent();
  }, []);
  return(  
    
    
    
    <Center w={"100%"} alignContent={"center"} h={"auto"} mt={"75px"}>
      <Accordion w={"90%"} defaultIndex={[0]} allowMultiple>
      <Fragment>
      { pageItem.map((item, index) => (
        <AccordionItem key={index}>
          <h2
                
>
            <AccordionButton bg= "#159957"
                bgGradient= "linear-gradient(120deg, #155799, #159957)"
                color= "#AF172C">
              <Box as="span" flex='1' textAlign='left' fontSize={"16px"} fontWeight="bold">
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          <Heading size='lg' fontSize='20px'>
            {item.cardTitle}
            </Heading>
            <Heading size='lg' fontSize='18px'>
            {item.cardSubtitle}
            </Heading>
            <div dangerouslySetInnerHTML={{ __html:  item.cardDetailedText}}>
            
          
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Fragment>

  
</Accordion>
</Center>
   
  );
}

const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});


export default function CourseContent() {
  function useColorModeValue(arg0: string, arg1: string): string | undefined {
    throw new Error('Function not implemented.');
  }

  // Settings for the slider


  return (
  
       
       <ChakraProvider>
       
     
        <DynamicThirdPartyComponent></DynamicThirdPartyComponent>
        
      </ChakraProvider>
   
  );
}



