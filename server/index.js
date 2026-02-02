const connectToMongo = require('./db');
const express = require('express')
const path = require('path');
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/staffuploads', express.static(path.join(__dirname, 'staffuploads')));
app.use('/doctoruploads', express.static(path.join(__dirname, 'doctoruploads')));
app.use('/labresultuploads', express.static(path.join(__dirname, 'labresultuploads')));

//Available Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(express.json({ limit: '50mb' }));

// // Increase the limit for URL-encoded data to 10MB
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/auth',require('./Routes/common/auth'))
app.use('/api/role',require('./Routes/admin/role'))
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
app.use('/api/labresult',require('./Routes/admin/labresult'))
app.use('/api/patientmedicalhistory',require('./Routes/admin/patientmedicalhistory'))
app.use('/api/medicine',require('./Routes/admin/medicine'))
app.use('/api/prescription',require('./Routes/admin/prescription'))
app.use('/api/ward',require('./Routes/admin/ward'))
app.use('/api/room',require('./Routes/admin/room'))
app.use('/api/bed',require('./Routes/admin/bed'))
app.use('/api/nurse',require('./Routes/admin/nurse'))
app.use('/api/staffattendance',require('./Routes/admin/staffattendance'))
app.use('/api/admission',require('./Routes/admin/admission'))
app.use('/api/staffduty',require('./Routes/admin/staffduty'))
app.use('/api/social',require('./Routes/admin/social'))



app.listen(port, () => {
  console.log(`healthSource backend listening at http://localhost:${port}`)
})