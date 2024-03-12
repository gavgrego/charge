'use strict';

/**
 * charge controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::charge.charge');
