#!/usr/bin/env node

const colors = require('colors');
const resizer = require("../lib/resizer");

console.log(
  colors.rainbow(
    resizer.resize()
  )
);