"use client";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    ChakraProvider,
    Image,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
        <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundImage={"/bodybg.png"}>
        <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
          <Stack align={'center'}>
          <Image src="/logos/red-p-logo-text_dao_croped.png" alt="panaverse logo" w={"auto"}  h="60px"></Image>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            
          </Stack>
          
              
                  <FormControl id="firstName" isRequired>
                    <FormLabel>CNIC</FormLabel>
                    <Input type="text" />
                  </FormControl>
              
                  
                
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}} href='/login'>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </ChakraProvider>
    );
  }
  