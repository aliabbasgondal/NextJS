import { Button, Card, CardBody, CardFooter, CardHeader, ChakraProvider, Heading, SimpleGrid, Flex, Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

export default function DashboardHome() {
    return (
        <ChakraProvider>
            <Box w={"100%"} justifyContent={"left"} alignItems={"center"}>
            <SimpleGrid spacing={4} columns={{lg:4, md:2, sm:1}}>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                        <Button>View here</Button>
                    </CardFooter>
                </Card>
            </SimpleGrid>
            </Box>
        </ChakraProvider>
    );
}