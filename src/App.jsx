import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import PreviewPanel from "./components/PreviewPanel";
import { CODE_SNIPPETS } from "./constants";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(CODE_SNIPPETS.javascript);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Box minH="100vh" bg="gray.900">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        onCodeChange={setCode}
      />
      
      <Flex h="calc(100vh - 60px)" overflow="hidden">
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
    </Box>
  );
}

export default App;