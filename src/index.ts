import "dotenv/config"
import app from './app.js'

const PORT = process.env.PORT || 4000

const start = async() => {

    app.listen(PORT, () => {
        console.log(`server running on ${PORT}`)
    })
}

start().catch(err => {
    console.error(err)
    process.exit(1)
})
