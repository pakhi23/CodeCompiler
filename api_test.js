// Simple API test for CodePlayground
import axios from 'axios';

const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  c: "10.2.0",
  cpp: "10.2.0",
};

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

async function testCodeExecution(language, code) {
  try {
    console.log(`\n🔍 Testing ${language.toUpperCase()} execution...`);
    
    const response = await API.post("/execute", {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: code,
        },
      ],
    });
    
    const result = response.data;
    const output = result.run?.output || result.run?.stderr || "No output";
    
    console.log(`✅ ${language.toUpperCase()} - Success`);
    console.log(`Output: ${output.substring(0, 100)}${output.length > 100 ? '...' : ''}`);
    
    return true;
  } catch (error) {
    console.log(`❌ ${language.toUpperCase()} - Error: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log("=== TESTING PISTON API INTEGRATION ===");
  
  const testCases = [
    { language: 'javascript', code: 'console.log("Hello from JavaScript!");' },
    { language: 'python', code: 'print("Hello from Python!")' },
    { language: 'java', code: 'public class Test { public static void main(String[] args) { System.out.println("Hello from Java!"); } }' },
    { language: 'c', code: '#include <stdio.h>\nint main() { printf("Hello from C!"); return 0; }' },
    { language: 'cpp', code: '#include <iostream>\nusing namespace std;\nint main() { cout << "Hello from C++!" << endl; return 0; }' },
  ];
  
  let passed = 0;
  let total = testCases.length;
  
  for (const testCase of testCases) {
    const success = await testCodeExecution(testCase.language, testCase.code);
    if (success) passed++;
  }
  
  console.log(`\n📊 API Tests Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log("✅ All API tests passed! Piston integration is working correctly.");
  } else {
    console.log("❌ Some API tests failed. Check the Piston API connectivity.");
  }
}

runTests().catch(console.error);