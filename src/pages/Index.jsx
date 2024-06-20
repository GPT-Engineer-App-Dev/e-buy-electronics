import { useState } from "react";
import { Box, Container, VStack, Heading, Text, SimpleGrid, Image, Badge, Input, Checkbox, CheckboxGroup, Stack, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 699,
    category: "Electronics",
    available: true,
    imageUrl: "/images/smartphone.jpg",
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for professionals",
    price: 999,
    category: "Electronics",
    available: false,
    imageUrl: "/images/laptop.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 199,
    category: "Accessories",
    available: true,
    imageUrl: "/images/headphones.jpg",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [availability, setAvailability] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailability(event.target.checked);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesAvailability = !availability || product.available;

    return matchesSearchTerm && matchesCategory && matchesPrice && matchesAvailability;
  });

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Electronics Store</Heading>
        <Text fontSize="xl">Find the best electronics at unbeatable prices!</Text>
        <Input
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearchChange}
          mb={6}
        />
        <CheckboxGroup colorScheme="teal" onChange={handleCategoryChange}>
          <Stack spacing={5} direction="row">
            <Checkbox value="Electronics">Electronics</Checkbox>
            <Checkbox value="Accessories">Accessories</Checkbox>
          </Stack>
        </CheckboxGroup>
        <RangeSlider
          aria-label={['min', 'max']}
          defaultValue={[0, 1000]}
          min={0}
          max={1000}
          step={50}
          onChangeEnd={handlePriceChange}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Checkbox isChecked={availability} onChange={handleAvailabilityChange}>
          Available Only
        </Checkbox>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {filteredProducts.map((product) => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={product.imageUrl} alt={product.name} />
              <Box p={6}>
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {product.available ? "Available" : "Out of Stock"}
                  </Badge>
                </Box>
                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  {product.name}
                </Box>
                <Box>
                  ${product.price}
                  <Box as="span" color="gray.600" fontSize="sm">
                    / unit
                  </Box>
                </Box>
                <Text mt={2}>{product.description}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;