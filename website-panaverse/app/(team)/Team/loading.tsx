"use client";

import { Spinner } from "@chakra-ui/react";
export default function loading(){

    return(
        <div style={{ position: "relative", height: "100vh" }}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#AF172C"
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </div>
    );
  }