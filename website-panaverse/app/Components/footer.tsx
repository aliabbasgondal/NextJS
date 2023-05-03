"use client"
import {
  Box,
  chakra,
  ChakraProvider,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
  Icon,
} from '@chakra-ui/react';
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { ReactNode } from 'react';
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
interface socialMediaLinks {
  name: string;
  url: string;

}
function ThirdPartyComponent() {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([]);
  const [siteLogo, setLogo] = useState();
  const [footerCopyright, setCopyritgt] = useState();
  const [siteSocialIcons, setsiteSocialIcons] = useState<socialMediaLinks[]>([]);

  

  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=footer`, { cache: 'no-store' });
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
      const logoFooter = json.includes.Asset[0].fields.file.url;
      setLogo(logoFooter);
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
      
      setCopyritgt(json.items[0].fields.tagLine);
      setsiteSocialIcons(arrayOFsocialMediaLinks);
      setLinks(headerMenu.reverse());

    }
    getContent();
  }, []);
    

  return (
    <Box
  
      
      color={useColorModeValue('gray.700', 'gray.200')}>
<Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        
        <Image src={siteLogo} alt="panaverse logo"  h="60px"></Image>
        <Stack direction={'row'} spacing={6}>
        {links.map((link, key) => (
                
                <Link key={key} color="#AF172C" onClick={() => router.push(link === 'Home' ? '/' :`/${link}`)}>{link}</Link>
              ))}
       
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('green.200', 'green.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>{footerCopyright}</Text>
          <Stack direction={'row'} spacing={6}>
          {siteSocialIcons.map((e, index) => (
           <Link key={index} _hover={{
            textDecoration: 'none',
            background: "#159957",
            bgGradient: "linear-gradient(120deg, #155799, #159957)",
            color: "#AF172C"


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
          </Stack>
        </Container>
      </Box>
      </Box>
  );
}

const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});





const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
  <ChakraProvider>
    
      <DynamicThirdPartyComponent />
    
    </ChakraProvider>
  );
}
