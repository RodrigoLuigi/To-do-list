require('express-async-errors')
require('dotenv/config')

const AppError = require('./utils/AppError')
const express = require('express')
const routes = require('./routes')
/* const { sequelize } = require('./database/models') */

/* sequelize.sync({ force: true }).then(() => {
	console.log('conectado com o banco de dados')
}) */

const app = express()
app.use(express.json())

app.use(routes)

app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message
		})
	}

	console.error(error)

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error.'
	})
})

const PORT = 3333
try {
	app.listen(PORT, () => console.log(`server is running on Port ${PORT} 🚀`))
} catch (error) {
	console.error('Erro ao iniciar o servidor:', error)
}
