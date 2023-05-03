
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Link,
    ChakraProvider,
  } from '@chakra-ui/react';
import { url } from 'inspector';
  
  type ForgotPasswordFormInputs = {
    email: string;
  };
  
  export default function Forgotpassword(): JSX.Element {
    
    return (
      <ChakraProvider>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        backgroundImage={"/bodybg.png"}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
            color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}} >
              Request Reset
            </Button>
          </Stack>
          <Stack pt={6}>
                <Text align={'center'}>
                  Go Back and <Link color={"#fff"} background={"#159957"} bgGradient={"linear-gradient(120deg, #155799, #159957)"} _hover={{color:"#AF172C"}} href='/Login'>Login</Link>
                </Text>
              </Stack>
        </Stack>
      </Flex>
      </ChakraProvider>
    );
  }
  