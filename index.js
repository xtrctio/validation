'use strict';

const cssWhat = require('css-what');
const UrlFilter = require('@xtrctio/url-filter');
const validator = require('validator');

const CONSTANTS = {
  PATTERNS: {
    URL_SAFE_STRING: /^[a-zA-Z0-9][a-zA-Z0-9_-]+$/g,
  },
  LENGTH: {
    STANDARD: 128,
    URL: 2083,
  },
};

CONSTANTS.UID = {
  MAX_LENGTH: 128,
  PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
};

const PROJECT = {
  ID: {
    MIN_LENGTH: 1,
    MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
  },
  NAME: {
    MIN_LENGTH: 5,
    MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
  },
  BILLING: {
    NAME: {
      MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    },
    SOURCE: {
      MIN_LENGTH: 5,
      MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
      PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
    },
  },
  MEMBER_UIDS: {
    MAX_ITEMS: 50,
  },
};

const USER = {
  DEFAULT_PROJECT: PROJECT.NAME,
};

const SCHEDULE = {
  ID: {
    MIN_LENGTH: 1,
    MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
  },
  NAME: {
    MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
  },
  CRAWL: {
    FILTERS: {
      MAX_ITEMS: 100,
      URL: {
        MAX_LENGTH: CONSTANTS.LENGTH.URL,
        validate: (pattern) => UrlFilter.validate(pattern),
      },
      HTML: {
        MAX_LENGTH: CONSTANTS.LENGTH.URL,
        validate: (selector) => {
          selector = selector.startsWith('!') ? selector.slice(1, selector.length - 1) : selector;

          try {
            cssWhat(selector);
          } catch (err) {
            return err.message;
          }

          return undefined;
        },
      },
      MAX_DEPTH: {
        MINIMUM: 0,
      },
      MAX_PAGES: {
        MINIMUM: 1,
      },
    },
  },
  URLS: {
    MAX_ITEMS: 100,
    validate: (url) => validator.isURL(url, { allow_underscores: true }),
  },
};

const SEARCH = {
  ID: {
    MIN_LENGTH: 1,
    MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    PATTERN: CONSTANTS.PATTERNS.URL_SAFE_STRING,
  },
  FILTERS: {
    URL: {
      MAX_LENGTH: CONSTANTS.LENGTH.URL,
    },
    HOSTNAME: {
      MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    },
    PATHNAME: {
      MAX_LENGTH: CONSTANTS.LENGTH.URL,
    },
    DOMAIN: {
      MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    },
    TLD: {
      MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    },
    SUBDOMAIN: {
      MAX_LENGTH: CONSTANTS.LENGTH.STANDARD,
    },
  },
};

const TOKENS = {
  MAX_ITEMS: 10,
};

/* eslint global-require: "off" */
module.exports = {
  validator,
  UrlFilter,
  cssWhat,
  CONSTANTS,
  PROJECT,
  USER,
  SCHEDULE,
  SEARCH,
  TOKENS,
};
