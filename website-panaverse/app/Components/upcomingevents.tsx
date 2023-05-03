import React, { useState } from "react";
import Calendar from "react-calendar";
import { Box, ChakraProvider, Flex, HStack, SimpleGrid, Stack } from "@chakra-ui/react";

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState("");
  const events = [
    {
      title: "Event 1",
      date: new Date("2023-04-12"),
      id: "event1",
      description: "Description of event 1",
    },
    {
        title: "Event 2",
        date: new Date("2023-04-12"),
        id: "event2",
        description: "Description of event 2",
      },
    {
      title: "Event 2",
      date: new Date("2023-04-20"),
      id: "event2",
      description: "Description of event 2",
    },
  ];
  const handleDateChange = (date:any) => {
    setDate(date);
  };
  const tileContent = ({ date }: { date: Date }) => {
    const eventsOnDate = events.filter((e) => e.date.toDateString() === date.toDateString());
    if (eventsOnDate.length > 0) {
      return (
        <>
          {eventsOnDate.map((event) => (
            <Box
              key={event.id}
              onMouseEnter={() => handleMouseEnter(event.id, event.description)}
              onMouseLeave={() => handleMouseLeave(event.id)}
              textAlign="center"
              
              
             fontSize={"small"}
              h={{ base: "20px", md: "30px" }}
              w={"100%"}
              position={"relative"}
              right={0}
              top={0}
              lineHeight={{ base: "20px", md: "30px" }}
              alignItems={"center"}
              color={"#d10000"}
              fontWeight="bold"
              mt={2}
            >
              {event.title}
            </Box>
          ))}
        </>
      );
    }
  };
  

  const handleMouseEnter = (id: string, description: string) => {
    const element = document.getElementById(id);
    if (element) {
      setEventDetails(description);
      element.style.display = "block";
    }
  };

  const handleMouseLeave = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setEventDetails("");
      element.style.display = "none";
    }
  };

  return (
    <>
    <ChakraProvider>
    <Stack direction={['column', 'row']} alignItems='center' gap='2'> 
      <Box p={4} w={{base:"100%",md:"70%"}}>
        <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
      </Box>

      <Box  p={4} bg={"orange"} w={{base:"100%",md:"30%"}}>
      
        {events.map((e) => (
          <Box key={e.id} id={e.id} style={{ display: "none" }}>
            {e.description}
          </Box>
        ))}
      </Box>
      </Stack>
      </ChakraProvider>
    </>
  );
};

export default EventCalendar;
