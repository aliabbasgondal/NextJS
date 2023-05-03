"use client";
import React from 'react';
import {
  Box,
  chakra,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Flex,
  Icon,
  useColorModeValue,
  ChakraProvider
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaAddressCard, FaArrowAltCircleDown, FaPlus, FaRegMoneyBillAlt, FaRegNewspaper, FaRoad, FaStickyNote } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
interface admissionSteps {
  title: string,
  categories: string,
  description: string,
  icon?: string,
  date: string
}

function ThirdPartyComponent() {

  const [heading, setHeading] = useState();
  const [siteadmissionSteps, setadmissionSteps] = useState<admissionSteps[]>([]);



  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=admissionProcess`, { cache: 'no-store' });
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
      const uniqueKeys = Array.from(new Set(allKeys));
      function getValuesByKey(items: any[], key: string): any[] {
        return items.map(item => item[key]).filter(value => value !== undefined).reduce((acc, value) => acc.concat(value), []);
      }

      const arrayOFadmissionSteps: admissionSteps[] = [];
      const pageHeading = json.items[0].fields.admissionProcessStepsToBeFollowed;
      setHeading(pageHeading);



      uniqueKeys.map((items: any) => {
        const itemData = getValuesByKey(itemLinks, items);



        items === 'stepTitle' ?
          itemData.map((e, index) => {
            const arrayItem = { title: e, categories: '', description: '', icon: 'FaAddressCard', date: '' }

            arrayOFadmissionSteps.push(arrayItem);
          }) :
          items === 'subTitle' ? itemData.map((e, index) => { arrayOFadmissionSteps[index].categories = e }) :
            items === 'description' ? itemData.map((e, index) => { arrayOFadmissionSteps[index].description = e.content[0].content[0].value }) :
              items === 'icon' ? itemData.map((e, index) => { arrayOFadmissionSteps[index].icon = e.content[0].content[0].value }) :
                null



        

      });
      arrayOFadmissionSteps.sort((a, b) => (a.title > b.title) ? 1 : -1);

      { setadmissionSteps(arrayOFadmissionSteps); }

    }
    getContent();
  }, []);


  return (
    <ChakraProvider>
      <Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
        <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center" color={"#159957"}>
          {heading}
        </chakra.h3>
        {

          siteadmissionSteps.map((milestone, index) => (
            <Flex key={index} mb="10px">
              <LineWithDot />
              <Card {...milestone} />
            </Flex>
          ))}
      </Container>
    </ChakraProvider>


  );



}

const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});
interface CardProps {
  title: string;
  categories: string;
  description: string;
  icon?: string;
  date: string;
}

const Card = ({ title, categories, description, icon, date }: CardProps) => {
  return (
    <HStack
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue('gray.100', 'gray.800')}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: '0',
        h: '0',
        borderColor: `transparent ${useColorModeValue('#edf2f6', '#1a202c')} transparent`,
        borderStyle: 'solid',
        borderWidth: '15px 15px 15px 0',
        position: 'absolute',
        left: '-15px',
        display: 'block'
      }}
    >



      <Box>
        <HStack spacing={2} mb={1}>

          <Text fontSize="sm">
            {title}
          </Text>

        </HStack>
        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1
            as={Link}
            _hover={{ color: 'teal.400' }}
            fontSize="2xl"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"

          >
            {categories}
          </chakra.h1>
          <Text fontSize="md" noOfLines={2}>
            {description}
          </Text>
        </VStack>
        <Text fontSize="sm">{date}</Text>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex pos="relative" alignItems="center" mr="40px">
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          width="100%"
          height="100%"
          bottom="0"
          right="0"
          top="0"
          left="0"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          backgroundColor="#AF172C"
          borderRadius="100px"
          border="3px solid #159957"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};
const Admission = () => {

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, y: 5, x: 0 }}

      transition={{ duration: 1.5 }} >
      <DynamicThirdPartyComponent></DynamicThirdPartyComponent>

    </motion.div>
  );
};


export default Admission;
