modules.exports = {
    '/': function (env) {
        return 'http://' + env.REDISAPI_1_PORT_3000_TCP_ADDR + ':' + env.REDISAPI_1_PORT_3000_TCP_PORT;
    },
    '/api*': function (env) {
        return 'http://' + env.MONGOAPI_1_PORT_3000_TCP_ADDR + ':' + env.MONGOAPI_1_PORT_3000_TCP_PORT;
    }
};