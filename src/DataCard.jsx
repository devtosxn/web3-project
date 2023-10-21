import React from "react";
import { Box, Text, Image, Stack, Badge } from "@chakra-ui/react";

const DataCard = ({ data }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      m={2}
      width="250px"
      height="auto"
      boxShadow="md"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={`https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`}
        alt={data.name}
        width="90%"
        height="150px"
        objectFit="cover"
      />
      <Text fontSize="l" fontWeight="bold" mt={2}>
        {data.name}
      </Text>
      <Text fontSize="sm" fontWeight="semibold" mt={2}>
        <Text as="span" color="blue.500">
          Breed Group:
        </Text>{" "}
        {data.breed_group}
      </Text>
      <Text fontSize="sm" fontWeight="semibold">
        <Text as="span" color="green.500">
          Life Span:
        </Text>{" "}
        {data.life_span}
      </Text>
      <Text fontSize="sm" fontWeight="semibold">
        <Text as="span" color="teal.500">
          Temperament:
        </Text>{" "}
        {data.temperament.split(",")[0]}
      </Text>
    </Box>
  );
};

export default DataCard;
