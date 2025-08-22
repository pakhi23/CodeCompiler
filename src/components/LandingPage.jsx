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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";

const LandingPage = ({ onEnterEditor }) => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const linkColor = useColorModeValue("blue.500", "blue.300");
  const gradientBg = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  const accentBg = useColorModeValue("blue.50", "blue.900");

  const socialLinks = [
    {
      name: "YouTube Channel",
      url: "https://youtube.com/@apurvatechstack?si=hMg0easGRIP0OEy7",
      icon: "🎥",
      description: "ApurvaTechStack",
      stats: "Tech Tutorials"
    },
    {
      name: "LinkedIn Profile", 
      url: "https://www.linkedin.com/in/apurva-soni?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      icon: "💼",
      description: "Professional Network",
      stats: "5+ Years Exp"
    },
    {
      name: "Twitter/X",
      url: "https://x.com/apurvas1129", 
      icon: "🐦",
      description: "@apurvas1129",
      stats: "Tech Updates"
    },
    {
      name: "GitHub",
      url: "https://github.com/pakhi23",
      icon: "⚡",
      description: "Open Source Projects",
      stats: "Active Developer"
    }
  ];

  const features = [
    { icon: "⚡", title: "Live Compilation", desc: "Real-time code execution as you type with instant feedback" },
    { icon: "🌐", title: "Multi-Language Support", desc: "JavaScript, Python, Java, C++, HTML, CSS & more languages" },
    { icon: "📱", title: "Responsive Design", desc: "Seamless experience on desktop, tablet, and mobile devices" },
    { icon: "🎨", title: "Beautiful Interface", desc: "Modern UI with customizable dark/light themes" },
    { icon: "🚀", title: "High Performance", desc: "Built with React 18, Vite & Monaco Editor for speed" },
    { icon: "💡", title: "Developer Friendly", desc: "Intuitive interface designed for all skill levels" },
  ];

  const stats = [
    { label: "Languages Supported", value: "10+", icon: "📝" },
    { label: "Years Experience", value: "5+", icon: "🏆" },
    { label: "Projects Built", value: "50+", icon: "🚀" },
    { label: "Code Executions", value: "∞", icon: "⚡" },
  ];

  const techStack = [
    { name: "React 18", icon: "⚛️", description: "Modern UI Library" },
    { name: "Vite", icon: "⚡", description: "Lightning Fast Build Tool" },
    { name: "Monaco Editor", icon: "💻", description: "VS Code's Editor" },
    { name: "Chakra UI", icon: "🎨", description: "Component Library" }
  ];

  return (
    <Box bg={bg} minH="100vh">
      {/* Enhanced Hero Section */}
      <Box bg={gradientBg} color="white" py={{ base: 20, md: 24 }} position="relative" overflow="hidden">
        {/* Background Pattern */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity="0.1"
          bgImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
          bgSize="50px 50px"
        />
        
        <Container maxW="container.xl" position="relative">
          <VStack spacing={10} textAlign="center">
            <VStack spacing={6}>
              <Heading 
                size={{ base: "2xl", md: "3xl" }} 
                fontWeight="bold"
                textShadow="0 2px 4px rgba(0,0,0,0.3)"
              >
                🚀 CodePlayground
              </Heading>
              <Text fontSize={{ base: "xl", md: "2xl" }} opacity={0.95} maxW="800px" lineHeight="1.6">
                A powerful, feature-rich online code editor with live compilation, 
                multi-language support, and beautiful interface. Built by a passionate developer.
              </Text>
              <HStack spacing={4} flexWrap="wrap" justify="center">
                <Badge colorScheme="whiteAlpha" px={3} py={1} borderRadius="full">
                  🔥 Live Compilation
                </Badge>
                <Badge colorScheme="whiteAlpha" px={3} py={1} borderRadius="full">
                  🌐 10+ Languages
                </Badge>
                <Badge colorScheme="whiteAlpha" px={3} py={1} borderRadius="full">
                  📱 Responsive
                </Badge>
              </HStack>
            </VStack>
            
            <VStack spacing={4}>
              <Button
                size="lg"
                bg="white"
                color="gray.800"
                _hover={{ transform: "translateY(-2px)", shadow: "2xl" }}
                rightIcon={<ArrowForwardIcon />}
                onClick={onEnterEditor}
                fontWeight="bold"
                px={10}
                py={6}
                fontSize="lg"
                borderRadius="xl"
                shadow="xl"
              >
                Start Coding Now
              </Button>
              <Text fontSize="sm" opacity={0.8}>
                No signup required • Instant access • Free forever
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box bg={accentBg} py={12}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <Card key={index} bg={cardBg} textAlign="center" shadow="md">
                <CardBody py={6}>
                  <VStack spacing={3}>
                    <Text fontSize="3xl">{stat.icon}</Text>
                    <Stat textAlign="center">
                      <StatNumber fontSize="2xl" color={linkColor}>{stat.value}</StatNumber>
                      <StatLabel fontSize="sm" color={textColor}>{stat.label}</StatLabel>
                    </Stat>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Enhanced Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={16}>
          <VStack spacing={6} textAlign="center">
            <Heading size="xl" color={textColor}>
              ✨ Powerful Features
            </Heading>
            <Text color={textColor} opacity={0.8} maxW="600px" fontSize="lg">
              Experience the most intuitive and feature-rich online code editor designed for modern developers
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                bg={cardBg} 
                shadow="lg" 
                _hover={{ shadow: "xl", transform: "translateY(-2px)" }} 
                transition="all 0.3s"
                borderTop="4px solid"
                borderTopColor={linkColor}
              >
                <CardBody textAlign="center" p={8}>
                  <VStack spacing={4}>
                    <Box p={3} bg={accentBg} borderRadius="full">
                      <Text fontSize="3xl">{feature.icon}</Text>
                    </Box>
                    <Heading size="md" color={textColor}>{feature.title}</Heading>
                    <Text color={textColor} opacity={0.8} lineHeight="1.6">
                      {feature.desc}
                    </Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Enhanced Developer Section */}
      <Box bg={cardBg} py={20}>
        <Container maxW="container.xl">
          <VStack spacing={12} textAlign="center">
            <VStack spacing={6}>
              <Heading size="xl" color={textColor}>
                👨‍💻 Meet the Developer
              </Heading>
              <Text color={textColor} opacity={0.8} fontSize="lg" maxW="600px">
                Built with passion and expertise by a seasoned full-stack developer 
                dedicated to creating exceptional web experiences
              </Text>
            </VStack>

            <Card bg={bg} shadow="2xl" maxW="800px" w="100%" borderRadius="2xl">
              <CardBody p={10}>
                <VStack spacing={8}>
                  {/* Developer Info */}
                  <VStack spacing={6}>
                    <Avatar
                      size="2xl"
                      src="https://customer-assets.emergentagent.com/job_live-compiler-fix/artifacts/kom2z8y4_myijmg.jpeg"
                      name="Apurva Soni"
                      border="6px solid"
                      borderColor={linkColor}
                      shadow="xl"
                    />
                    <VStack spacing={3}>
                      <HStack>
                        <Heading size="xl" color={textColor}>
                          Apurva Soni
                        </Heading>
                        <Badge colorScheme="blue" variant="solid" px={4} py={2} borderRadius="full">
                          Full Stack Developer
                        </Badge>
                      </HStack>
                      <HStack spacing={4} flexWrap="wrap" justify="center">
                        <Badge variant="outline" colorScheme="green">5+ Years Experience</Badge>
                        <Badge variant="outline" colorScheme="purple">React Expert</Badge>
                        <Badge variant="outline" colorScheme="orange">Open Source Contributor</Badge>
                      </HStack>
                    </VStack>
                  </VStack>

                  <Divider />

                  {/* Contact Info */}
                  <VStack spacing={4} w="100%">
                    <Heading size="md" color={textColor}>Get In Touch</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                      <HStack spacing={3} justify="center">
                        <Text fontSize="lg">📧</Text>
                        <Link 
                          href="mailto:apurvasoni501@gmail.com" 
                          color={linkColor}
                          _hover={{ textDecoration: "underline" }}
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          apurvasoni501@gmail.com
                        </Link>
                      </HStack>
                      <HStack spacing={3} justify="center">
                        <Text fontSize="lg">📱</Text>
                        <Text color={textColor} fontWeight="medium" fontSize="lg">
                          +91 7073885950
                        </Text>
                      </HStack>
                    </SimpleGrid>
                  </VStack>

                  <Divider />

                  {/* Enhanced Social Links */}
                  <VStack spacing={6} w="100%">
                    <Heading size="md" color={textColor}>Connect & Follow</Heading>
                    <SimpleGrid columns={2} spacing={4} w="100%">
                      {socialLinks.map((social, index) => (
                        <Link key={index} href={social.url} isExternal _hover={{ textDecoration: "none" }}>
                          <Card 
                            bg={accentBg} 
                            _hover={{ 
                              shadow: "lg", 
                              transform: "translateY(-3px)",
                              borderColor: linkColor
                            }}
                            transition="all 0.3s"
                            cursor="pointer"
                            border="2px solid transparent"
                          >
                            <CardBody p={6} textAlign="center">
                              <VStack spacing={3}>
                                <Text fontSize="3xl">{social.icon}</Text>
                                <VStack spacing={1}>
                                  <Text fontSize="sm" color={textColor} fontWeight="bold">
                                    {social.description}
                                  </Text>
                                  <Text fontSize="xs" color={textColor} opacity={0.7}>
                                    {social.stats}
                                  </Text>
                                </VStack>
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

      {/* Enhanced Tech Stack Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={12} textAlign="center">
          <VStack spacing={6}>
            <Heading size="xl" color={textColor}>
              🛠️ Built With Modern Technologies
            </Heading>
            <Text color={textColor} opacity={0.8} fontSize="lg">
              Leveraging the latest and greatest tools in web development for optimal performance
            </Text>
          </VStack>
          
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            {techStack.map((tech, index) => (
              <Card 
                key={index} 
                bg={cardBg} 
                textAlign="center" 
                p={4} 
                shadow="md"
                _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
                transition="all 0.3s"
              >
                <CardBody py={6}>
                  <VStack spacing={3}>
                    <Text fontSize="3xl">{tech.icon}</Text>
                    <VStack spacing={1}>
                      <Text fontWeight="bold" color={textColor}>{tech.name}</Text>
                      <Text fontSize="xs" color={textColor} opacity={0.7}>
                        {tech.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Enhanced CTA Section */}
      <Box bg={gradientBg} color="white" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Heading size="xl">Ready to Start Coding? 🚀</Heading>
              <Text fontSize="xl" opacity={0.95} maxW="600px">
                Jump into the editor and experience the power of live compilation 
                with professional-grade features
              </Text>
            </VStack>
            <Button
              size="lg"
              bg="white"
              color="gray.800"
              _hover={{ transform: "translateY(-2px)", shadow: "2xl" }}
              rightIcon={<ArrowForwardIcon />}
              onClick={onEnterEditor}
              fontWeight="bold"
              px={10}
              py={6}
              fontSize="lg"
              borderRadius="xl"
              shadow="xl"
            >
              Launch CodePlayground
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Compact Footer */}
      <Box bg={cardBg} py={8} borderTop="1px" borderColor="gray.200">
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center">
            <HStack spacing={2} align="center">
              <Text color={textColor} opacity={0.8}>
                © 2025 Apurva Soni • All Rights Reserved
              </Text>
              <Text color={linkColor}>🚀</Text>
            </HStack>
            <HStack spacing={6} flexWrap="wrap" justify="center">
              <Link href="https://youtube.com/@apurvatechstack" isExternal color={linkColor}>
                ApurvaTechStack <ExternalLinkIcon mx="2px" />
              </Link>
              <Text color={textColor} opacity={0.6}>•</Text>
              <Link href="mailto:apurvasoni501@gmail.com" color={linkColor}>
                Contact Developer
              </Link>
              <Text color={textColor} opacity={0.6}>•</Text>
              <Link href="https://github.com/pakhi23" isExternal color={linkColor}>
                GitHub <ExternalLinkIcon mx="2px" />
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;