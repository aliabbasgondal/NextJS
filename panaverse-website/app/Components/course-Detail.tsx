"use client";
import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    chakra,
    Grid,
    GridItem,
    Container,
    ChakraProvider,
  } from '@chakra-ui/react';
  import {} from '@chakra-ui/react';
  
  interface FeatureProps {
    heading: string;
    text: string;
  }
  
  const Feature = ({ heading, text }: FeatureProps) => {
    return (
        
      <GridItem>
        <chakra.h3 fontSize="xl" fontWeight="600">
          {heading}
        </chakra.h3>
        <chakra.p>{text}</chakra.p>
      </GridItem>
    );
  };
  
  export default function CourseDetails() {
    return (
        <>
        <ChakraProvider>
      <Box as={Container} maxW="7xl" mt={14} p={8}>
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={4}>
          <GridItem>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="3xl" fontWeight="700">
              Program of Studies
              </chakra.h2>
              <Button colorScheme="green" size="md">
                Call To Action
              </Button>
              <chakra.p>
              Core Courses (Common in All Specializations):
Every participant of the program will start by completing the following three core courses:

              </chakra.p>
              
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <chakra.p textAlign="justify">
              This curriculum is intended for beginners who want to learn software development from the ground up. The first three quarters are shared by all specialties and are dedicated to studying Object-Oriented Programming and cutting-edge Full-Stack Web 2.0 development. It is going to be a fifteen-month-long hybrid program that includes both onsite and online classes and is divided into five quarters of 13 weeks each. The emphasis will be on hands-on learning by educating students to produce projects. To accommodate everyone, courses will be held primarily on weekends or after 6:00 p.m. (Pakistan Time) on weekdays. It employs a hybrid teaching format, with core onsite classes complemented by online Zoom laboratories and recorded videos.

              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ base: '8', sm: '12', md: '16' }}>
          <Feature
            heading={'Quarter I (Core)'}
            text={'CS-101: Object-Oriented Programming using TypeScript'}
          />
          <Feature
            heading={'Quarter II (Core)'}
            text={'W2-201: Developing Planet-Scale Web 2.0 Serverless Cloud Cloud Apps and APIs using Next.js 13 and Cloud Development Kit (CDK) for Terraform'}
          />
          <Feature
            heading={'Quarter III (Core)'}
            text={'$-101: Dollar Making Bootcamp - Full-Stack Template and API Product Development'}
          />
          <Feature
            heading={'Specialized Tracks'}
            text={'After completing the first three quarters the participants will select one or more specializations consisting of two courses'}
          />
        </Grid>
      </Box>
      </ChakraProvider>
      </>
    );
  }
  