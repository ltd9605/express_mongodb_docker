const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/dbconnect'); // Import connect database function
const { Employees, Department } = require('./model/employee');    // Import model

// Set the view engine to ejs
app.set('view engine', 'ejs');
// Specify where your view templates are located
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for form-data (method POST)

app.get('/', async (req, res) => {
    try {
        const employeesData = await Employees.find()
            .populate({ path: 'departmentId', select: 'name -_id', strictPopulate: false });
        console.log(employeesData);
        res.render('index', { employees: employeesData });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.get('/add', async (req, res) => {
    try {
        // Lấy tất cả phòng ban từ DB để nạp vào dropdown
        const allDepartments = await Department.find({});

        // Render file add.ejs và truyền mảng 'departments' vào
        res.render('add', { departments: allDepartments });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.get('/update/:id', async (req, res) => {
    try {
        // Lấy tất cả phòng ban từ DB để nạp vào dropdown
        const allDepartments = await Department.find({});

        // Lấy thông tin nhân viên cần sửa
        const emp = await Employees.findById(req.params.id).populate('departmentId');
        // Render file edit.ejs và truyền dữ liệu vào
        res.render('edit', { departments: allDepartments, employ: emp });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/add-a-employee', async (req, res) => {
    const newEmployee = new Employees({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        departmentId: req.body.departmentId
    });
    await newEmployee.save();
    res.redirect('/');
});
app.get('/delete/:id', async (req, res) => {
    await Employees.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
app.post('/update/:id/completed', async (req, res) => {
    try {
        await Employees.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                departmentId: req.body.departmentId
            },
            { new: true }
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Update failed');
    }
});
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to DB', error);
        process.exit(1);
    }
}
startServer();