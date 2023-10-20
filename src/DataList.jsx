import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Input,
  Button,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Select,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataCard from "./DataCard";
const DataList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [secondFilter, setSecondFilter] = useState("");
  const [temperamentFilter, setTemperamentFilter] = useState("");
  const [breedGroupFilter, setBreedGroupFilter] = useState("");
  const [lifeSpanFilter, setLifeSpanFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;
  const API_URL = "https://api.thedogapi.com";
  useEffect(() => {
    axios
      .get(`${API_URL}/v1/breeds?limit=10000`, {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Apply filtering logic based on all filter fields.
    // Set the filtered data in the 'filteredData' state.
    const filtered = data.filter((item) => {
      const nameMatches =
        item.name && item.name.toLowerCase().includes(nameFilter.toLowerCase());
      const secondFilterMatches =
        ((item.temperament &&
          item.temperament
            .toLowerCase()
            .includes(temperamentFilter.toLowerCase())) ||
          (item.breed_group &&
            item.breed_group
              .toLowerCase()
              .includes(breedGroupFilter.toLowerCase())) ||
          (item.life_span &&
            item.life_span
              .toLowerCase()
              .includes(lifeSpanFilter.toLowerCase()))) &&
        (!secondFilter || item.secondFilterField === secondFilter);

      return nameMatches && secondFilterMatches;
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filters change.
  }, [
    nameFilter,
    secondFilter,
    temperamentFilter,
    breedGroupFilter,
    lifeSpanFilter,
    data,
  ]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      {loading ? ( // Display loading overlay if loading is true
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="rgba(255, 255, 255, 0.8)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="xl" />
        </Box>
      ) : null}
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Input
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          mb={2}
          mr={{ md: 2 }}
        />
        <Select
          placeholder="Filter by Field"
          value={secondFilter}
          onChange={(e) => setSecondFilter(e.target.value)}
          mb={2}
          mr={{ md: 2 }}
        >
          <option value="temperament">Temperament</option>
          <option value="breed_group">Breed Group</option>
          <option value="life_span">Life Span</option>
        </Select>
        <Input
          placeholder="Filter by Temperament"
          value={temperamentFilter}
          onChange={(e) => setTemperamentFilter(e.target.value)}
          mb={2}
          mr={{ md: 2 }}
        />
        <Input
          placeholder="Filter by Breed Group"
          value={breedGroupFilter}
          onChange={(e) => setBreedGroupFilter(e.target.value)}
          mb={2}
          mr={{ md: 2 }}
        />
        <Input
          placeholder="Filter by Life Span"
          value={lifeSpanFilter}
          onChange={(e) => setLifeSpanFilter(e.target.value)}
          mb={2}
        />
        <Link to="/web3">
          <Button mb={2} ml={{ base: 0, md: 2 }}>
            Explore Web3
          </Button>
        </Link>
      </Flex>
      <Flex flexWrap="wrap">
        {visibleData &&
          visibleData.map((item, index) => (
            <WrapItem key={index}>
              <DataCard data={item} />
            </WrapItem>
          ))}
      </Flex>
      <Flex justifyContent="center" mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Text mx={4}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
};

export default DataList;
