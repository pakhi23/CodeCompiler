import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  Avatar,
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
    <Box bg={bg} borderTop="1px" borderColor={borderColor} py={3}>
      <Container maxW="container.xl">
        {/* Main Content - Single Row */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          w="100%"
          gap={{ base: 3, lg: 6 }}
        >
          {/* Left Side - Developer Info */}
          <Flex align="center" gap={3}>
            <Avatar
              size="md"
              src="https://customer-assets.emergentagent.com/job_live-compiler-fix/artifacts/kom2z8y4_myijmg.jpeg"
              name="Apurva Soni"
              border="2px solid"
              borderColor="blue.500"
            />
            <Flex direction="column" align={{ base: "center", lg: "start" }}>
              <HStack spacing={2}>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  Apurva Soni
                </Text>
                <Badge size="sm" colorScheme="blue" variant="subtle">
                  Full Stack Developer
                </Badge>
              </HStack>
              <HStack spacing={4} fontSize="xs" opacity={0.8}>
                <HStack spacing={1}>
                  <EmailIcon boxSize={3} color={linkColor} />
                  <Link 
                    href="mailto:apurvasoni501@gmail.com" 
                    color={linkColor}
                    _hover={{ textDecoration: "underline" }}
                  >
                    apurvasoni501@gmail.com
                  </Link>
                </HStack>
                <HStack spacing={1}>
                  <PhoneIcon boxSize={3} color={linkColor} />
                  <Text color={textColor}>+91 7073885950</Text>
                </HStack>
              </HStack>
            </Flex>
          </Flex>

          {/* Center - Project Info */}
          <Flex direction="column" align="center" textAlign="center">
            <HStack spacing={2} align="center">
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                🚀 CodePlayground
              </Text>
            </HStack>
            <Text fontSize="xs" color={textColor} opacity={0.7}>
              Built with React, Vite, Monaco Editor & Chakra UI
            </Text>
          </Flex>

          {/* Right Side - Social Links */}
          <Flex direction="column" align="center" gap={2}>
            <HStack spacing={2}>
              {socialLinks.map((social) => (
                <Tooltip key={social.name} label={social.name} placement="top">
                  <Link href={social.url} isExternal>
                    <IconButton
                      aria-label={social.name}
                      icon={<Text fontSize="16px">{social.icon}</Text>}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      _hover={{
                        transform: "translateY(-1px)",
                        shadow: "md"
                      }}
                      transition="all 0.2s"
                    />
                  </Link>
                </Tooltip>
              ))}
            </HStack>
            <Text fontSize="xs" color={textColor} opacity={0.6}>
              © 2025 Apurva Soni
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;