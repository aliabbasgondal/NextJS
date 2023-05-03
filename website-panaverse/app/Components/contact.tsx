import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    ChakraProvider,
    Image,
    Link
  } from '@chakra-ui/react';
  import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
  } from 'react-icons/md';
  import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';
  
function ThirdPartyComponent() {
  interface socialIcon{
    name:string,
    url:string
  }
  interface pageContent{
    
    pageTitle:ReactNode,
    tageLine:string,
    phoneNumber:string,
    email:string,
    address:string,
    socialIcons:socialIcon[]
    

  }
  const [sitepageContent, setpageContent] = useState<pageContent>();
  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=contact`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await res.json();
      const Content:pageContent={
        pageTitle:'',
        tageLine:'',
        phoneNumber:'',
        email:'',
        address:'',
        socialIcons:[{name:'',url:""}]
    
      }
      
      const returnedItems=json.items[0].fields;
      Content.pageTitle=documentToReactComponents(returnedItems.title);
      Content.tageLine=returnedItems.tagLine;
      Content.phoneNumber=returnedItems.phoneNumber;
      Content.email=returnedItems.email;
      Content.address=returnedItems.city;
      const count=0;
      Content.socialIcons = returnedItems.socialIcons.map((e: any) => {
        const socialEntry = json.includes.Entry.find((social: any) => e.sys.id === social.sys.id);
        if (socialEntry) {
          return {
            name: socialEntry.fields.socialMediaField,
            url: socialEntry.fields.socialIconsUrl
          };
        }
        return null;
      });


     
     
    


      { setpageContent(Content); }

    }
    getContent();
  }, []);
  return(<WrapItem>
    <Box>
      <Heading color={"#159957"}> {sitepageContent?.pageTitle}</Heading>
      <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
        {sitepageContent?.tageLine}
      </Text>
      <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
        <VStack pl={0} spacing={3} alignItems="flex-start">
          <Button
            size="md"
            height="48px"
            width="200px"
            variant="ghost"
            color="#159957"
            _hover={{   textDecoration: 'none',
            background:"#159957",
              bgGradient:"linear-gradient(120deg, #155799, #159957)",
              color:"#AF172C",}}
            leftIcon={<MdPhone color="#159957" size="20px" ></MdPhone>}>
             {sitepageContent?.phoneNumber}
          </Button>
          <Button
            size="md"
            height="48px"
            width="200px"
            variant="ghost"
            color="#159957"
           _hover={{
              textDecoration: 'none',
              background:"#159957",
                bgGradient:"linear-gradient(120deg, #155799, #159957)",
                color:"#AF172C",
        
                
            }}
            leftIcon={<MdEmail color="#159957" size="20px"></MdEmail>}>
             {sitepageContent?.email}
          </Button>
          <Button
            size="md"
            height="48px"
            width="200px"
            variant="ghost"
            color="#159957"
            _hover={{
              textDecoration: 'none',
              background:"#159957",
                bgGradient:"linear-gradient(120deg, #155799, #159957)",
                color:"#AF172C",
        
                
            }}
            leftIcon={<MdLocationOn color="#159957" size="20px"></MdLocationOn>}>
             {sitepageContent?.address}
          </Button>
        </VStack>
      </Box>
      <HStack
        mt={{ lg: 10, md: 10 }}
        spacing={5}
        px={5}
        alignItems="flex-start">
      {
        sitepageContent?.socialIcons.map((e:any)=>{
          return(
          <Link key={e.name} href={e.url}> 
        <IconButton         color={"#159957"}
          aria-label={e.name}
          variant="ghost"
          size="lg"
          isRound={true}
          _hover={{
              textDecoration: 'none',
              background:"#159957",
                bgGradient:"linear-gradient(120deg, #155799, #159957)",
                color:"#AF172C",
        
                
            }}
          icon={
            e.name == 'Facebook'?
          <MdFacebook size="28px"></MdFacebook>
          :e.name == 'Discord'?
          <BsDiscord size="28px"></BsDiscord>
          :e.name == 'Github'?
          <BsGithub size="28px"></BsGithub>
          :<BsPerson size={0}></BsPerson>
        }
        ></IconButton></Link> 
          );

        })
      }
     
        
      </HStack>
    </Box>
  </WrapItem>);
}

const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});
  export default function Contact() {
    return (
        <ChakraProvider>
            
      <Container  maxW="full" mt={0} centerContent overflow="hidden">
        <Flex>
          <Box
            background= "/bodybg.png"
            
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}>
                <Box p={4}> <motion.div
      initial={{opacity:0, x:-50}}
      animate={{opacity:1,y:5,x:0}}
      
      transition={{duration:1.5}} >
        <Image alt="contact us pakistan map image" src="pakMap.920e8f6a.png"></Image>
      </motion.div>  </Box>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1 }}
      
      >
            <Box p={4}>
          
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <DynamicThirdPartyComponent></DynamicThirdPartyComponent>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <FormControl id="name">
                          <FormLabel>Your Name</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              
                            ><BsPerson color="gray.800"></BsPerson></InputLeftElement>
                            <Input type="text" size="md"></Input>
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Mail</FormLabel>
                          <InputGroup borderColor="#E0E1E7">
                            <InputLeftElement
                              pointerEvents="none"
                              ><MdOutlineEmail color="gray.800"></MdOutlineEmail></InputLeftElement>
                          
                            <Input type="text" size="md"></Input>
                          </InputGroup>
                        </FormControl>
                        <FormControl id="name">
                          <FormLabel>Message</FormLabel>
                          <Textarea
                            borderColor="gray.300"
                            _hover={{
                              borderRadius: 'gray.300',
                            }}
                            placeholder="message"></Textarea>
                          
                        </FormControl>
                        <FormControl id="name" float="right">
                          <Button
                            variant="solid"
                            color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}}>
                            Send Message
                          </Button>
                        </FormControl>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
            </motion.div>
          </Box>
        </Flex>
      </Container>
      </ChakraProvider>
    );
  }
  