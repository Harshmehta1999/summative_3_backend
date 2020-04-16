const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const myconn = require("./connection");

// every single collection will need a model

const Categories = require("./models/categories-model");
const Artworks = require("./models/artworks-model");
const Comments = require("./models/comments-model");


// init express, bodyparser now built in to express...
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// added to allow us to upload images to public folder
app.use(fileUpload());
app.use(express.static("public"));



var multer = require('multer')


// my functions
function updateAfterFileUpload(req, res, objFromDB, fileName) {
    // form data from frontend is stored in the request body , req.body
    var data = req.body;
    Object.assign(objFromDB, data);

    objFromDB.image = fileName;

    objFromDB.save().then(
        (response) => {
            res.json({
                result: true,
            });
        },
        (error) => {
            res.json({
                result: false,
            });
        }
    );
}
// end  my functions

// init database stuff
mongoose.connect(myconn.atlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", (e) => {
    console.log("+++ Mongoose connected ");
});

db.on("error", () => console.log("Database error"));
// end database stuff

// start of routes
const router = express.Router();
// add api to beginning of all 'router' routes
app.use("/api", router);

// ARTWORK STARTS// ARTWORK STARTS// ARTWORK STARTS// ARTWORK STARTS

router.get("/artworks", (req, res) => {
    Artworks.find()
        .populate("comments")
        .then((data) => {
            res.json(data);
        });
});

router.get("/artworks/:id", (req, res) => {
    Artworks.findOne({ _id: req.params.id })
        // .populate("useritems")
        .populate({ path: "comments", options: { sort: { updatedAt: -1 } } })
        .then((artworks) => {
            res.json([artworks]);
        });
});


router.delete("/artworks/:id", (req, res) => {
    Artworks.deleteOne({ _id: req.params.id }).then(
        () => {
            res.json({ result: true });
        },
        () => {
            res.json({ result: false });
        }
    );
});

router.put("/artworks/:id", (req, res) => {
    console.log(">>>> ", req.body);
    Artworks.findOne({ _id: req.params.id }, function(err, objFromDB) {
        if (err)
            return res.json({
                result: false,
            });

        if (req.files) {
            var files = Object.values(req.files);
            var uploadedFileObject = files[0];
            var uploadedFileName = uploadedFileObject.name;
            var nowTime = Date.now();
            var newFileName = `${nowTime}_${uploadedFileName}`;

            uploadedFileObject.mv(`public/${newFileName}`).then(
                (params) => {
                    updateAfterFileUpload(req, res, objFromDB, newFileName);
                },
                (params) => {
                    updateAfterFileUpload(req, res, objFromDB);
                }
            );
        } else {
            updateAfterFileUpload(req, res, objFromDB);
        }

    });
});

router.post("/artworks", (req, res) => {
    var collectionModel = new Artworks();

    console.log("++++ ", req.body);

    if (req.files) {
        var files = Object.values(req.files);
        var uploadedFileObject = files[0];
        var uploadedFileName = uploadedFileObject.name;
        var nowTime = Date.now();
        var newFileName = `${nowTime}_${uploadedFileName}`;

        uploadedFileObject.mv(`public/${newFileName}`).then(
            (params) => {
                updateAfterFileUpload(req, res, collectionModel, newFileName);
            },
            (params) => {
                updateAfterFileUpload(req, res, collectionModel);
            }
        );
    } else {
        updateAfterFileUpload(req, res, collectionModel);
    }
});


///GET INDIVIDUAL ARTWORKS

router.get(`/artworks/:id`, (req, res) => {
    console.log("looking for single artwork infossss");
    Artworks.findOne({ _id: req.params.id }, function(err, objFromDB) {
        res.json([objFromDB]);

    });
});

///GET INDIVIDUAL ARTWORKS


///FILTER THROUGH CATEGORIES
router.get("/artworks/category/:cat_id", (req, res) => {
    Artworks.find({ cat_id: req.params.cat_id }).then(
        (artworks) => {
            res.json(artworks);
        },
        (error) => {
            res.json({ result: 0 });
        }
    );
});

///FILTER THROUGH CATEGORIES


// ARTWORK ENDS// ARTWORK ENDS// ARTWORK ENDS// ARTWORK ENDS


// POST COMMENTS// POST COMMENTS// POST COMMENTS

router.post("/comments", (req, res) => {
    var newcomment = new Comments();

    var data = req.body;
    console.log(">>> ", data);
    Object.assign(newcomment, data);

    newcomment.save().then(
        (result) => {
            return res.json(result);
        },
        () => {
            return res.send("problem adding new comment");
        }
    );
});

// POST COMMENTS// POST COMMENTS// POST COMMENTS




// GET ROUTES FOR ALL// GET ROUTES FOR ALL// GET ROUTES FOR ALL

router.get("/uploads", (req, res) => {
    Artworks.find().then((uploads) => {
        res.json(uploads);
    });
});
// READ all categories
router.get("/categories", (req, res) => {
    Categories.find().then((categories) => {
        res.json(categories);
    });
});

// READ all artworks
router.get("/artworks", (req, res) => {
    Artworks.find().then((artworks) => {
        res.json(artworks);
    });
});

// READ all comments
router.get("/comments", (req, res) => {
    Comments.find().then((comments) => {
        res.json(comments);
    });
});


// GET ROUTES FOR ALL// GET ROUTES FOR ALL// GET ROUTES FOR ALL




// POST a comment - every new comment is tied to a book title
// book title is stored in a hidden input field inside our form
// router.post("/comments", (req, res) => {
//     var newComment = new Comments();

//     var data = req.body;
//     Object.assign(newComment, data);
//     console.log(">>> ", data);

//     newComment.save().then(
//         result => {
//             return res.json(result);
//         },
//         () => {
//             return res.send("problem adding new comment");
//         }
//     );
// });

//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
// THE rest of this is dealing with unhandled routes in a nice way //
router.get("/*", (req, res) => {
    res.json({ result: "invalid endpoint, please choose another" });
});

app.get("/*", (req, res) => {
    res.json({ result: "invalid endpoint, please choose another" });
});

// grab a port and start listening
const port = 9000;
app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}!`);
});