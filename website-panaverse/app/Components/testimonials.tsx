import { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  ChakraProvider,
  Center,
  Icon,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import dynamic from 'next/dynamic';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src}  mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};
interface testimonialList{
    
        name:string,
        batch:string,
        headNote:string,
        message:ReactNode,
        pic:string
    
    
}
function ThirdPartyComponent() {

  const [heading, setHeading] = useState();
  const [pageDescription, setPageDescription] = useState<ReactNode>();
  const [sitetestimonials, settestimonials] = useState<testimonialList[]>([]);
  const colorMode=useColorModeValue('white', 'gray.900');
  const colorModeGray=useColorModeValue('gray.700', 'gray.400');


  useEffect(() => {
    async function getContent() {
      const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_KEY}&content_type=testimonial`, { cache: 'no-store' });
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
      const uniqueKey = Array.from(new Set(allKeys));
      
    
      
      
       setHeading(json.items[0].fields.heading);
      setPageDescription(documentToHtmlString(json.items[0].fields.subHeading));
      var count =0;
      const arrayOfProfile: testimonialList[]=[];
      
      json.items[0].fields.siteTestimonial.map((testimonialItem: any) => {
        json.includes.Entry.map((item:any)=>{
         
         
         if(testimonialItem.sys.id === item.sys.id)
         {
         
          
          const profileItem = {name:'',
            batch:'',
            headNote:'',
            message:'',
            pic:''}
            arrayOfProfile.push(profileItem);
         uniqueKey.map((items: any) => {
         
          const itemData = item.fields[items];
          
                 if(typeof(itemData) === 'object' && itemData.nodeType ==='document')
                 {
                  
                  arrayOfProfile[count].message= documentToReactComponents(itemData); 
                  
                 }
                else if(typeof(itemData) ==='object' && itemData.sys.linkType ==='Asset')
                 {
       
                   json.includes.Asset.map((picID:any)=>{
                       picID.sys.id===itemData.sys.id? (arrayOfProfile[count].pic= picID.fields.file.url, arrayOfProfile[count].name= picID.fields.title, arrayOfProfile[count].batch= picID.fields.description)  : ""
                   })
                 } else if(items =='header'){arrayOfProfile[count].headNote=itemData;
                  }
                 else{
                   null;
                 }
                 
               });
               
               count = count + 1;
             }else{null;}
        }); 

}); 
arrayOfProfile.sort((a, b) => (a.name < b.name) ? 1 : -1);

      { settestimonials(arrayOfProfile); }

    }
    getContent();
  }, []);
  return(
    <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading color={"#159957"}>{heading}</Heading>
          <Text>{pageDescription}</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
            {sitetestimonials.map((st,key)=>(
                  <motion.div key={key} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>{st.headNote}</TestimonialHeading>
              <TestimonialText>
              {st.message}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
               st.pic 
              }
              name={st.name}
              title={st.batch}
            />
          </Testimonial>
          </motion.div>
          ))
          }
         
        </Stack>
      </Container>
  );
}


const DynamicThirdPartyComponent = dynamic(() => Promise.resolve(ThirdPartyComponent), {
  ssr: false
});

export default function StudentsTestimonial() {
  return (
    <ChakraProvider>
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
    <DynamicThirdPartyComponent></DynamicThirdPartyComponent>
      
    </Box>
    </ChakraProvider>
  );
}
