// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

// Caminho do app
const projectRoot = __dirname;

// Caminho da pasta externa
const externalRoot = path.resolve(projectRoot, "../../shared");
const dbRoot = path.resolve(projectRoot, "../../packages/db");
// ajuste o caminho conforme sua estrutura!

const config = getDefaultConfig(projectRoot);

// adiciona a pasta externa
config.watchFolders = [dbRoot, externalRoot];

// garante que módulos sejam resolvidos do node_modules do app
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

module.exports = config;
