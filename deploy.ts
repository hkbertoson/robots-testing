#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

async function main() {
	// Parse command line arguments
	const argv = await yargs(hideBin(process.argv))
		.option('environment', {
			alias: 'e',
			describe: 'Environment to deploy (e.g., dev, prod)',
			type: 'string',
			default: 'dev',
		})
		.help()
		.alias('help', 'h').argv;

	// Environment to deploy
	const ENVIRONMENT: string = argv.environment;

	// Configuration file specifying robots.txt for different environments
	const ROBOTS_CONFIG: string = 'robots-config.json';

	// Read the robots.txt file for the specified environment from the configuration file
	const robotsConfig = JSON.parse(fs.readFileSync(ROBOTS_CONFIG, 'utf8'));
	const ROBOTS_FILE: string = robotsConfig[ENVIRONMENT];

	// Copy the specified robots.txt file to the root directory
	fs.copyFileSync(ROBOTS_FILE, 'robots.txt');

	console.log(`Deployed robots.txt for ${ENVIRONMENT} environment.`);
}

main().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
