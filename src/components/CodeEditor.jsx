// components/CodeEditor.jsx
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  Box,
  Spinner,
  Text,
  Select,
  useColorMode,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { executeCode } from "../api";
import { LANGUAGE_VERSIONS } from "../constants";
import debounce from "lodash.debounce";

const DEFAULT_LANGUAGE = "python";

const languageSnippets = {
  python: `print("Hello from Python")`,
  javascript: `console.log("Hello from JavaScript");`,
  cpp: `#include <iostream>\nint main() {\n  std::cout << "Hello from C++";\n  return 0;\n}`,
  java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java");\n  }\n}`,
  c: `#include <stdio.h>\nint main() {\n  printf("Hello from C");\n  return 0;\n}`,
  typescript: `console.log("Hello from TypeScript");`,
};

export default function CodeEditor() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [code, setCode] = useState(languageSnippets[DEFAULT_LANGUAGE]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const runCode = async (lang, src) => {
    if (!src.trim()) return;
    setLoading(true);
    try {
      const result = await executeCode(lang, src);
      setOutput(result.run?.output || "No Output");
    } catch (err) {
      setOutput("Error executing code.");
    }
    setLoading(false);
  };

  const debouncedRunCode = debounce(runCode, 1000);

  useEffect(() => {
    debouncedRunCode(language, code);
    return () => debouncedRunCode.cancel();
  }, [code, language]);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(languageSnippets[selectedLang] || "");
  };

  const editorBg = useColorModeValue("#f5f5f5", "#1e1e1e");
  const outputBg = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box>
      {/* Header Controls */}
      <Flex justify="space-between" align="center" mb={4}>
        <Select
          maxW="200px"
          value={language}
          onChange={handleLanguageChange}
          bg={editorBg}
          borderColor={borderColor}
        >
          {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select>

        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          aria-label="Toggle theme"
          bg={editorBg}
          borderColor={borderColor}
        />
      </Flex>

      {/* Code Editor */}
      <Editor
        height="50vh"
        language={language}
        value={code}
        theme={colorMode === "dark" ? "vs-dark" : "light"}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          fontFamily: "Fira Code, monospace",
        }}
      />

      {/* Console Output */}
      <Box
        mt={4}
        p={4}
        bg={outputBg}
        borderRadius="md"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Text fontWeight="bold" mb={2}>
          Console Output:
        </Text>
        {loading ? <Spinner /> : <Text whiteSpace="pre-wrap">{output}</Text>}
      </Box>
    </Box>
  );
}
