import {
  Box,
  Text,
  Flex,
  HStack,
  Spinner,
  Button,
  useColorModeValue,
  Code,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { executeCode } from "../api";
import { WEB_LANGUAGES } from "../constants";

const OutputConsole = ({ output, loading, language, code }) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentOutput, setCurrentOutput] = useState(output);

  const bg = useColorModeValue("white", "gray.900");
  const consoleBg = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const runCode = async () => {
    if (!code.trim() || WEB_LANGUAGES.includes(language)) return;
    
    setIsExecuting(true);
    try {
      const result = await executeCode(language, code);
      setCurrentOutput(result.run?.output || result.run?.stderr || "No output");
    } catch (error) {
      setCurrentOutput(`Error: ${error.message}`);
    }
    setIsExecuting(false);
  };

  const clearOutput = () => {
    setCurrentOutput("");
  };

  const displayOutput = currentOutput || output;
  const isLoading = loading || isExecuting;

  return (
    <Box h="100%" bg={bg} display="flex" flexDirection="column">
      {/* Console Header */}
      <Flex
        justify="space-between"
        align="center"
        p={3}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <HStack spacing={2}>
          <Text fontSize="lg">⚡</Text>
          <Text fontSize="sm" fontWeight="medium">
            Console Output
          </Text>
        </HStack>

        <HStack spacing={2}>
          {!WEB_LANGUAGES.includes(language) && (
            <Button
              size="sm"
              leftIcon={<PlayIcon />}
              onClick={runCode}
              isLoading={isLoading}
              loadingText="Running"
              variant="gradient"
              borderRadius="lg"
            >
              Run
            </Button>
          )}
          
          <Button
            size="sm"
            leftIcon={<RepeatIcon />}
            onClick={clearOutput}
            variant="ghost"
            borderRadius="lg"
          >
            Clear
          </Button>
        </HStack>
      </Flex>

      {/* Console Content */}
      <Box flex="1" overflow="auto">
        <Box
          h="100%"
          bg={consoleBg}
          p={4}
          fontFamily="mono"
          position="relative"
        >
          {isLoading ? (
            <VStack justify="center" h="100%" spacing={3}>
              <Spinner size="md" color="brand.500" />
              <Text fontSize="sm" color="gray.500">
                Executing code...
              </Text>
            </VStack>
          ) : displayOutput ? (
            <Code
              display="block"
              whiteSpace="pre-wrap"
              bg="transparent"
              p={0}
              fontSize="sm"
              lineHeight="1.5"
              color={displayOutput.includes("Error") ? "red.400" : "inherit"}
            >
              {displayOutput}
            </Code>
          ) : (
            <VStack justify="center" h="100%" spacing={3} color="gray.500">
              <Text fontSize="4xl">🚀</Text>
              <Text fontSize="sm" textAlign="center">
                {WEB_LANGUAGES.includes(language) 
                  ? "Web languages show live preview in the Preview tab"
                  : 'Click "Run" to execute your code or start typing to see auto-execution results'
                }
              </Text>
            </VStack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OutputConsole;