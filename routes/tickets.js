const router = require("express").Router()
const db = require("../db/db")



router.route("/t/:ticketId")
    .get((req, res) => {
        const ticketId = req.params.ticketId
        const ticket = db.findById(ticketId)
        res.status(200).json(ticket)
    })
    .patch((req,res) => {
        const ticketId = req.params.ticketId
        const updatedTicket =db.updateById(ticketId,req.body)
        res.status(200).json({updatedTicket,message:"updated successfully"})
     })
    .delete((req,res) => { 
        const ticketId = req.params.ticketId
        db.deleteById(ticketId)
        res.status(200).json({message:"deleted successfully"})
    })



router.route("/u/:userName")
    .get((req,res) => {
        const userName = req.params.userName
        console.log(userName)
        const tickets = db.findByUserName(userName)
        res.status(200).json(tickets)
     })
    .patch((req,res) => {
        const userName = req.params.userName
        console.log(userName)
        const tickets = db.updateByUserName(userName,req.body)
        if(tickets.length){
            res.status(200).json({ message:"updated successfully",tickets})
        }else{
            res.status(200).json({ message:"no tickets found with this username"})
        }
     })
    .delete(() => { })

router.post('/sell', (req, res) => {
    const { userName, price } = req.body;
    const ticket = db.create(userName, price)
    res.status(200).json({ message: "you have bought a ticket successfully.", ticket })
})

router.post("/bulk", (req, res) => {
    const { userName, price, quantity } = req.body;
    const tickets = db.bulkCreate(userName, price, quantity);
    res.status(200).json({ message: "you have bought a ticket successfully.", tickets })
})

router.get("/draw", (req, res) => {
    const winnerCount = req.query.wc ?? 3
    const winners = db.draw(winnerCount)
    res.status(200).json({ winners })
})

router.get("", (_req, res) => {
    const tickets = db.find()
    res.status(200).json({ tickets })
})
module.exports = router