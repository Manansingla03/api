const express = require("express");
const router = express.Router();
const members = require("../../membersx");
const uuid = require("uuid");
// members
router.get("/", (req, res) => {
  res.json(members);
});
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json(`member doesn't exists with id ${req.params.id} `);
  }
});
//update member

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "member was updated", member });
      }
    });
  } else {
    res.status(400).json(`member doesn't exists with id ${req.params.id} `);
  }
});
// create members
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };
  if (!newMember.name || !newMember.email) {
    res.status(400).json("please enter name and email");
  }
  members.push(newMember);
  res.json(members);
});
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: `member with id ${req.params.id} deleted`,
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json(`member doesn't exists with id ${req.params.id} `);
  }
});
module.exports = router;
