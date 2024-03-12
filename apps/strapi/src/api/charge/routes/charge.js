'use strict';

/**
 * charge router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::charge.charge');
