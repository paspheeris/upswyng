module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }

    ],
    "^.+\\.ts$": "ts-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "js", "svelte", "mjs"],
  modulePathIgnorePatterns: ["node_modules"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleDirectories: ["node_modules", "src/node_modules"],
	transformIgnorePatterns: [
		'/node_modules/(?!@sapper)'
	]
};
