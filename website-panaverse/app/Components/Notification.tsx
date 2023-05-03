import { AlertDescription, AlertIcon, AlertTitle, Box, ChakraProvider, Alert } from "@chakra-ui/react";

export default function Notfications(){
    return(
<ChakraProvider>
        <Alert status='success' m={"5"} w={"90%"}>
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
        </Box>
        
      </Alert>
      <Alert status='success' m={"5"} w={"90%"}>
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
        </Box>
        
      </Alert>
      <Alert status='success' m={"5"} w={"90%"}>
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
        </Box>
        
      </Alert>
      <Alert status='success' m={"5"} w={"90%"}>
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
        </Box>
        
      </Alert>
      </ChakraProvider>
    );
}