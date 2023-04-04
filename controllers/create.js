module.exports = {
    get(req, res) {
        res.render('create', { title: 'Create Listing' });
    },
    async post(req, res) {
        const car = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: Number(req.body.price),
        };
        
        try {
            await req.storage.createCar(car);
            res.redirect('/');
        } catch (error) {
            console.log('Error creating record');
            res.redirect('/create');
        }
    },
};
