import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  Avatar,
  VStack,
  HStack,
  Divider,
  IconButton,
  useColorModeValue,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { ExternalLinkIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";

const Footer = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("blue.500", "blue.300");

  const socialLinks = [
    {
      name: "YouTube",
      url: "https://youtube.com/@apurvatechstack?si=hMg0easGRIP0OEy7",
      icon: "🎥",
      color: "red.500"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/apurva-soni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      icon: "💼",
      color: "blue.500"
    },
    {
      name: "Twitter/X",
      url: "https://x.com/apurvas1129", 
      icon: "🐦",
      color: "blue.400"
    },
    {
      name: "GitHub",
      url: "https://github.com/pakhi23",
      icon: "⚡",
      color: "gray.700"
    }
  ];

  return (
    <Box bg={bg} borderTop="1px" borderColor={borderColor} py={8} mt={8}>
      <Container maxW="container.xl">
        <VStack spacing={6}>
          {/* Main Content */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            w="100%"
            gap={6}
          >
            {/* Left Side - Developer Info */}
            <Flex align="center" gap={4}>
              <Avatar
                size="xl"
                src="https://customer-assets.emergentagent.com/job_live-compiler-fix/artifacts/kom2z8y4_myijmg.jpeg"
                name="Apurva Soni"
                border="3px solid"
                borderColor="blue.500"
              />
              <VStack align="start" spacing={1}>
                <HStack>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    Apurva Soni
                  </Text>
                  <Badge colorScheme="blue" variant="subtle">
                    Full Stack Developer
                  </Badge>
                </HStack>
                <Text fontSize="sm" color={textColor} opacity={0.8}>
                  5+ Years of Experience
                </Text>
                <HStack spacing={4} fontSize="sm">
                  <HStack>
                    <EmailIcon color={linkColor} />
                    <Link 
                      href="mailto:apurvasoni501@gmail.com" 
                      color={linkColor}
                      _hover={{ textDecoration: "underline" }}
                    >
                      apurvasoni501@gmail.com
                    </Link>
                  </HStack>
                  <HStack>
                    <PhoneIcon color={linkColor} />
                    <Text color={textColor}>+91 7073885950</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Flex>

            {/* Right Side - Social Links */}
            <VStack align="center" spacing={3}>
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                Connect with me
              </Text>
              <HStack spacing={3}>
                {socialLinks.map((social) => (
                  <Tooltip key={social.name} label={social.name} placement="top">
                    <Link href={social.url} isExternal>
                      <IconButton
                        aria-label={social.name}
                        icon={<Text fontSize="20px">{social.icon}</Text>}
                        size="md"
                        variant="ghost"
                        colorScheme="blue"
                        _hover={{
                          transform: "translateY(-2px)",
                          shadow: "lg"
                        }}
                        transition="all 0.2s"
                      />
                    </Link>
                  </Tooltip>
                ))}
              </HStack>
            </VStack>
          </Flex>

          <Divider />

          {/* Bottom Section */}
          <VStack spacing={2} textAlign="center">
            <HStack spacing={2} align="center">
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                🚀 CodePlayground
              </Text>
              <Text fontSize="sm" color={textColor} opacity={0.7}>
                - Live Code Compiler & Editor
              </Text>
            </HStack>
            <Text fontSize="sm" color={textColor} opacity={0.8}>
              Built with ❤️ using React, Vite, Monaco Editor & Chakra UI
            </Text>
            <HStack spacing={1} fontSize="xs" color={textColor} opacity={0.6}>
              <Text>© 2025 Apurva Soni</Text>
              <Text>•</Text>
              <Text>All rights reserved</Text>
              <Text>•</Text>
              <Link
                href="https://youtube.com/@apurvatechstack"
                isExternal
                color={linkColor}
                _hover={{ textDecoration: "underline" }}
              >
                ApurvaTechStack
                <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;