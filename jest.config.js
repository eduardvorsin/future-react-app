module.exports = {
	roots: [
		"<rootDir>/src"
	],

	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts"
	],

	setupFilesAfterEnv: [
		"<rootDir>setup-jest.js"
	],

	testEnvironment: "jsdom",

	moduleNameMapper: {
		"\\.svg": "<rootDir>/__mocks__/svg.js"
	},

	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	],

	watchPlugins: [
		"jest-watch-typeahead/filename",
		"jest-watch-typeahead/testname"
	],

	resetMocks: true
};
