"use client";
import {
    Button,
    ChakraProvider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
import Link from 'next/link';
  
  export default function Advantages() {
    return (
        <ChakraProvider>
      <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                color="#AF172C"
                _after={{
                  content: "''",
                  width: 'full',
                  height: { base: '20%', md: '30%' },
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  background:"#159957",
        bgGradient:"linear-gradient(120deg, #155799, #159957)",
                 
                  zIndex: -1,
                }}>
                The Outcome for Participants of the Program
              </Text>
              <br />{' '}
              <Text color="#AF172C" as={'span'}>
                $
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'} align="justify">
            The graduates of this program will own products (Full-Stack App Templates, AR and VR Experiences, and APIs) that are marketed globally by the Panaverse DAO and, if they like, will also be able to start off by offering services at a rate of $50 per hour ($96,000 per year). This would give Pakistani professionals and students a fantastic opportunity to better their financial situation while also giving the economy a much-needed boost by expanding software exports.

            </Text>
            
          </Stack>
        </Flex>
        <Flex flex={1} p={8}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              '/icons/web3.0.jpg'
            }
          />
        </Flex>
      </Stack>
      </ChakraProvider>
    );
  }
  