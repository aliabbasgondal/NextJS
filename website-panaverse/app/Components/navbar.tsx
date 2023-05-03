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
  Icon,
  Slide
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaFacebook, FaTwitter, FaYoutube, FaGithub, FaDiscord } from 'react-icons/fa';
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
interface socialMediaLinks {
  name: string;
  url: string;

}

function ThirdPartyComponent() {
  const [links, setLinks] = useState<string[]>([]);
  const [siteLogo, setLogo] = useState();
  const [siteSocialIcons, setsiteSocialIcons] = useState<socialMediaLinks[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=siteHome`, { cache: 'no-store' });
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

      const arrayOFsocialMediaLinks: socialMediaLinks[] = [];
      const logoHeader = json.includes.Asset[0].fields.file.url;
      setLogo(logoHeader);
      const headerMenu: string[] = [];


      uniqueKeys.map((items: any) => {
        const itemData = getValuesByKey(itemLinks, items);
        if (items === 'socialIconsUrl') {

          itemData.map((e, index) => { const newObj = { url: e, name: "" }; arrayOFsocialMediaLinks.push(newObj); });
        } else if (items === 'socialMediaField') {
          itemData.map((e, index) => { arrayOFsocialMediaLinks[index].name = e; });
          
        }
        else if (items === 'menuItems') {
          itemData.map((e: any) => { headerMenu.push(e.toString()); });
        }

      });

      setsiteSocialIcons(arrayOFsocialMediaLinks);
      setLinks(headerMenu.reverse());

    }
    getContent();
  }, []);
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 0 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollPosition === 0 && isScrolled) {
      setIsScrolled(false);
    }
  }, [scrollPosition, isScrolled]);
  return (
    <Flex px={10} zIndex={14} position="fixed" justifyContent={"space-between"} w="100%"
      bg={`rgba(256, 256, 256, ${isScrolled ? "0.8" : "0"})`}

      transition="background-color 0.2s ease-out"
      backdrop-filter={"saturate(180%) blur(20px)"}>
      <Box zIndex={"12"} h={16} alignItems={'center'} justifyContent={'left'} minWidth="max-content">

        <Link  onClick={() => router.push('/')}><Image src={siteLogo} alt="panaverse logo" h="60px"></Image></Link></Box>

      <Box h={16} alignItems={'center'} justifyContent={'right'} minWidth="max-content">

        <HStack h={16} spacing={8}>

          <HStack
            as={'nav'}
            spacing={4}

            display={{ base: 'none', md: 'flex' }}>
            {links.map((link, index) => (
               <Button key={index}
               px={2}
               py={1}
               rounded={'md'}
               color="rgb(33, 37, 41)"
               fontWeight={"bold"}
               _hover={{
                 textDecoration: 'none',
                 background: "#159957",
                 bgGradient: "linear-gradient(120deg, #155799, #159957)",
                 color: "#AF172C",
           
               }} bg={'transparent'}
                onClick={() => router.push(link === 'Home' ? '/' :`/${link}`)}
               >
               {link}
             </Button>
            ))}
            {siteSocialIcons.map((e, index) => (
              <Link key={index} _hover={{
                textDecoration: 'none',
                background: "#159957",
                bgGradient: "linear-gradient(120deg, #155799, #159957)",
                color: "#AF172C",


              }} px={2}
                py={1}
                rounded={'md'} fontWeight={"bold"} color="#AF172C" alignContent="center" href={e.url}>
                {e.name === 'Facbeook'
                  ? <Icon h="30px" w="30px" as={FaFacebook} />
                  : e.name === 'Twitter'
                    ? <Icon h="30px" w="30px" as={FaTwitter} />
                    : e.name === 'Youtube'
                      ? <Icon h="30px" w="30px" as={FaYoutube} />
                      : e.name === 'Discord'
                        ? <Icon h="30px" w="30px" as={FaDiscord} />
                        : e.name === 'Github'
                          ? <Icon h="30px" w="30px" as={FaGithub} />
                          : null
                }



              </Link>
            ))}
          </HStack>

          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            bg={isOpen ? "white" : ""}
            onClick={isOpen ? onClose : onOpen}
            zIndex={"12"}
          />
        </HStack>
      </Box>

      {isOpen ? (
        <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
          <Box p="70px" bg="white" rounded="md" shadow="md">
            <Stack as={'nav'} spacing={4}>
              {links.map((link, index) => (
                <Button key={index}
                px={2}
                py={1}
                rounded={'md'}
                color="rgb(33, 37, 41)"
                fontWeight={"bold"} bg={"transparent"}
                _hover={{
                  textDecoration: 'none',
                  background: "#159957",
                  bgGradient: "linear-gradient(120deg, #155799, #159957)",
                  color: "#AF172C",
            
                }}
                 onClick={() => router.push(link === 'Home' ? '/' :`/${link}`)}
                >
                {link}
              </Button>
              ))}
              <Box justifyItems={"center"} alignContent={"center"}>
                {siteSocialIcons.map((e, index) => (
                  <Link key={index} _hover={{
                    textDecoration: 'none',
                    background: "#159957",
                    bgGradient: "linear-gradient(120deg, #155799, #159957)",
                    color: "#AF172C",


                  }} px={2}
                    py={1}
                    rounded={'md'} fontWeight={"bold"} color="#AF172C" alignContent="center" href={e.url}>
                    {e.name === 'Facbeook'
                      ? <Icon h="30px" w="30px" as={FaFacebook} />
                      : e.name === 'Twitter'
                        ? <Icon h="30px" w="30px" as={FaTwitter} />
                        : e.name === 'Youtube'
                          ? <Icon h="30px" w="30px" as={FaYoutube} />
                          : e.name === 'Discord'
                            ? <Icon h="30px" w="30px" as={FaDiscord} />
                            : e.name === 'Github'
                              ? <Icon h="30px" w="30px" as={FaGithub} />
                              : null
                    }



                  </Link>
                ))}
              </Box>
            </Stack>
          </Box></Slide>
      ) : null}
    </Flex>

  );
}

const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});




export default function NavBar() {




  return (
    <ChakraProvider>
      <DynamicThirdPartyComponent />


    </ChakraProvider>
  );
}
