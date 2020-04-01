const express = require('express');
const uuid    = require('uuid');
const members = require('../../MEMBERS');

const router = express.Router();


// Get All Members
router.get('/', (req, res) => res.json(members));

// Get Singal member
router.get('/:id', (req, res) => {
    console.log(req.params)
    const found = members.some(member => member.id === Number(req.params.id));

    if( found )
        res.json(members.filter(member => member.id === Number(req.params.id)));
    else
        res.status(404).json({msg: `No member of ${req.params.id}`})
})

// Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    // check if one is missing
    if( !newMember.name || !newMember.email )
        res.status(400).json({msg: `No member of ${req.params.id}`});

    members.push(newMember);
    // res.json(members)
    res.redirect('/')
});

// Update member

router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === Number(req.params.id));

    if( found )
    {
        const updMember = req.body;

        members.forEach(member => {
            if( member.id === Number(req.params.id))
            {
                member.name = updMember.name || member.name;
                member.email = updMember.email || member.email;

                res.json({ msg: 'member updated', members: updMember})
            }
        });
    }
    else
        res.status(400).json(`No member with id of ${req.params.id}`)
});


// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === Number(req.params.id));

    if( found )
        res.json({
            msg: 'member deleted',
            members: members.filter(member => member.id !== Number(req.params.id))
        });
    else
        res.status(400).json({msg: `No user with id of ${req.params.id}`})
});

module.exports = router;