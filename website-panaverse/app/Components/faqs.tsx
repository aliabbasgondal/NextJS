import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, ChakraProvider, Grid, GridItem, AccordionIcon, Box, Heading } from '@chakra-ui/react';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";


const Faqs = () => {
  
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  interface faqs {
    question: string;
    answer: string;
   
  }

  const [siteContent, setContent] = useState<faqs[]>([]);
  const [heading, setHeading] = useState();
  const [pageDescription, setPageDescription] = useState<ReactNode>();
  useEffect(() => {
    async function getImages() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=faqs`, { cache: 'no-store' });

      // Recommendation: handle errors
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      const arrayOfProfile: faqs[]=[];
      setHeading(data.items[0].fields.heading1);
      setPageDescription(documentToHtmlString(data.items[0].fields.heading2));
      data.items[0].fields.faqs.map((team: any) => {
        data.includes.Entry.map((item:any)=>{
         
         
         if(team.sys.id === item.sys.id)
         {
         
          
          const faqsItems = {question: item.fields.header
            , answer:documentToHtmlString(item.fields.content)}
            arrayOfProfile.push(faqsItems);

         }
        });
        
      });


      

      setContent(arrayOfProfile);
    }

    getImages();
  }, []);

  const toggleAccordionItem = (index: number) => {
    
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };
  const midIndex = Math.ceil(siteContent.length / 2);
  const leftColumnData = siteContent.slice(0, midIndex);
  const rightColumnData = siteContent.slice(midIndex);
  return (
    <ChakraProvider>
        <Box gap={4} maxW={'3xl'} justifySelf={"center"} m={"0 auto"} py={"10px"}>
        <Heading w={"full"} as="h1" size="xl" color="#159957" textAlign={"center"} py={"5px"}>
          {heading}
        </Heading>
        <Heading w={"full"} as="h4" size="md"  textAlign={"center"} py={"5px"}>
        {pageDescription}
        </Heading>
        </Box>
        <Grid  templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW={'7xl'} justifySelf={"center"} m={"0 auto"}>
      <GridItem>
    <Accordion allowToggle>
      {leftColumnData.map((faq, index) => (
        <motion.div key={index} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <AccordionItem>
            <AccordionButton h={"50px"} onClick={() => toggleAccordionItem(index)}>
            <Box as="span" flex='1' textAlign='left' color={"#159957"} fontSize="lg">
              {faq.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel fontSize="md" background={"#fff"} dangerouslySetInnerHTML={{ __html: faq.answer}}></AccordionPanel>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
    </GridItem>
    <GridItem>
    <Accordion allowToggle>
      {rightColumnData.map((faq, index) => (
        <motion.div key={index} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <AccordionItem>
            <AccordionButton h={"50px"} onClick={() => toggleAccordionItem(index)}>
            <Box as="span" flex='1' textAlign='left' color={"#159957"} fontSize="lg">
              {faq.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel fontSize="md" background={"#fff"}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
    </GridItem>
    </Grid>
    </ChakraProvider>
  );
};

export default Faqs;
