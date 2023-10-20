import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Web3Page from "./pages/Web3";

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/web3" element={<Web3Page />}></Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
