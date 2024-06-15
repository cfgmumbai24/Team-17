const express = require('express');
const router = express.Router();

const stops = {
    "total": 3,
    "data": [
        { "lat": 19.0431558311773, "lng": 72.8703492169323, "id": "stop1" },
        { "lat": 19.068813, "lng": 72.877740, "id": "stop2" },
    ]
};

router.get('/v1/stops', (req, res) => {
    res.json(stops);
});

module.exports = router;
