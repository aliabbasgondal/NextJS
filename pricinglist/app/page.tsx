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



    <Box bg="white">
      <Box bg="rgba(106,70,192,255)">
        <Box  p="60px 0">
          <Heading as="h1" w="100%" fontSize={{ md: "5xl", base: "2xl" }} color="white"><center>Simple pricing for your business</center></Heading>
          <Heading as="h5" w="100%" fontSize={{ md: "2xl", base: "md" }} color="white"><center>Plans that are carefully crafted to suit your business.</center></Heading>
        </Box>
        <Box  alignContent="center" m={{md:"0 auto", base:"0 auto"}} h="150px" justifyContent="center" >
          <Box  w={{md:"75%", base:"95%"}} position="relative" m="0 auto">
          <Stack w={{base:"full", md:"40%"}} float="left" bg='rgba(242,233,252,255)' h="225px" borderRadius={{md:"10px 0px 0px 10px", base:"10px 10px 0px 0px" }} p="25px 0" boxShadow="xl" >
            <Center><Text fontSize='2xl' lineHeight={1} fontWeight="bold">Premium Pro</Text></Center>
            <Center><Text fontSize='6xl' lineHeight={1} fontWeight="bold">$329</Text></Center>
            <Center><Text fontSize='xl' lineHeight={1}>Build Just Once</Text></Center>
            <Center><Button minW="200px" color="rgba(255, 255, 255, 255)" bg="rgba(128,90,212,255)">Get Started</Button></Center>
          </Stack>


          <Stack bg="rgba(255,255,255,255)" color='#262626' h="225px" float="right" borderRadius={{md:"0px 10px 10px 0px", base:"0 0 10px 10px" }} boxShadow="xl"   w={{base:"full", md:"60%"}} p="25px 0 25px 25px">
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
          </Box>
        </Box>
      </Box>
      <Wrap bg="white" w={{md:"75%", base:"95%"}} m="0 auto" p="30px 0" >

        <WrapItem w={{md:'32%', base:"100%"}} m="20px 0 0 0">
          <Icon as={icon1} w="2vh" h="2vh" />
          <Text h={{md:'80px', base:"auto"}} bg='white' p="5px">
            30 days money back guarantee
          </Text>
        </WrapItem>
        <WrapItem w={{md:'32%', base:"100%"}} m="20px 0 0 0">
          <Icon as={icon2} w="2vh" h="2vh" />
          <Text h={{md:'80px', base:"auto"}} bg='white' p="5px">
            No seteup fees 100% hassle-free
          </Text>
        </WrapItem>
        <WrapItem w={{md:'32%', base:"100%"}} m="20px 0 0 0">
          <Icon as={icon3} w="2vh" h="2vh" />
          <Text h={{md:'80px', base:"auto"}} bg='white' p="5px">
            No monthly subscription pay once and for all
          </Text>
        </WrapItem>
      </Wrap>


    </Box>



  )
}
