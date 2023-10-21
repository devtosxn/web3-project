import React from "react";
import {
  ChakraProvider,
  Box,
  HStack,
  Text,
  Button,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Web3Page from "./pages/Web3";
import { Link } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Box p={6}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/web3" element={<Web3Page />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
