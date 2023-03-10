const django = require('django')

django.connect(process.env.DATABASE_URL)

const db = django.connect

db.on('connected', function() {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
})