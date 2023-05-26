let natural;

if (typeof window === 'undefined') {
  natural = require('natural');
}

// nlu.js
export function getIntent(inputText) {
  try {
    const greetingPattern = /(hello|hi|hey|howdy|greetings)/i;
    const timePattern = /(get|view|what is|show|current|right now|today's|now)\s*(the\s*)?time/i;
    const datePattern = /(get|view|what is|show|current|today'?s)\s*(the\s*)?date/i;
    const viewRankingPattern = /(view|show|display)\s*(the\s*)?ranking/i;
    const viewProfilePattern = /(view|show|display)\s*(the\s*)?Account/i;
    const searchPattern = /(search|find|look)\s*(.*)/i;
    const findFamousGamePattern = /(show|list)\s*(the\s*)?(famous|popular|top)\s*(.*)\s*(game|games)/i;
    const helpPattern = /(help)/i;

    if (greetingPattern.test(inputText)) {
      return 'greeting';
    }

    if (timePattern.test(inputText)) {
      return 'getTime';
    }

    if (datePattern.test(inputText)) {
      return 'getDate';
    }

    if (viewRankingPattern.test(inputText)) {
      return 'viewRanking';
    }

    if (viewProfilePattern.test(inputText)) {
      return 'viewProfile';
    }

    if (searchPattern.test(inputText)) {
      return 'search';
    }

    if (helpPattern.test(inputText)) {
      return 'help';
    }

    // Add the new intent detection logic for findFamousGamePattern
    if (findFamousGamePattern.test(inputText)) {
      return 'findFamousGame';
    }

    // Add other intent detection logic here

    return 'unknown';
  } catch (error) {
    console.error('Error in getIntent:', error);
    return 'Invalid input';
  }
}