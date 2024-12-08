

# **Voice to Web3**

## **Introduction**

**Voice to Web3** is a mobile-first, voice-powered platform that allows users to interact with blockchain technologies using simple voice commands. It leverages the power of **Coinbase’s Developer Platform** (CDP) SDK, **AgentKit**, and the **Checkout Component** from **OnChainKit** to provide a seamless and secure blockchain experience.

With **Voice to Web3**, users can:
- Perform blockchain operations like transferring tokens, minting NFTs, and trading assets—all with their voice.
- Access the platform in multiple languages (e.g., Hindi, Kannada, Telugu) for a more inclusive experience.
- Enjoy gamified features and creative interactions with AI.

By simplifying blockchain operations and moving to a mobile-first approach, **Voice to Web3** ensures Web3 adoption is easier, faster, and more fun for everyone.

## **Reusable Replit Templetes**
https://replit.com/@RahulRao11/voice-to-web3?v=1#readme.md
https://replit.com/@RahulRao11/onchain-agent-demo-backend-1

## **Features**

- **Voice Commands for Blockchain Operations**  
  Execute complex blockchain transactions like transferring tokens, minting NFTs, swapping assets, and more, just by speaking simple prompts.
<img width="1434" alt="image" src="https://github.com/user-attachments/assets/dbe69ba3-ea7f-4e50-80e8-7730c164a57d">


- **Multiple Language Support**  
  Voice to Web3 supports languages like Hindi, Kannada, Telugu, and more, breaking down language barriers and expanding accessibility.

- **Mobile-Friendly Design**  
  Designed to work seamlessly on mobile devices, ensuring a smooth and user-friendly experience for users on the go.
  

https://github.com/user-attachments/assets/628b016e-0a08-4577-af3b-d22c7f1584b8



- **Seamless Onboarding**  
  - Users can log in with email and password.  
  - An **AI Agent** generates a wallet for the user.  
  - Private keys can be exported for backup.  
  - Wallet details are automatically loaded every time the user logs in.

- **Gamified Features**  
  - **Roll a dice**: Transfer tokens based on dice outcomes.  
  - **Trivia games**: Two players compete, and the loser transfers tokens to someone in their contact list.

- **NFT Creation and Minting**  
  - Create and mint NFTs from any data set, like transaction or chat history.  
  - Users can register base names and personalize their blockchain experience.

- **On-Chain Payments**  
  Integrated with **OnChainKit’s Checkout Component** to handle payments when users reach usage limits, allowing continued access via secure on-chain transactions.

## **How It Works**

### **1. Seamless Onboarding**
- **Sign Up**: Users log in with their email and password.
- **AI Wallet Generation**: Upon logging in, an **AI Agent** generates a secure wallet for the user.
- **Export Private Key**: Users can export their private key for backup and future use.
- **Persistent Wallet**: Every time the user logs in, their wallet details are automatically loaded, providing a consistent experience.

### **2. Mobile-Friendly and Easy to Use**
- **Voice-Activated**: No need for technical knowledge—users interact with the app using only voice commands.
- **Mobile Optimization**: Designed to work flawlessly on mobile devices, ensuring an optimal user experience on smartphones.

### **3. Massive Adoption**
- **Simplified Blockchain**: By making Web3 operations accessible and easy to use, Voice to Web3 aims for mass adoption, opening the world of blockchain to millions of users, even those with no prior experience.

### **4. Fun and Creative Interaction**
- **Gamified Features**: Users can engage in fun activities like rolling dice and playing trivia games, all while interacting with blockchain in a unique, enjoyable way.
- **Creative NFT Generation**: Generate NFTs from personal data sets such as transaction history, chat logs, and more.

## **Tech Stack**

- **Coinbase Developer Platform (CDP) SDK**  
  - **AgentKit** for blockchain transaction automation (transfer tokens, mint NFTs, swap assets).
  
- **OnChainKit**  
  - **Checkout Component** for managing on-chain payments when users exceed usage limits.

- **Voice-to-Text and Text-to-Voice**  
  - Powered by **OpenAI Whisper**, enabling seamless voice commands and voice output in multiple languages.

- **React**  
  - Frontend framework for building the mobile-friendly web app.

- **Node.js / Express**  
  - Backend for handling API calls, user authentication, and wallet generation.

## **Installation**

To run **Voice to Web3** locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/rahulvivaramneni/voice-to-web3.git
   ```

2. Navigate to the project directory:
   ```bash
   cd voice-to-web3
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file and add your credentials for Coinbase API and other integrations.

5. Start the development server:
   ```bash
   npm start
   ```

6. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```

## **How to Use**

1. **Log in** with your email and password.
2. **Interact** with the app using voice commands such as:
   - "Transfer 1 USDT to [address]."
   - "Swap 1 ETH for 1000 USDC."
   - "Mint an NFT from my chat history."
   - "Roll a dice."
3. **Access Features**: Use the mobile interface to easily access and interact with blockchain features.
4. **Enjoy Gamification**: Play games and engage in fun activities that involve transferring tokens or generating NFTs.

## Screenshots<img width="1434" alt="Screenshot 2024-12-08 at 7 01 49 AM" src="https://github.com/user-attachments/assets/d1f45cb3-5d01-4a49-b422-20e016e67fed">
<img width="1440" alt="Screenshot 2024-12-08 at 6 53 59 AM" src="https://github.com/user-attachments/assets/159c0e6d-b43e-47c8-b837-87a4d901db6d">
<img width="1440" alt="Screenshot 2024-12-08 at 6 50 44 AM" src="https://github.com/user-attachments/assets/21f98471-8abb-45f8-98f2-aeb018c68f34">
<img width="1440" alt="Screenshot 2024-12-08 at 6 49 33 AM" src="https://github.com/user-attachments/assets/15600a28-d5d6-431b-9d9c-956037961964">
<img width="1440" alt="Screenshot 2024-12-08 at 6 48 53 AM" src="https://github.com/user-attachments/assets/87f46a11-c2f5-46c3-9ce6-aed1a4375d3b">




## **Contribute**

We welcome contributions! Feel free to fork the repository, submit issues, and create pull requests to improve the app.

To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## **License**

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.



