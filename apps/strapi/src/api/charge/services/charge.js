'use strict';

/**
 * charge service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::charge.charge');
