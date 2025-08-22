import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  Box,
  useColorMode,
  useColorModeValue,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { executeCode } from "../api";
import { WEB_LANGUAGES } from "../constants";

const CodeEditor = ({ language, code, onChange, onOutputChange, onLoadingChange }) => {
  const { colorMode } = useColorMode();
  const editorRef = useRef(null);
  
  const bg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  // Debounced execution for non-web languages
  const debouncedExecute = debounce(async (lang, sourceCode) => {
    if (!sourceCode.trim() || WEB_LANGUAGES.includes(lang)) return;
    
    onLoadingChange(true);
    try {
      const result = await executeCode(lang, sourceCode);
      onOutputChange(result.run?.output || result.run?.stderr || "No output");
    } catch (error) {
      onOutputChange(`Error: ${error.message}`);
    }
    onLoadingChange(false);
  }, 1500);

  // JavaScript execution for Output tab (captures console output)
  const debouncedJavaScriptExecute = debounce((sourceCode) => {
    if (!sourceCode.trim()) return;
    
    try {
      // Create a mock console to capture output
      let consoleOutput = '';
      const mockConsole = {
        log: (...args) => { consoleOutput += args.join(' ') + '\n'; },
        error: (...args) => { consoleOutput += 'Error: ' + args.join(' ') + '\n'; },
        warn: (...args) => { consoleOutput += 'Warning: ' + args.join(' ') + '\n'; },
        info: (...args) => { consoleOutput += 'Info: ' + args.join(' ') + '\n'; }
      };
      
      // Execute JavaScript in a sandboxed environment
      const func = new Function('console', sourceCode);
      func(mockConsole);
      
      // Update output with captured console messages
      onOutputChange(consoleOutput || 'Code executed successfully (no console output)');
    } catch (error) {
      onOutputChange(`JavaScript Error: ${error.message}`);
    }
  }, 1500);

  useEffect(() => {
    if (code) {
      if (language === 'javascript') {
        // For JavaScript, execute for Output tab
        debouncedJavaScriptExecute(code);
      } else if (!WEB_LANGUAGES.includes(language)) {
        // For other non-web languages, use API execution
        debouncedExecute(language, code);
      }
    }
    return () => {
      debouncedExecute.cancel();
      debouncedJavaScriptExecute.cancel();
    };
  }, [code, language]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Custom theme for better experience
    monaco.editor.defineTheme('customDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
      ],
      colors: {
        'editor.background': '#1a1a1a',
        'editor.lineHighlightBackground': '#2d2d2d',
        'editorLineNumber.foreground': '#858585',
      }
    });

    monaco.editor.defineTheme('customLight', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineHighlightBackground': '#f5f5f5',
      }
    });
  };

  const getLanguageForMonaco = (lang) => {
    const languageMap = {
      'cpp': 'cpp',
      'c': 'c',
      'csharp': 'csharp',
      'javascript': 'javascript',
      'typescript': 'typescript',
      'python': 'python',
      'java': 'java',
      'php': 'php',
      'html': 'html',
      'css': 'css',
    };
    return languageMap[lang] || lang;
  };

  const getLanguageIcon = (lang) => {
    const icons = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍',
      java: '☕',
      csharp: '🔷',
      php: '🐘',
      c: '⚡',
      cpp: '⚡',
      html: '🌐',
      css: '🎨',
    };
    return icons[lang] || '📄';
  };

  return (
    <Box h="100%" bg={bg} position="relative">
      {/* Language Info Bar */}
      <HStack
        justify="space-between"
        align="center"
        px={4}
        py={2}
        borderBottom="1px"
        borderColor={borderColor}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <HStack spacing={2}>
          <Text fontSize="lg">{getLanguageIcon(language)}</Text>
          <Text fontSize="sm" fontWeight="medium" textTransform="capitalize">
            {language === 'cpp' ? 'C++' : language} Editor
          </Text>
        </HStack>
        
        {WEB_LANGUAGES.includes(language) && (
          <Text fontSize="xs" color="brand.500" fontWeight="medium">
            ⚡ Live Preview
          </Text>
        )}
      </HStack>

      {/* Monaco Editor */}
      <Box h="calc(100% - 50px)">
        <Editor
          height="100%"
          language={getLanguageForMonaco(language)}
          value={code}
          theme={colorMode === "dark" ? "customDark" : "customLight"}
          onChange={(value) => onChange(value || "")}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            lineNumbers: "on",
            renderLineHighlight: "all",
            selectOnLineNumbers: true,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            quickSuggestions: true,
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            mouseWheelZoom: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: true,
            renderWhitespace: "boundary",
            bracketPairColorization: { enabled: true },
          }}
        />
      </Box>
    </Box>
  );
};

export default CodeEditor;