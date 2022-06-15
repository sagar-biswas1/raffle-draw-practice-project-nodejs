const Ticket = require('../models/ticket');

class MyDB {
	constructor() {
		this.tickets = [];
	}
	/**
     * create and save a new Ticket
     * @param {string} username 
     * @param {number} price 
     * @returns {Ticket} return a tickets object
     */
	create(username, price) {
		const ticket = new Ticket(username, price);
		this.tickets.push(ticket);
		return ticket;
	}
	/**
     * create multiple tickets for single user
     * @param {string} username 
     * @param {number} price 
     * @param {number} quantity 
     * @returns {Array<Ticket>} return a tickets object
     */
	bulkCreate(username, price, quantity) {
		const results = [];
		for (let i = 0; i < quantity; i++) {
			const ticket = this.create(username, price);
			results.push(ticket);
		}
		return results;
	}
	/**
     * return all available tickets
     */
	find() {
		return this.tickets;
	}
	/**
     * 
     * @param {string} ticketId 
     * @returns {Ticket} ticket
     */
	findById(ticketId) {
		const ticket = this.tickets.find(
			/**
             * 
             * @param {Ticket} ticket 
             *
             */
			(ticket) => ticket.id == ticketId
		);
		return ticket;
	}

	/**
 * 
 * @param {string} userName 
 * @returns {Array<Ticket>} 
 */
	findByUserName(userName) {
		
		const tickets = this.tickets.filter(
			/**
             * 
             * @param {Ticket} ticket 
             *
             */
			(ticket) => ticket.userName == userName
		);
		return tickets;
	}

	/**
	 * 
	 * @param {string} userName 
	 * @param {{userName:string,price:number}} ticketBody 
	 * @returns {Array <Ticket>} tickets
	 */
	updateByUserName(userName,ticketBody) {
		const tickets = this.tickets.filter(
			/**
             * 
             * @param {Ticket} ticket 
             *
             */
			(ticket) => ticket.userName == userName
		);
		const updatedTickets=tickets.map(ticket =>{
			ticket.userName = ticketBody.userName || ticket.userName;
		ticket.price = ticketBody.price || ticket.price;
		ticket.updatedAt = new Date();
		return ticket;
		})

		return updatedTickets
	}
	/**
     * 
     * @param {string} ticketId 
     * @param {{userName:string,price:number}} ticketBody 
     * @returns {Ticket} ticket
     */
	updateById(ticketId, ticketBody) {
		const ticket = this.findById(ticketId);
		ticket.userName = ticketBody.userName || ticket.userName;
		ticket.price = ticketBody.price || ticket.price;
		ticket.updatedAt = new Date();
		return ticket;
	}
	/**
     * 
     * @param {string} ticketId 
     * @returns {Boolean} boolean value
     */
	deleteById(ticketId) {
		const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);
		if (index !== -1) {
			this.tickets.splice(index, 1);
			return true;
		} else {
			return false;
		}
	}

	/**
     * 
     * @param {number} winnerCount 
     * @returns {Array<Ticket>} winners
     */
	draw(winnerCount) {
		let indexes = [];
		for (let i = 0; i < winnerCount; i++) {
			
			let index = Math.floor(Math.random() * this.tickets.length);
		
            if(indexes.includes(index)){
				while(indexes.includes(index)){
					index = Math.floor(Math.random() * this.tickets.length);
					
				}
				indexes.push(index)
				
			}else{
				indexes.push(index)
			}
		}
		console.log("inside draw",indexes)
        const winners= indexes.map(i=>this.tickets[i])
        return winners
	}
}

const myDB = new MyDB();

module.exports = myDB;
