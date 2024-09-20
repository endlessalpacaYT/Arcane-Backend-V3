# Arcane Backend V3
- First Public Backend Written In Fastify!

# Recent Changes
## v0.18
- Changed how the token gets issued to prevent some random logout occurances
- Added more grant types
- Added some profile routes but dont work :(

## Requirements
- [nodes](https://nodejs.org/en)
- [mongodb](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/endlessalpacaYT/Arcane-Backend-V3/
```

2. **Install packages**

```bash
npm install
```

3. **Configure environment variables:**

Rename `.example.env` to `.env` and provide the necessary information.

5. **Run**

```bash
node index.js
```

## What's Next?

- Re-use some of v2 stuff like env
- make core parts of backend work

## Planned Features

- [x] Login
- [x] Easy setup
- [x] Database (MongoDB)
- [ ] Auto shop
- [ ] Battle Pass
- [ ] Challenges
- [ ] Friends
- [ ] XMPP
- [ ] Working MCP
- [ ] NewsV2
- [x] Discord Bot Integration
- [ ] Matchmaker 
- [ ] Party V1
- [ ] Party V2
- [ ] Daily rewards
- [ ] Gifting
- [ ] Purchasing from item shop
- [ ] HWID Bans
- [ ] Refunding
- [ ] Frontend
- [x] Universal
- [ ] API

## Maybe Features?

- [ ] IP Bans

## Planned Bot Commands

- [x] Register command
- [x] Pinged command
- [ ] User lookup command

## Contributing Guide:

### All Contributions Are Reviewed!
We welcome contributions but ask that you follow these guidelines:

1. **No Stolen Code ('Skidding')**: Ensure that all contributions are original. We do not accept code taken from other projects (e.g., LawinserverV2).
   
2. **Focus on Incremental Changes**: As this is also a learning project, I ask that you avoid making overly complex or significant changes that are beyond my current level of understanding. Smaller, meaningful changes are appreciated!

3. **Avoid Deleting Core Code**: Please refrain from removing large portions of the existing codebase. Certain sections may be integral to the backend’s functionality, and deleting them could break core features.

### Tips for Contributing:
- **Create a New Branch**: Always create a new branch for your contributions (e.g., `feature/[feature-name]`).
- **Submit Small Changes**: Small bug fixes, improvements in documentation, and new features are highly encouraged.
- **Respect the Learning Process**: Keep changes manageable and easy to review to help keep the project maintainable.

Thank you for contributing to the project!