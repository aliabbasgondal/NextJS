"use client";
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    ChakraProvider,
    Box,
    chakra
  } from '@chakra-ui/react';
  
  export default function SiteHero() {
    return (
        <ChakraProvider >
      <Flex
        w={'full'}
        h={{base:"75vh", md:"70vh"}}
        background="#159957"
        bgGradient="linear-gradient(120deg, #155799, #159957)"
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'5xl'} align={'flex-start'} spacing={6} p={5}>
          <Text
              color={'white'}
              fontWeight={1000}
              lineHeight={1.2}
              fontSize={{base:'24px',md:'36px'}}
              align="center"
          >
          Getting Ready for the Next Generation and Future of the Internet - Join a 13 Trillion Dollar Industry with 5 Billion Users
          </Text>
            <Text
              color={'white'}
              fontWeight={{md:1000, base:700}}
              lineHeight={1.2}
              align="center"
              fontSize={{base:'18px',md:'20px'}}
          >
              Certified Web 3.0 and Metaverse Developer: A Nationwide Program in Karachi, Lahore, Islamabad, and Peshawar
            </Text>
            <Stack direction={'row'} w={'100%'} maxW={'5xl'} placeContent="center">
              
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
                Know me more
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }} zIndex={"5"} mt={"-90px"}>
      
      <Text px={{ base: 4, md: 8 } } py={"10px"} align={"justify"}
      
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'#159957'}
      rounded={'lg'}
      boxShadow={'0 0 0 3px rgba(21, 153, 87, 0.6)'}
      >
        <chakra.h1
        textAlign={'center'}
        position={'relative'}
        fontSize={"30px"}
        pb={"40px"}
        fontWeight={"bold"}
                color="#AF172C"
                >
        About Panaverse Web 3.0 Certficate 
      </chakra.h1>
      Presidential Initiative for Artificial Intelligence and Computing (PIAIC) is offering a chance to become a Certified Web 3.0 and Metaverse Developer, through a One and Quarter Years Panaverse DAO Earn as you Learn Program. Get Ready for the Next Generation of the Internet and start learn Web 3.0, Metaverse, Artificial Intelligence (AI), Cloud, Edge, Ambient Computing/IoT, Network Automation, and Bioinformatics Technologies with us.
      </Text>
      
      </Box>
      </ChakraProvider>
    );
  }
  