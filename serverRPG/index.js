import express from 'express'
import mongoose from 'mongoose'
import router from './routes/index.js'
import cors from 'cors'
import 'dotenv/config.js'
import http from 'http'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 5000

mongoose
	.connect(process.env.URL_DB)
	.then(() => console.log('Connected to DATABASE'))
	.catch((e) => console.log('Failed to connect to DATABASE \n', e))

const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(bodyParser.text())
app.use(bodyParser.json())
app.use('/api', router)

server.listen(PORT, (err) => {
	if (err) {
		return console.log(err)
	}

	console.log(`Server has started on port ${PORT}`)
})
