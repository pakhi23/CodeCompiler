import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from "@chakra-ui/react";
import WebPreview from "./WebPreview";
import OutputConsole from "./OutputConsole";
import { WEB_LANGUAGES } from "../constants";

const PreviewPanel = ({ language, code, output, loading }) => {
  const bg = useColorModeValue("white", "gray.800");
  const isWebLanguage = WEB_LANGUAGES.includes(language);

  return (
    <Box h="100%" bg={bg}>
      <Tabs variant="modern" h="100%" display="flex" flexDirection="column">
        <TabList px={4} borderBottom="1px" borderColor="gray.700">
          {isWebLanguage && (
            <Tab>🌐 Preview</Tab>
          )}
          <Tab>📋 Output</Tab>
          {isWebLanguage && (
            <Tab>📱 Mobile</Tab>
          )}
        </TabList>
        
        <TabPanels flex="1" overflow="hidden">
          {isWebLanguage && (
            <TabPanel p={0} h="100%">
              <WebPreview code={code} language={language} />
            </TabPanel>
          )}
          
          <TabPanel p={0} h="100%">
            <OutputConsole 
              output={output} 
              loading={loading} 
              language={language}
              code={code}
            />
          </TabPanel>
          
          {isWebLanguage && (
            <TabPanel p={0} h="100%">
              <WebPreview code={code} language={language} defaultDevice="mobile" />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PreviewPanel;