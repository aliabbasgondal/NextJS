"use client";
import Image from 'next/image'
import { Content, Inter } from '@next/font/google'
import { Heading, Stack, Center, Text, Box, useColorMode, useColorModeValue, Flex, Button, List, ListItem, Wrap, WrapItem } from '@chakra-ui/react'
import { CheckCircleIcon, Icon } from '@chakra-ui/icons';
import icon1 from './icons/icon1';
import icon2 from './icons/icon2';
import icon3 from './icons/icons3';
function changeIcon() {

}
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { toggleColorMode, colorMode } = useColorMode();
  const useBackgrounColor = useColorModeValue("gray.100", "gray.700");

  return (

    <Box as="div" background={useBackgrounColor}>

      <Box bg="white" alignItems="center" justifyContent="center" minH={{md:"100vh", base:"auto"}} w="full">
        <Box bg="rgba(106,70,192,255)" paddingTop={{md:"5vh", base:"auto"}} alignContent="center" textAlign="center" h={{md:"55vh", base:"auto" }}>
          <Heading as="h1" fontSize="5xl" color="white">Simple pricing for your business</Heading>
          <Heading as="h5" fontSize="2xl" color="white">Plans that are carefully crafted to suit your business.</Heading>
          <Box bg="white" alignContent="center" m={{md:"5vh auto", base:"0 auto"}} borderRadius={20} boxShadow="xl" justifyContent="center" h={{md:"50vh",base:"auto"}} w={{md:"150vh",base:"auto"}}>
            <Flex w='40%' float="left" h="50vh" borderRadius="10px 0 0 10px" display="inline-block" bg='rgba(242,233,252,255)' color='#262626'>
              <Stack spacing={3} h="50vh" justifyContent="center">
                <Center><Text fontSize='2xl' lineHeight={1} fontWeight="bold">Premium Pro</Text></Center>
                <Center><Text fontSize='6xl' lineHeight={1} fontWeight="bold">$329</Text></Center>
                <Center><Text fontSize='xl' lineHeight={1}>Build Just Once</Text></Center>
                <Center><Button w="50vh" bg="rgba(128,90,212,255)" m="0 auto" color="white">Get Started</Button></Center>
              </Stack>
            </Flex>
            <Flex w='60%' h="50vh" borderRadius="0 10px 10px 0" float="right" display="inline-block" bg='rgba(255,255,255,255)' color='#262626'>
              <Stack spacing={3} h="50vh" justifyContent="center" padding={10}>
                <Text fontSize='md' lineHeight={1} textAlign="left">Access these features when you get this pricing package for your business.</Text>
                <List spacing={3}>
                  <ListItem textAlign="left" >
                    <CheckCircleIcon color='rgba(106,70,192,255)' mr={2} />
                    International Cailing and messaging API
                  </ListItem>
                  <ListItem textAlign="left"  >
                    <CheckCircleIcon color='rgba(106,70,192,255)' mr={2} />
                    Additional phone numbers
                  </ListItem>
                  <ListItem textAlign="left"  >
                    <CheckCircleIcon color='rgba(106,70,192,255)' mr={2} />
                    Automated messages via Zapier
                  </ListItem>

                  <ListItem textAlign="left"  >
                    <CheckCircleIcon color='rgba(106,70,192,255)' mr={2} />
                    24/7 support and consulting
                  </ListItem>
                </List>


              </Stack>
            </Flex>
          </Box>
        </Box>
        <Wrap bg="white" alignContent="center" m="30vh auto" position="inherit" justifyContent="center" h="50vh" w="150vh">

          <WrapItem w='48vh'>
            <Icon as={icon1} w="2vh" h="2vh" />
            <Text  h='80px' bg='white' pl={5}>
             30 days money back guarantee
            </Text>
          </WrapItem>
          <WrapItem w='48vh'>
          <Icon as={icon2} w="2vh" h="2vh" />
            <Text  h='80px' bg='white' pl={5}>
             No seteup fees 100% hassle-free
            </Text>
          </WrapItem>
          <WrapItem w='48vh'>
          <Icon as={icon3} w="2vh" h="2vh" />
            <Text  h='80px' bg='white' pl={5}>
              No monthly subscription pay once and for all
            </Text>
          </WrapItem>
        </Wrap>


      </Box>

    </Box>

  )
}
