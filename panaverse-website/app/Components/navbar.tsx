"use client";
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  ChakraProvider,
  Image,
  Icon
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { isWhiteSpaceLike } from 'typescript';

const Links = ['Home', 'Course Content', 'Admission', 'Team', 'Contact US'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color="#AF172C"
    _hover={{
      textDecoration: 'none',
      background:"#159957",
        bgGradient:"linear-gradient(120deg, #155799, #159957)",
        color:"white",
    }}
    href={children === 'Home'? '/':`/${children}`}>
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Box   px={4} zIndex={10} position="fixed" w="100%" backdropFilter="saturate(180%) blur(5px)">
        <Flex h={16} alignItems={'center'} justifyContent={'center'}>
         
          <HStack spacing={8}>
            <Box>
              
              <Link href="/"><Image src="/logos/red-p-logo-white.png"  h="60px"></Image></Link></Box>
            <HStack
              as={'nav'}
              spacing={4}
              
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            <Link _hover={{
      textDecoration: 'none',
      background:"#159957",
        bgGradient:"linear-gradient(120deg, #155799, #159957)",
        color:"white",
    }}  px={2}
    py={1}
    rounded={'md'} color="#AF172C"  alignContent="center" href="https://www.facebook.com/groups/panaverse">
      
      <Icon h="30px" w="30px" as={FaFacebook} /></Link>
            <Link _hover={{
      textDecoration: 'none',
      background:"#159957",
        bgGradient:"linear-gradient(120deg, #155799, #159957)",
        color:"white",
    }}  px={2}
    py={1}
    rounded={'md'} color="#AF172C"   alignContent="center"  href="https://twitter.com/Panaverse_edu">
      
      <Icon h="30px" w="30px" as={FaTwitter} /></Link>
            </HStack>
          </HStack>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <Link _hover={{
      textDecoration: 'none',
      background:"#159957",
        bgGradient:"linear-gradient(120deg, #155799, #159957)",
        color:"white",
    }}  px={2}
    py={1}
    rounded={'md'}  alignContent="center" color="#AF172C"  href="https://www.facebook.com/groups/panaverse">
      <Icon  h="30px" w="30px" as={FaFacebook} /></Link>
            <Link _hover={{
      textDecoration: 'none',
      background:"#159957",
        bgGradient:"linear-gradient(120deg, #155799, #159957)",
        color:"white",
    }}  px={2}
    py={1}
    rounded={'md'} alignContent="center" color="#AF172C" href="https://twitter.com/Panaverse_edu">
      <Icon  h="30px" w="30px" as={FaTwitter} />
      </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>

      
    </ChakraProvider>
  );
}
