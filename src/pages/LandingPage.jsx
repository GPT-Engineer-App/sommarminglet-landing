import React, { useState, useEffect } from 'react';
import { Container, VStack, Text, Box, Heading, Flex, Editable, EditableInput, EditablePreview, useToast } from "@chakra-ui/react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const LandingPage = () => {
  const [eventInfo, setEventInfo] = useState({
    title: 'Sommarminglet',
    description: 'Join us for an unforgettable event!',
    date: '2023-12-31',
    location: 'Stockholm'
  });
  const toast = useToast();

  useEffect(() => {
    const fetchEventInfo = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .single();
      if (data) {
        setEventInfo(data);
      }
      if (error) {
        toast({
          title: "Error fetching event info",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchEventInfo();
  }, [toast]);

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" w="100%" p={4} bg="blue.500" color="white" justifyContent="space-between" alignItems="center">
        <Heading size="lg">Sommarminglet</Heading>
      </Flex>
      <VStack spacing={8} mt={8}>
        <Box w="100%" textAlign="center">
          <Heading as="h1" size="2xl">
            <Editable defaultValue={eventInfo.title}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Heading>
          <Text fontSize="lg" mt={4}>
            <Editable defaultValue={eventInfo.description}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Text>
        </Box>
        <Box w="100%">
          <Text fontSize="lg" mt={4}>
            Date: <Editable defaultValue={eventInfo.date}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Text>
          <Text fontSize="lg" mt={4}>
            Location: <Editable defaultValue={eventInfo.location}>
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default LandingPage;