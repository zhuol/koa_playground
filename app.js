const Koa = require('koa');
const Router = require('./router');
const router = new Router();
const app = new Koa();
const bodyParser = require('koa-bodyparser')

router.get('/', async ctx => { ctx.body = 'Hello Koa2!'; });
router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.get('/item', async ctx => { ctx.body = 'item page'; });
router.get('/createPost', async ctx => {
  console.log('Creating post..');
});

app.use(bodyParser())
app.use(router.routes())
app.use(async(ctx) => {
    if (ctx.url === '/test' && ctx.method === 'GET') {
        let html = `
        <h2>This is demo2</h2>
        <form method="POST" action="/">
            <p>username:</p>
            <input name="username">
            <p>age:</p>
            <input name="age">
            <p>website</p>
            <input name="website">
            <button type="submit">submit</button>
        </form>
        `
        ctx.body = html
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        let postData = ctx.request.body
        ctx.body = postData
    } else {
        ctx.body = '<h2>404</h2>'
    }
})

app.listen(3000, () => {
    console.log('app started at port 3000...')
})
