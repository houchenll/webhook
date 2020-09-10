const http = require('http')
const shell = require('shelljs')
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/deploy', secret: 'houchenvue' })

const port = 9988
const projects = ['bole-vue']

const projectHandler = (event, action) => {
    const project = event.payload.repository.name // 仓库的名字
    console.log(project);
    const branch = event.payload.ref
    if (projects.includes(project)) {
        console.log(new Date(), `Received a ${action} event for ${project} to ${branch}`)
        shell.exec(`sh ./projects/${project}.sh`, (code, stdout, stderr) => {
            console.log(new Date(), 'Exit code:', code)
            console.log(new Date(), '执行完毕！错误信息：？', stderr)
        })

    }
}

http.createServer((req, res) => {
    handler(req, res, err => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(port, () => {
    console.log(new Date(), `Deploy server Run！port at ${port}`)
    shell.exec('echo shell test OK!', (code, stdout, stderr) => {
    })
})

handler.on('error', err => {
    console.error('Error:', err.message)
})

handler.on('push', event => { projectHandler(event, 'push') })
handler.on('commit_comment', event => { projectHandler(event, 'commit') })