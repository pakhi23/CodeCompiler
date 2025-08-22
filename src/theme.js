import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: '#f0f4ff',
    100: '#d6e4ff',
    200: '#adc8ff',
    300: '#85a5ff',
    400: '#597ef7',
    500: '#2f54eb',
    600: '#1d39c4',
    700: '#10239e',
    800: '#061178',
    900: '#030852',
  },
  dark: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#718096',
    600: '#4a5568',
    700: '#2d3748',
    800: '#1a202c',
    900: '#171923',
  }
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? '#0a0e1a' : '#ffffff',
      color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      lineHeight: 'base',
    },
    '*::placeholder': {
      color: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
    },
    '*, *::before, *::after': {
      borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.200',
    },
  }),
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'lg',
    },
    variants: {
      gradient: (props) => ({
        background: props.colorMode === 'dark' 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        transition: 'all 0.2s',
      }),
    },
  },
  Select: {
    variants: {
      modern: (props) => ({
        field: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          borderRadius: 'lg',
          _hover: {
            borderColor: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      }),
    },
  },
  Tab: {
    variants: {
      modern: (props) => ({
        tab: {
          borderRadius: 'lg',
          fontWeight: 'medium',
          color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
          _selected: {
            color: props.colorMode === 'dark' ? 'brand.300' : 'brand.600',
            bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
          },
          _hover: {
            color: props.colorMode === 'dark' ? 'brand.200' : 'brand.500',
          },
        },
      }),
    },
  },
};

const theme = extendTheme({
  colors,
  styles,
  components,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    mono: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
  },
  shadows: {
    outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
  },
});

export default theme;