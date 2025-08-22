import { Box, Flex, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import PreviewPanel from "./PreviewPanel";
import Footer from "./Footer";
import { CODE_SNIPPETS } from "../constants";

const CodeEditorPage = ({ onBackToLanding }) => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS.javascript);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const headerBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bg="gray.900" display="flex" flexDirection="column">
      {/* Enhanced Header with Back Button */}
      <Box bg={headerBg} borderBottom="1px" borderColor={borderColor} py={2} px={4}>
        <Flex align="center" justify="space-between">
          <HStack spacing={4}>
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<ArrowBackIcon />}
              onClick={onBackToLanding}
              colorScheme="blue"
              _hover={{ bg: "blue.50" }}
            >
              Back to Home
            </Button>
            <Text fontSize="lg" fontWeight="bold" color="blue.600">
              🚀 CodePlayground
            </Text>
          </HStack>
          <Header 
            language={language}
            onLanguageChange={setLanguage}
            onCodeChange={setCode}
            showTitle={false} // Don't show duplicate title
          />
        </Flex>
      </Box>
      
      <Flex h="calc(100vh - 60px - 80px)" overflow="hidden" flex="1">
        {/* Code Editor Panel */}
        <Box w="50%" borderRight="1px" borderColor="gray.700">
          <CodeEditor
            language={language}
            code={code}
            onChange={setCode}
            onOutputChange={setOutput}
            onLoadingChange={setLoading}
          />
        </Box>
        
        {/* Preview/Output Panel */}
        <Box w="50%">
          <PreviewPanel
            language={language}
            code={code}
            output={output}
            loading={loading}
          />
        </Box>
      </Flex>

      {/* Compact Footer */}
      <Footer />
    </Box>
  );
};

export default CodeEditorPage;