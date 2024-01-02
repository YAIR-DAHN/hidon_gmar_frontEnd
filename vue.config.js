const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  HTTP_ALL_USERS: "http://localhost:3000/users/"
  
})
