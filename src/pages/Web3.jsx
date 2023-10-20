import React, { useState, useEffect } from "react";
import { Button, Center, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // If you're using React Router.

const Web3Page = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);

  // Check if Metamask is installed
  const isMetamaskInstalled = async () => {
    if (window.ethereum) {
      // Metamask is installed
      return true;
    } else {
      // Metamask is not installed
      return false;
    }
  };

  // Function to connect Metamask wallet
  const connectMetamask = async () => {
    if (await isMetamaskInstalled()) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnected(true);
      } catch (error) {
        console.error("Error connecting Metamask:", error);
      }
    } else {
      // Redirect to the page where they can install Metamask
      window.location.href = "https://metamask.io/";
    }
  };

  // Fetch and display deposits (dummy data for now)
  useEffect(() => {
    // Fetch deposit data from a contract via websockets and update 'deposits'.
    // For now, use dummy data.
    const dummyDeposits = [
      { fromAddress: "0xAddress1", timestamp: "Timestamp1", image: "image1" },
      { fromAddress: "0xAddress2", timestamp: "Timestamp2", image: "image2" },
      // Add more deposit data as needed.
    ];
    setDeposits(dummyDeposits);

    // Fetch address and balance (assuming it's in ether)
    if (window.ethereum) {
      const accounts = window.ethereum.selectedAddress;
      setAddress(accounts);
      window.ethereum
        .request({ method: "eth_getBalance", params: [accounts, "latest"] })
        .then((balance) => {
          setBalance(parseFloat(balance) / 1e18); // Convert wei to ether.
        });
    }
  }, []);

  return (
    <div>
      <Link to="/">Go Home</Link>
      <Center>
        <Button onClick={connectMetamask}>Connect Metamask Wallet</Button>
      </Center>
      {connected ? (
        <Center>
          <Flex flexDirection="column">
            <Text>Address: {address}</Text>
            <Text>Balance: {balance} ETH</Text>
          </Flex>
        </Center>
      ) : null}
      <Center>
        <Flex flexWrap="wrap" maxW="450px">
          {deposits.map((deposit, index) => (
            <Flex
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              m={2}
              width="100%"
              boxShadow="md"
            >
              <Text>From Address: {deposit.fromAddress}</Text>
              <Text>Timestamp: {deposit.timestamp}</Text>
              <Image src={deposit.image} alt="Deposit Image" maxW="100%" />
            </Flex>
          ))}
        </Flex>
      </Center>
    </div>
  );
};

export default Web3Page;
