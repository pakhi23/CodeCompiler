import { Box, Flex, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { DEVICE_PRESETS } from "../constants";

const WebPreview = ({ code, language, defaultDevice = 'desktop' }) => {
  const [selectedDevice, setSelectedDevice] = useState(defaultDevice);
  const [previewContent, setPreviewContent] = useState('');
  const iframeRef = useRef(null);
  
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const deviceBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (language === 'html') {
      setPreviewContent(code);
    } else if (language === 'css') {
      setPreviewContent(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>${code}</style>
        </head>
        <body>
          <div class="card">
            <h1 class="title">CSS Preview</h1>
            <p>Your CSS styles are applied here. Add HTML elements to see the full effect.</p>
          </div>
        </body>
        </html>
      `);
    } else if (language === 'javascript') {
      // Properly escape the JavaScript code to prevent injection issues
      const escapedCode = code
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${');
      
      setPreviewContent(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              background: #f5f5f5;
              margin: 0;
            }
            .console {
              background: #1e1e1e;
              color: #00ff00;
              padding: 15px;
              border-radius: 8px;
              font-family: monospace;
              white-space: pre-wrap;
              margin-top: 10px;
              max-height: 400px;
              overflow-y: auto;
            }
            .title {
              color: #333;
              margin-bottom: 10px;
            }
            .error {
              color: #ff6b6b !important;
            }
          </style>
        </head>
        <body>
          <h2 class="title">JavaScript Preview</h2>
          <p>Check the console output below:</p>
          <div id="console" class="console">Ready to execute JavaScript...\\n</div>
          
          <script>
            (function() {
              // Clear previous output
              const consoleDiv = document.getElementById('console');
              consoleDiv.textContent = '';
              consoleDiv.className = 'console';
              
              // Override console methods to display in the preview
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;
              
              function addToConsole(message, type = 'log') {
                const timestamp = new Date().toLocaleTimeString();
                const prefix = type === 'error' ? '❌ ' : type === 'warn' ? '⚠️ ' : '📝 ';
                consoleDiv.textContent += prefix + message + '\\n';
                if (type === 'error') {
                  consoleDiv.classList.add('error');
                }
              }
              
              console.log = function(...args) {
                originalLog.apply(console, arguments);
                addToConsole(args.join(' '), 'log');
              };
              
              console.error = function(...args) {
                originalError.apply(console, arguments);
                addToConsole(args.join(' '), 'error');
              };
              
              console.warn = function(...args) {
                originalWarn.apply(console, arguments);
                addToConsole(args.join(' '), 'warn');
              };
              
              // Execute user code with proper error handling
              try {
                // Use Function constructor to safely execute code
                const userFunction = new Function(\`${escapedCode}\`);
                userFunction();
                
                // If no output was generated, show a success message
                if (consoleDiv.textContent === '') {
                  addToConsole('Code executed successfully (no output)', 'log');
                }
              } catch (error) {
                addToConsole('Error: ' + error.message, 'error');
                console.error('JavaScript execution error:', error);
              }
            })();
          </script>
        </body>
        </html>
      `);
    }
  }, [code, language]);

  useEffect(() => {
    if (iframeRef.current && previewContent) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(previewContent);
      doc.close();
    }
  }, [previewContent]);

  const device = DEVICE_PRESETS[selectedDevice];

  return (
    <Box h="100%" bg={bg}>
      {/* Device Selector */}
      <Flex 
        justify="space-between" 
        align="center" 
        p={3} 
        borderBottom="1px" 
        borderColor={borderColor}
      >
        <HStack spacing={2}>
          <ViewIcon color="brand.500" />
          <Text fontSize="sm" fontWeight="medium">
            Preview
          </Text>
        </HStack>
        
        <HStack spacing={2}>
          {Object.entries(DEVICE_PRESETS).map(([key, preset]) => (
            <Button
              key={key}
              size="xs"
              variant={selectedDevice === key ? "solid" : "ghost"}
              colorScheme={selectedDevice === key ? "brand" : "gray"}
              onClick={() => setSelectedDevice(key)}
              title={preset.name}
              fontSize="10px"
              minW="auto"
              h="24px"
              px={2}
            >
              {key === 'desktop' ? '🖥' : key === 'tablet' ? '📱' : key === 'mobile' ? '📱' : 
               key === 'iphone' ? '📱' : '📱'}
            </Button>
          ))}
          <Text fontSize="xs" color="gray.500" ml={2}>
            {device.name}
          </Text>
        </HStack>
      </Flex>

      {/* Preview Container */}
      <Flex 
        justify="center" 
        align="center" 
        h="calc(100% - 60px)" 
        bg={deviceBg}
        p={4}
      >
        <Box
          width={device.width}
          height={device.height}
          maxW="100%"
          maxH="100%"
          bg="white"
          borderRadius={selectedDevice !== 'desktop' ? 'xl' : 'md'}
          overflow="hidden"
          boxShadow="xl"
          position="relative"
          border="1px"
          borderColor={borderColor}
        >
          {selectedDevice !== 'desktop' && (
            <Box
              h="20px"
              bg="gray.800"
              borderTopRadius="xl"
              position="relative"
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="60px"
                h="4px"
                bg="gray.600"
                borderRadius="full"
              />
            </Box>
          )}
          
          <iframe
            ref={iframeRef}
            style={{
              width: '100%',
              height: selectedDevice !== 'desktop' ? 'calc(100% - 20px)' : '100%',
              border: 'none',
              backgroundColor: 'white'
            }}
            title="Code Preview"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default WebPreview;