/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Root browse list of maps show all public ones
  router.get("/", (req, res) => {
    // getMapList (same as below with less params)
    // console.log("Root ");

    // testing to see if pool/database connect setup works
    db.getMapList()
      .then(data =>{
        // console.log("data is ", data);
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // queries for map list (example favorites)
  router.get("/maps", (req, res) => {
    // console.log("Get maps list route");
    // res.send("Get maps list route");

    // ================================================ params format not checked yet
    db.getMapList(req.query)
      .then(data =>{
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // queries for single map details (include pins list)
  router.get("/map/info", (req, res) => {
    db.getMapById(req.query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    })
  });

  router.get("/map/details", (req, res) => {
    db.getMapDetails(req.query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
    })
  });

  // put create map entry
  router.put("/map", (req, res) => {
    const owner_id = req.session.userId;


    db.addMap({...req.body, owner_id})
      .then(data => {
        console.log("map added db response is ", data);
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // edit map entry details
  router.patch("/map", (req, res) => {
    console.log(req.body);

    db.updateMap(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.delete("/map", (req, res) => {
    console.log("what was sent to delete map", req.body);

    return db.removeMap(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // queries for pin details
  // by pin id
  // ================================================ params format not checked yet

  router.get("/map/pin", (req, res) => {
    db.getMapPins(req.query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/pin", (req, res) => {
    db.getPinDetails(req.query)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // create new pin
  // object with keys same as column names
  // ================================================ params format not checked yet

  router.put("/pin", (req, res) => {
    //addPin returns new created pin row
    db.addPin(req.body)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // edit pin details
  router.patch("/pin", (req, res) => {
    //updatePin
    db.editPinDetails(req.body)
        .then(data => {
          res.send(data.rows);
        })
        .catch(err => {
        });
  });


  // remove pin
  router.delete("/pin", (req, res) => {

    db.removePin(req.body)
        .then(data => {
          res.send(data.rows);
        })
        .catch(err => {
        });
  });

  // queries for collaborator list
  router.get("/collaborators", (req, res) => {
    db.getMapCollaborators(req.query)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send([]);
    });
  });

  // add collaborator to map
  router.put("/collaborators", (req, res) => {
    return db.addCollaborator(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // remove collaborator from map
  router.delete("/collaborators", (req, res) => {
    return db.removeCollaborator(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  /////fav routes ///////////////////////
  //add fav
  router.put("/fav", (req, res) => {
    return db.addFav(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //remove fav
  router.delete("/fav", (req, res) => {
    return db.removeFav(req.query)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  ///////////////////////////////////////


  return router;
};

