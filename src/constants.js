export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  c: "10.2.0",
  cpp: "10.2.0",
  html: "5.0.0",
  css: "3.0.0",
};

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`,
  
  typescript: `type Params = {
  name: string;
}

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "World" });`,
  
  python: `def greet(name):
    print("Hello, " + name + "!")

greet("World")`,
  
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  
  csharp: `using System;

namespace HelloWorld
{
    class Hello { 
        static void Main(string[] args) {
            Console.WriteLine("Hello World in C#");
        }
    }
}`,
  
  php: `<?php

$name = 'World';
echo "Hello " . $name . "!";`,

  c: `#include <stdio.h>

int main() {
    printf("Hello World from C!");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World from C++!" << endl;
    return 0;
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello World!</h1>
        <p>Welcome to the live preview!</p>
        <button onclick="changeColor()">Change Color</button>
    </div>
    
    <script>
        function changeColor() {
            document.body.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)';
        }
    </script>
</body>
</html>`,

  css: `/* Modern CSS Example */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    max-width: 500px;
    margin: 2rem auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    transform: translateY(0);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.title {
    color: #333;
    text-align: center;
    margin-bottom: 1rem;
}`,
};

export const WEB_LANGUAGES = ['html', 'css', 'javascript'];

export const DEVICE_PRESETS = {
  desktop: { width: '100%', height: '100%', name: 'Desktop' },
  tablet: { width: '768px', height: '1024px', name: 'Tablet' },
  mobile: { width: '375px', height: '667px', name: 'Mobile' },
  iphone: { width: '414px', height: '736px', name: 'iPhone' },
  ipad: { width: '820px', height: '1180px', name: 'iPad' },
};