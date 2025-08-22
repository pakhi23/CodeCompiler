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
      
      // Apply splitter-specific styles only to body during resize
      document.body.classList.add("splitter-resizing");
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        
        // Remove splitter-specific styles from body
        document.body.classList.remove("splitter-resizing");
      };
    }
  }, [isResizing, resize, stopResizing]);

  return (
    <Box 
      ref={containerRef}
      display="flex" 
      height="100%" 
      width="100%" 
      overflow="hidden"
      position="relative"
    >
      {/* Left Panel */}
      <Box 
        width={`${leftWidth}%`} 
        minWidth={`${minWidth}%`}
        maxWidth={`${maxWidth}%`}
        overflow="hidden"
        transition={isResizing ? "none" : "width 0.2s ease"}
        position="relative"
      >
        {leftPanel}
      </Box>
      
      {/* Resizable Splitter */}
      <Box
        width="6px"
        bg={isResizing ? splitterActiveBg : splitterBg}
        cursor="col-resize"
        position="relative"
        flexShrink={0}
        _hover={{
          bg: splitterHoverBg,
        }}
        transition="background-color 0.2s ease"
        onMouseDown={startResizing}
        zIndex={10}
      >
        {/* Wider invisible hit area for easier grabbing */}
        <Box
          position="absolute"
          top="0"
          left="-6px"
          right="-6px"
          bottom="0"
          cursor="col-resize"
          onMouseDown={startResizing}
        />
        
        {/* Visual indicator dots */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          flexDirection="column"
          gap="3px"
          opacity={0.8}
          pointerEvents="none"
        >
          <Box width="3px" height="3px" bg="white" borderRadius="full" />
          <Box width="3px" height="3px" bg="white" borderRadius="full" />
          <Box width="3px" height="3px" bg="white" borderRadius="full" />
        </Box>
      </Box>
      
      {/* Right Panel */}
      <Box 
        width={`${100 - leftWidth}%`}
        minWidth={`${100 - maxWidth}%`}
        maxWidth={`${100 - minWidth}%`}
        overflow="hidden"
        transition={isResizing ? "none" : "width 0.2s ease"}
        position="relative"
      >
        {rightPanel}
      </Box>
    </Box>
  );
};

export default ResizableSplitter;