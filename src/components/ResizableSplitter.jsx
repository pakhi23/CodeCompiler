import { useState, useCallback, useEffect, useRef } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const ResizableSplitter = ({ 
  leftPanel, 
  rightPanel, 
  initialLeftWidth = 50, 
  minWidth = 20, 
  maxWidth = 80 
}) => {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const splitterBg = useColorModeValue("gray.300", "gray.600");
  const splitterHoverBg = useColorModeValue("blue.400", "blue.500");
  const splitterActiveBg = useColorModeValue("blue.500", "blue.400");

  const startResizing = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;

    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Apply constraints
    const constrainedWidth = Math.min(Math.max(newLeftWidth, minWidth), maxWidth);
    setLeftWidth(constrainedWidth);
  }, [isResizing, minWidth, maxWidth]);

  useEffect(() => {
    if (isResizing) {
      const handleMouseMove = (e) => resize(e);
      const handleMouseUp = () => stopResizing();
      
      document.addEventListener("mousemove", handleMouseMove, { passive: false });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.body.style.overflow = "hidden"; // Prevent scrolling during resize
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.body.style.overflow = "";
      };
    }
  }, [isResizing, resize, stopResizing]);

  return (
    <Box 
      display="flex" 
      height="100%" 
      width="100%" 
      data-resizable-container
      overflow="hidden"
    >
      {/* Left Panel */}
      <Box 
        width={`${leftWidth}%`} 
        minWidth={`${minWidth}%`}
        maxWidth={`${maxWidth}%`}
        overflow="hidden"
        transition={isResizing ? "none" : "width 0.1s ease"}
      >
        {leftPanel}
      </Box>
      
      {/* Resizable Splitter */}
      <Box
        width="4px"
        bg={isResizing ? splitterActiveBg : splitterBg}
        cursor="col-resize"
        position="relative"
        _hover={{
          bg: splitterHoverBg,
        }}
        transition="background-color 0.2s ease"
        onMouseDown={startResizing}
      >
        {/* Invisible wider hit area for easier grabbing */}
        <Box
          position="absolute"
          top="0"
          left="-4px"
          right="-4px"
          bottom="0"
          cursor="col-resize"
        />
        
        {/* Visual indicator dots */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          flexDirection="column"
          gap="2px"
          opacity={0.6}
        >
          <Box width="2px" height="2px" bg="white" borderRadius="full" />
          <Box width="2px" height="2px" bg="white" borderRadius="full" />
          <Box width="2px" height="2px" bg="white" borderRadius="full" />
        </Box>
      </Box>
      
      {/* Right Panel */}
      <Box 
        width={`${100 - leftWidth}%`}
        minWidth={`${100 - maxWidth}%`}
        maxWidth={`${100 - minWidth}%`}
        overflow="hidden"
        transition={isResizing ? "none" : "width 0.1s ease"}
      >
        {rightPanel}
      </Box>
    </Box>
  );
};

export default ResizableSplitter;