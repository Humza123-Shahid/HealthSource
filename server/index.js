const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
// app.use('/api/auth',require('./Routes/common/auth'))
app.use('/api/role',require('./Routes/admin/role'))
// app.use('/api/assignment',require('./Routes/admin/assignment'))
// app.use('/api/permission',require('./Routes/admin/permission'))
// app.use('/api/event',require('./Routes/admin/event'))
app.use('/api/staff',require('./Routes/admin/staff'))
app.use('/api/patient',require('./Routes/admin/patient'))
app.use('/api/shift',require('./Routes/admin/shift'))

app.use('/api/user',require('./Routes/admin/user'))
app.use('/api/doctor',require('./Routes/admin/doctor'))

app.use('/api/appointment',require('./Routes/admin/appointment'))
app.use('/api/consultation',require('./Routes/admin/consultation'))
app.use('/api/surgery',require('./Routes/admin/surgery'))
app.use('/api/operationtheatre',require('./Routes/admin/operationtheatre'))
app.use('/api/surgeryteam',require('./Routes/admin/surgeryteam'))
app.use('/api/labtest',require('./Routes/admin/labtest'))
app.use('/api/labrequest',require('./Routes/admin/labrequest'))
// app.use('/api/inventory',require('./Routes/admin/inventory'))
// app.use('/api/menu',require('./Routes/admin/menu'))
// app.use('/api/package',require('./Routes/admin/package'))
// app.use('/api/venue',require('./Routes/admin/venue'))
// app.use('/api/booking',require('./Routes/admin/booking'))
// app.use('/api/payment',require('./Routes/admin/payment'))

// app.use('/api/buses',require('./Routes/admin/buses'))
// app.use('/api/destination',require('./Routes/admin/destination'))
// app.use('/api/driver',require('./Routes/admin/driver'))
// app.use('/api/routes',require('./Routes/admin/routes'))
// app.use('/api/services',require('./Routes/admin/services'))
// app.use('/api/faqs',require('./Routes/admin/faqs'))
// app.use('/api/bookings',require('./Routes/user/bookings'))
// app.use('/api/seats',require('./Routes/user/seats'))
// app.use('/api/expences',require('./Routes/admin/expences'))
// app.use('/api/expencecategory',require('./Routes/admin/expencecategory'))
// app.use('/api/contacts',require('./Routes/user/contacts'))

app.listen(port, () => {
  console.log(`healthSource backend listening at http://localhost:${port}`)
})