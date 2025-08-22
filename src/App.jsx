import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import PreviewPanel from "./components/PreviewPanel";
import Footer from "./components/Footer";
import { CODE_SNIPPETS } from "./constants";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS.javascript);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Box minH="100vh" bg="gray.900" display="flex" flexDirection="column">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        onCodeChange={setCode}
      />
      
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

      {/* Footer with ownership details */}
      <Footer />
    </Box>
  );
}

export default App;