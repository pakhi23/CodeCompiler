import {
  Box,
  Flex,
  Select,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
  HStack,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../constants";

const Header = ({ language, onLanguageChange, onCodeChange }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const logoGradient = useColorModeValue(
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  );

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    onLanguageChange(selectedLang);
    onCodeChange(CODE_SNIPPETS[selectedLang] || "");
  };

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      py={3}
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <HStack spacing={4}>
          <Box
            bgGradient={logoGradient}
            bgClip="text"
            fontSize="xl"
            fontWeight="bold"
            letterSpacing="tight"
          >
            CodePlayground
          </Box>
        </HStack>

        {/* Controls */}
        <HStack spacing={4}>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            Language:
          </Text>
          
          <Select
            value={language}
            onChange={handleLanguageChange}
            variant="modern"
            size="sm"
            maxW="150px"
            textTransform="capitalize"
          >
            {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
              </option>
            ))}
          </Select>

          <Tooltip label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              borderRadius="lg"
            />
          </Tooltip>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;