import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    ChakraProvider,
    Image,
  } from '@chakra-ui/react';
  
  export default function Login() {
    return (
        <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundImage={"/bodybg.png"}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
          <Stack align={'center'} mb={5}>
          <Image src="/logos/red-p-logo-text_dao_croped.png" alt="panaverse logo" w={"auto"}  h="60px"></Image>
            <Heading fontSize={'4xl'}>Sign in</Heading>
            
          </Stack>
          
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link href='/ForgetPassword' color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}}>Forgot password?</Link>
                </Stack>
                <Button
                 color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}} >
                  Sign in
                </Button>
                
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </ChakraProvider>
    );
  }
  