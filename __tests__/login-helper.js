const superagent = require('superagent')
const agent = superagent.agent()
const account = {
    'username': 'Asuka',
    'password': 'pass'
}

exports.login = function(request, done) {
    request
        .post('/api/auth/login')
        .send(account)
        .end(function (err, res) {
            if(err) {
                throw (err)
            }
            agent.saveCookies(res)
            done(agent)
        })
}