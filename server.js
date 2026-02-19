import express from 'express';
import mangoose from 'mongoose';
const app = express();
const port = 3000;
app.use(express.json());
mangoose
.connect('mongodb+srv://prathameshvshenoy_db_user:<db_password>@cluster0.gnmus1t.mongodb.net/?appName=Cluster0')
.then(() => console.log('Connected to MongoDB'))
.catch((err)=> console.error(err));
const carSchema = new mangoose.Schema({
    name: String,
    model: String,
    year: Number
});
const Car = mangoose.model('Car', carSchema);
app.get('/', (req, res) => {
    res.send("Hello cars");
})
app.get('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);  
        if (car) {
            res.json(car);
        } else {    
            res.status(404).json({message: `Car with id ${req.params.id} not found`});
        }   
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }       
})
app.post('/api/cars', async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})