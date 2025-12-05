<p align="center">
  <img src="/src/assets/icons/icon.png" width="128" height="128" alt="Echo AI Logo">
</p>

# Echo AI

> **Yerel Modellerle Güçlendirilmiş, Gizlilik Odaklı Kod Asistanınız.**  
> *Your Privacy-First, Local-Model Powered Coding Assistant.*

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=echo-ai.echo-ai">
    <img src="https://img.shields.io/badge/VS_Code_Marketplace-007ACC?style=flat&logo=visualstudiocode&logoColor=white" alt="VS Code Marketplace">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License">
  </a>
  <img src="https://img.shields.io/badge/Version-1.0.5-green.svg" alt="Version">
  <img src="https://img.shields.io/badge/Ollama-Ready-orange.svg" alt="Ollama Ready">
</p>

<p align="center">
  <em>Gelişmeler ve iletişim için: 👉 <a href="https://devlog.tr"><strong>devlog.tr</strong></a> 👈</em>
</p>

---

# 🇬🇧 English Description

## What is Echo AI?

**Echo AI** is a modern, privacy-focused coding assistant built on top of the open-source Roo Code project.  
It is completely reworked and optimized for **local LLMs (Ollama)** and lightweight models such as **4B, 7B, 8B**.

By reducing cloud dependency, Echo AI keeps all sensitive processing **on your own machine**, maximizing privacy and control.

## Features

- 🧠 **Local Intelligence:** Works seamlessly with DeepSeek, Llama 3, Qwen, Gemma and all Ollama-compatible models.  
- 🚀 **Code Generation:** Converts natural language instructions into fully working code.  
- 🔧 **Refactoring & Debugging:** Analyzes your code, identifies issues, and generates improvements.  
- 📂 **Context Awareness:** Automatically reads the required project files and sends only relevant data to the model.  
- 📝 **Documentation Generator:** Creates comments, explanations, and markdown docs automatically.  
- 🤖 **Autonomous Operations:** Can execute terminal commands, create files, update codebases and manage workflows.  

## Modes

- **Code Mode** – Daily development & editing  
- **Architect Mode** – Designing and structuring entire systems  
- **Ask Mode** – In-depth Q&A about your project  
- **Debug Mode** – Problem detection & solution proposals  
- **Orchestrator Mode** – Complex task management with sub-tasks  

---

## Installation

### 1. Clone Repository

```sh
git clone https://github.com/aydndglr/Echo-AI.git
cd Echo-AI
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Build & Run (F5)

Open the project in VS Code and press **F5**  
→ This launches the *Extension Development Host* window.

### 4. Create VSIX Package

```sh
pnpm run build
pnpm run vsix
```

To install the resulting `.vsix` file:

```sh
code --install-extension bin/echo-ai-1.0.3.vsix
```

---

## Disclaimer

Echo AI is an open-source project derived from Roo Code.  
It is provided **as-is**, without any warranty.  
Always verify generated code before using it in production.

---

## License

This project is licensed under the **Apache 2.0 License**.

---

**Happy Coding! / İyi Kodlamalar!** 🚀
