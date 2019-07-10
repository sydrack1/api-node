const env = process.env.NODE_ENV || 'dev'

const config = () => {
    switch (env) {
        case 'dev':
            return{
                database_url: 'mongodb+srv://admin:adminmaluco123@primeiraapi-4apoj.mongodb.net/test?retryWrites=true&w=majority',
                jwtPassword: 'Vocêpodeentrar',
                jwtExpiressIn: '7d'
            }
        case 'hml':
            return{
                database_url: 'mongodb+srv://admin:adminmaluco123@primeiraapi-4apoj.mongodb.net/test?retryWrites=true&w=majority'
            }
        case 'prod':
            return{
                database_url: 'mongodb+srv://admin:adminmaluco123@primeiraapi-4apoj.mongodb.net/test?retryWrites=true&w=majority'
            }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`)

module.exports = config()