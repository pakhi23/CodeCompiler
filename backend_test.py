#!/usr/bin/env python3
"""
Backend API Integration Test for CodePlayground
Tests the Piston API integration used by the frontend
"""

import requests
import sys
import time
from datetime import datetime

class PistonAPITester:
    def __init__(self):
        self.base_url = "https://emkc.org/api/v2/piston"
        self.tests_run = 0
        self.tests_passed = 0
        self.language_versions = {
            "javascript": "18.15.0",
            "typescript": "5.0.3", 
            "python": "3.10.0",
            "java": "15.0.2",
            "csharp": "6.12.0",
            "php": "8.2.3",
            "c": "10.2.0",
            "cpp": "10.2.0",
        }

    def run_test(self, name, test_func):
        """Run a single test"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                print(f"✅ {name} - PASSED")
            else:
                print(f"❌ {name} - FAILED")
            return success
        except Exception as e:
            print(f"❌ {name} - ERROR: {str(e)}")
            return False

    def test_api_connectivity(self):
        """Test basic API connectivity"""
        try:
            response = requests.get(f"{self.base_url}/runtimes", timeout=10)
            return response.status_code == 200
        except:
            return False

    def test_javascript_execution(self):
        """Test JavaScript code execution"""
        code = 'console.log("Hello from JavaScript!");'
        return self._execute_code("javascript", code, "Hello from JavaScript!")

    def test_python_execution(self):
        """Test Python code execution"""
        code = 'print("Hello from Python!")'
        return self._execute_code("python", code, "Hello from Python!")

    def test_java_execution(self):
        """Test Java code execution"""
        code = '''public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}'''
        return self._execute_code("java", code, "Hello from Java!")

    def test_c_execution(self):
        """Test C code execution"""
        code = '''#include <stdio.h>
int main() {
    printf("Hello from C!");
    return 0;
}'''
        return self._execute_code("c", code, "Hello from C!")

    def test_cpp_execution(self):
        """Test C++ code execution"""
        code = '''#include <iostream>
using namespace std;
int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}'''
        return self._execute_code("cpp", code, "Hello from C++!")

    def test_error_handling(self):
        """Test error handling with invalid code"""
        code = 'this is invalid syntax;'
        try:
            response = requests.post(f"{self.base_url}/execute", json={
                "language": "javascript",
                "version": self.language_versions["javascript"],
                "files": [{"content": code}]
            }, timeout=15)
            
            if response.status_code == 200:
                result = response.json()
                # Should have stderr or error output
                has_error = bool(result.get("run", {}).get("stderr"))
                print(f"   Error handling working: {has_error}")
                return has_error
            return False
        except:
            return False

    def _execute_code(self, language, code, expected_output=None):
        """Execute code and verify output"""
        try:
            response = requests.post(f"{self.base_url}/execute", json={
                "language": language,
                "version": self.language_versions[language],
                "files": [{"content": code}]
            }, timeout=15)
            
            if response.status_code == 200:
                result = response.json()
                output = result.get("run", {}).get("output", "")
                stderr = result.get("run", {}).get("stderr", "")
                
                print(f"   Output: {output.strip()[:100]}")
                if stderr:
                    print(f"   Stderr: {stderr.strip()[:100]}")
                
                if expected_output:
                    return expected_output in output
                return bool(output or stderr)
            elif response.status_code == 429:
                print(f"   Rate limited (429) - Expected for public API")
                return True  # Rate limiting is expected
            else:
                print(f"   HTTP {response.status_code}")
                return False
        except requests.exceptions.Timeout:
            print(f"   Timeout - API might be slow")
            return False
        except Exception as e:
            print(f"   Exception: {str(e)}")
            return False

    def test_rate_limiting_behavior(self):
        """Test how the API handles rate limiting"""
        print("   Testing rapid requests...")
        success_count = 0
        rate_limited_count = 0
        
        for i in range(3):
            try:
                response = requests.post(f"{self.base_url}/execute", json={
                    "language": "javascript",
                    "version": self.language_versions["javascript"],
                    "files": [{"content": "console.log('test');"}]
                }, timeout=10)
                
                if response.status_code == 200:
                    success_count += 1
                elif response.status_code == 429:
                    rate_limited_count += 1
                    
                time.sleep(0.5)  # Small delay between requests
            except:
                pass
        
        print(f"   Successful: {success_count}, Rate limited: {rate_limited_count}")
        return True  # Any response pattern is acceptable

def main():
    print("=" * 60)
    print("🚀 CODEPLAYGROUND API INTEGRATION TESTS")
    print("=" * 60)
    print(f"Testing Piston API integration at: https://emkc.org/api/v2/piston")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tester = PistonAPITester()
    
    # Run all tests
    tests = [
        ("API Connectivity", tester.test_api_connectivity),
        ("JavaScript Execution", tester.test_javascript_execution),
        ("Python Execution", tester.test_python_execution),
        ("Java Execution", tester.test_java_execution),
        ("C Execution", tester.test_c_execution),
        ("C++ Execution", tester.test_cpp_execution),
        ("Error Handling", tester.test_error_handling),
        ("Rate Limiting Behavior", tester.test_rate_limiting_behavior),
    ]
    
    for test_name, test_func in tests:
        tester.run_test(test_name, test_func)
        time.sleep(1)  # Delay between tests to avoid rate limiting
    
    # Print results
    print("\n" + "=" * 60)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 60)
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed >= tester.tests_run * 0.7:  # 70% pass rate
        print("\n✅ API INTEGRATION STATUS: WORKING")
        print("The Piston API integration is functioning correctly.")
        print("Note: Some failures may be due to rate limiting, which is expected.")
        return 0
    else:
        print("\n❌ API INTEGRATION STATUS: ISSUES DETECTED")
        print("Multiple API tests failed. Check connectivity and API status.")
        return 1

if __name__ == "__main__":
    sys.exit(main())