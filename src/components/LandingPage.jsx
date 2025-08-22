import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Avatar,
  VStack,
  HStack,
  Grid,
  GridItem,
  Link,
  IconButton,
  useColorModeValue,
  Badge,
  Tooltip,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";

const LandingPage = ({ onEnterEditor }) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const gradientBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  const socialLinks = [
    {
      name: "YouTube Channel",
      url: "https://youtube.com/@apurvatechstack?si=hMg0easGRIP0OEy7",
      icon: "🎥",
      description: "ApurvaTechStack"
    },
    {
      name: "LinkedIn Profile", 
      url: "https://www.linkedin.com/in/apurva-soni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      icon: "💼",
      description: "Professional Network"
    },
    {
      name: "Twitter/X",
      url: "https://x.com/apurvas1129", 
      icon: "🐦",
      description: "@apurvas1129"
    },
    {
      name: "GitHub",
      url: "https://github.com/pakhi23",
      icon: "⚡",
      description: "Open Source Projects"
    }
  ];

  const features = [
    { icon: "⚡", title: "Live Compilation", desc: "Real-time code execution as you type" },
    { icon: "🌐", title: "Multi-Language", desc: "JavaScript, Python, Java, C++, HTML, CSS & more" },
    { icon: "📱", title: "Responsive Design", desc: "Works on desktop, tablet, and mobile devices" },
    { icon: "🎨", title: "Beautiful UI", desc: "Modern interface with dark/light themes" },
    { icon: "🚀", title: "Fast & Efficient", desc: "Built with React, Vite & Monaco Editor" },
    { icon: "💡", title: "Easy to Use", desc: "Intuitive interface for all skill levels" },
  ];

  return (
    <Box bg={bg} minH="100vh">
      {/* Hero Section */}
      <Box bg={gradientBg} color="white" py={{ base: 16, md: 20 }}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <Heading size={{ base: "xl", md: "2xl" }} fontWeight="bold">
              🚀 CodePlayground
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} opacity={0.9} maxW="600px">
              A powerful live code compiler and editor supporting multiple programming languages with real-time execution and beautiful interface.
            </Text>
            <Button
              size="lg"
              bg="white"
              color="gray.800"
              _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
              rightIcon={<ArrowForwardIcon />}
              onClick={onEnterEditor}
              fontWeight="bold"
              px={8}
            >
              Start Coding Now
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="lg" color={textColor}>
              ✨ Powerful Features
            </Heading>
            <Text color={textColor} opacity={0.8} maxW="600px">
              Experience the most intuitive and feature-rich online code editor
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
            {features.map((feature, index) => (
              <Card key={index} bg={cardBg} shadow="md" _hover={{ shadow: "lg" }} transition="all 0.2s">
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={3}>
                    <Text fontSize="3xl">{feature.icon}</Text>
                    <Heading size="md" color={textColor}>{feature.title}</Heading>
                    <Text color={textColor} opacity={0.8} fontSize="sm">
                      {feature.desc}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Developer Section */}
      <Box bg={cardBg} py={16}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Heading size="lg" color={textColor}>
                👨‍💻 Meet the Developer
              </Heading>
              <Text color={textColor} opacity={0.8}>
                Built with passion by a seasoned full-stack developer
              </Text>
            </VStack>

            <Card bg={bg} shadow="xl" maxW="600px" w="100%">
              <CardBody p={8}>
                <VStack spacing={6}>
                  {/* Developer Info */}
                  <VStack spacing={4}>
                    <Avatar
                      size="2xl"
                      src="https://customer-assets.emergentagent.com/job_live-compiler-fix/artifacts/kom2z8y4_myijmg.jpeg"
                      name="Apurva Soni"
                      border="4px solid"
                      borderColor="blue.500"
                    />
                    <VStack spacing={2}>
                      <HStack>
                        <Heading size="lg" color={textColor}>
                          Apurva Soni
                        </Heading>
                        <Badge colorScheme="blue" variant="solid" px={3} py={1}>
                          Full Stack Developer
                        </Badge>
                      </HStack>
                      <Text color={textColor} opacity={0.8} fontWeight="medium">
                        5+ Years of Experience
                      </Text>
                    </VStack>
                  </VStack>

                  {/* Contact Info */}
                  <VStack spacing={3} w="100%">
                    <HStack spacing={2} fontSize="sm">
                      <Text>📧</Text>
                      <Link 
                        href="mailto:apurvasoni501@gmail.com" 
                        color={linkColor}
                        _hover={{ textDecoration: "underline" }}
                        fontWeight="medium"
                      >
                        apurvasoni501@gmail.com
                      </Link>
                    </HStack>
                    <HStack spacing={2} fontSize="sm">
                      <Text>📱</Text>
                      <Text color={textColor} fontWeight="medium">+91 7073885950</Text>
                    </HStack>
                  </VStack>

                  {/* Social Links */}
                  <VStack spacing={4} w="100%">
                    <Text color={textColor} fontWeight="medium">Connect with me</Text>
                    <SimpleGrid columns={2} spacing={4} w="100%">
                      {socialLinks.map((social, index) => (
                        <Link key={index} href={social.url} isExternal _hover={{ textDecoration: "none" }}>
                          <Card 
                            bg={bg} 
                            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                            transition="all 0.2s"
                            cursor="pointer"
                          >
                            <CardBody p={4} textAlign="center">
                              <VStack spacing={2}>
                                <Text fontSize="2xl">{social.icon}</Text>
                                <Text fontSize="xs" color={textColor} fontWeight="medium">
                                  {social.description}
                                </Text>
                              </VStack>
                            </CardBody>
                          </Card>
                        </Link>
                      ))}
                    </SimpleGrid>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>

      {/* Tech Stack Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <VStack spacing={4}>
            <Heading size="lg" color={textColor}>
              🛠️ Built With Modern Technologies
            </Heading>
            <Text color={textColor} opacity={0.8}>
              Leveraging the latest and greatest in web development
            </Text>
          </VStack>
          
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            {[
              { name: "React 18", icon: "⚛️" },
              { name: "Vite", icon: "⚡" },
              { name: "Monaco Editor", icon: "💻" },
              { name: "Chakra UI", icon: "🎨" }
            ].map((tech, index) => (
              <Card key={index} bg={cardBg} textAlign="center" p={4}>
                <VStack spacing={2}>
                  <Text fontSize="2xl">{tech.icon}</Text>
                  <Text fontWeight="medium" color={textColor}>{tech.name}</Text>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg={gradientBg} color="white" py={16}>
        <Container maxW="container.xl">
          <VStack spacing={6} textAlign="center">
            <Heading size="lg">Ready to Start Coding? 🚀</Heading>
            <Text fontSize="lg" opacity={0.9}>
              Jump into the editor and experience the power of live compilation
            </Text>
            <Button
              size="lg"
              bg="white"
              color="gray.800"
              _hover={{ transform: "translateY(-2px)", shadow: "xl" }}
              rightIcon={<ArrowForwardIcon />}
              onClick={onEnterEditor}
              fontWeight="bold"
              px={8}
            >
              Launch CodePlayground
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg={cardBg} py={8} borderTop="1px" borderColor="gray.200">
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <Text color={textColor} opacity={0.8}>
              © 2025 Apurva Soni • All Rights Reserved
            </Text>
            <HStack spacing={4}>
              <Link href="https://youtube.com/@apurvatechstack" isExternal color={linkColor}>
                ApurvaTechStack <ExternalLinkIcon mx="2px" />
              </Link>
              <Text color={textColor} opacity={0.6}>•</Text>
              <Link href="mailto:apurvasoni501@gmail.com" color={linkColor}>
                Contact
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;