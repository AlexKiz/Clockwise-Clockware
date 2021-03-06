const express = require('express')
const db = require('./db')
const PORT = process.env.PORT || 5000
const cityRouter = require('./routes/city.router')
const masterRouter = require('./routes/master.router')
const orderRouter = require('./routes/order.router')
const userRouter = require('./routes/user.router')
const login = require('./routes/auth.router')
const adminRouter = require('./routes/admin.router')
const cors = require('cors')
const app = express()

app.use(cors({exposedHeaders: 'Authorization',}),)
app.use(express.json())


app.use('/api', cityRouter)
app.use('/api', masterRouter)
app.use('/api', orderRouter)
app.use('/api', userRouter)
app.use('/api', adminRouter)
app.use('/api', login)


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT} `)
})

