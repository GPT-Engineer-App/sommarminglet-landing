import React, { useState } from 'react';
import { Container, VStack, Text, Box, Image, Input, Button, FormControl, FormLabel, Heading, Flex } from "@chakra-ui/react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const Admin = () => {
  const [image, setImage] = useState(null);
  const [eventInfo, setEventInfo] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage.from('images').upload(`public/${file.name}`, file);
    if (error) {
      console.error('Error uploading image:', error);
    } else {
      const imageUrl = supabase.storage.from('images').getPublicUrl(data.Key).publicURL;
      setImage(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" w="100%" p={4} bg="blue.500" color="white" justifyContent="space-between" alignItems="center">
        <Heading size="lg">Sommarminglet</Heading>
      </Flex>
      <VStack spacing={8} mt={8}>
        <Box w="100%" textAlign="center">
          <Heading as="h1" size="2xl">Welcome to Sommarminglet</Heading>
          <Text fontSize="lg" mt={4}>Join us for an unforgettable event!</Text>
        </Box>
        <Box w="100%">
          <FormControl>
            <FormLabel>Event Title</FormLabel>
            <Input name="title" value={eventInfo.title} onChange={handleInputChange} placeholder="Enter event title" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={eventInfo.description} onChange={handleInputChange} placeholder="Enter event description" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input name="date" value={eventInfo.date} onChange={handleInputChange} placeholder="Enter event date" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={eventInfo.location} onChange={handleInputChange} placeholder="Enter event location" />
          </FormControl>
        </Box>
        <Box w="100%">
          <FormControl>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" onChange={handleImageUpload} />
          </FormControl>
          {image && <Image src={image} alt="Event" mt={4} />}
        </Box>
      </VStack>
    </Container>
  );
};

export default Admin;