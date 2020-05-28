const { Router } = require("express");
var { PythonShell } = require("python-shell");
const router = Router();

const Config = require("./config");
const environment = Config.environment;

var location;

//lat 149.1652299
//lon -35.363261
//heading 353

var lonFlight;
var latFlight;
var headingFlight;

class LocationDrone {
  constructor(heading, lat, lon, alt) {
    this.heading = heading;
    this.lon = lon;
    this.lat = lat;
    this.alt = alt;
  }
}

router.get("/directionOfFlight", (req, res) => {
  let options;

  if (environment == "drone") {
    options = {
      mode: "text",
      pythonPath: "/usr/bin/python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts"
    };
  } else if (environment == "win") {
    options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts"
    };
  } else {
    options = {
      mode: "text",
      pythonPath: "/usr/local/bin/python",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts"
    };
  }

  PythonShell.run("directionOfFlight.py", options, function (err, results) {
    //if (err) throw err;
    if (err) {
      res
        .status(400)
        .send({ message: "ERROR: Fallo el script directionOfFlight.py" });
      console.log(err);
    } else {
      location = new LocationDrone(
        results[0],
        results[1],
        results[2],
        results[3]
      );
        lonFlight = results[2];
        latFlight = results[1];
        headingFlight = results[0];

      res.status(200).send(location);
    }
  });
});

router.post("/rectangleMission/:distance/:w/:x/:L/:h/:i", (req, res) => {
  const distance = req.params.distance;
  const width = req.params.w;
  const spaceDistance = req.params.x;
  const spaceBtwLines = req.params.L;
  const height = req.params.h;
  const inversed = req.params.i

  let options;

  if (environment === "drone") {
    options = {
      mode: "text",
      pythonPath: "/usr/bin/python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        width,
        spaceDistance,
        spaceBtwLines,
        height,
        inversed,
        latFlight,
        lonFlight,
        headingFlight
        
      ]
    };
  } else if (environment === "win") {
    options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        width,
        spaceDistance,
        spaceBtwLines,
        height,
        inversed,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  } else {
    options = {
      mode: "text",
      pythonPath: "/usr/local/bin/python",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        width,
        spaceDistance,
        spaceBtwLines,
        height,
        inversed,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  }

  PythonShell.run("rectangleMission.py", options, function (err, results) {
    if (err) {
      res
        .status(400)
        .send({ message: "ERROR: Fallo el script rectangleMission.py" });
      console.log(err);
    } else {
      console.log(results);
      res.status(200).send({ message: "Misión cargada correctamente!" });
    }
  });
});


router.post("/straightMission/:distance/:h", (req, res) => {
  const distance = req.params.distance;
  const height = req.params.h;

  let options;

  if (environment === "drone") {
    options = {
      mode: "text",
      pythonPath: "/usr/bin/python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        height,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  } else if (environment === "win") {
    options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        height,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  } else {
    options = {
      mode: "text",
      pythonPath: "/usr/local/bin/python",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        height,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  }

  PythonShell.run("straightMission.py", options, function (err, results) {
    if (err) {
      res
        .status(400)
        .send({ message: "ERROR: Fallo el script straightMission.py" });
      console.log(err);
    } else {
      console.log(results);
      res.status(200).send({ message: "Misión cargada correctamente!" });
    }
  });
});

router.post("/ZigZagMission/:distance/:w/:L/:h/:i", (req, res) => {
  const distance = req.params.distance;
  const width = req.params.w;
  const spaceBtwPeaks = req.params.L;
  const height = req.params.h;
  const inversed = req.params.i;

  let options;

  if (environment === "drone") {
    options = {
      mode: "text",
      pythonPath: "/usr/bin/python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        width,
        spaceBtwPeaks,
        height,
        inversed,
        latFlight,
        lonFlight,
        headingFlight
        
      ]
    };
  } else if (environment === "win") {
    options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        width,
        spaceBtwPeaks,
        height,
        inversed,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  } else {
    options = {
      mode: "text",
      pythonPath: "/usr/local/bin/python",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        distance,
        width,,
        spaceBtwPeaks,
        height,
        inversed,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  }

  PythonShell.run("ZigZagMission.py", options, function (err, results) {
    if (err) {
      res
        .status(400)
        .send({ message: "ERROR: Fallo el script ZigZagMission.py" });
      console.log(err);
    } else {
      console.log(results);
      res.status(200).send({ message: "Misión cargada correctamente!" });
    }
  });
});

router.post("/periscopeMission/:h", (req, res) => {

  const height = req.params.h;

  let options;

  if (environment === "drone") {
    options = {
      mode: "text",
      pythonPath: "/usr/bin/python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        height,
        latFlight,
        lonFlight,
        headingFlight
        
      ]
    };
  } else if (environment === "win") {
    options = {
      mode: "text",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        height,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  } else {
    options = {
      mode: "text",
      pythonPath: "/usr/local/bin/python",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "./scripts",
      args: [
        height,
        latFlight,
        lonFlight,
        headingFlight
      ]
    };
  }

  PythonShell.run("periscopeMission.py", options, function (err, results) {
    if (err) {
      res
        .status(400)
        .send({ message: "ERROR: Fallo el script periscopeMission.py" });
      console.log(err);
    } else {
      console.log(results);
      res.status(200).send({ message: "Misión cargada correctamente!" });
    }
  });
});




module.exports = router;
