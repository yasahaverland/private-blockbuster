const crytpo = require('crypto-js')

// encryption is a two way process -- data is encrypted using an algorithm and a key
// you must know the key to decrpt the data

const mySecrets = 'i ate candy for brekfast'

const myEncryption = crytpo.AES.encrypt(mySecrets, 'myEncKey')
console.log(myEncryption.toString())

const myDecrypt = crytpo.AES.decrypt(myEncryption.toString(), 'hello')
console.log(myDecrypt.toString(crytpo.enc.Utf8)) // select character encoding

// hashing -- one way process
// 1. hash functions always return the same size hash regardless of the input
// 2. hash functions return the same value for the same input
// all passwords will be hashed in the database
const bcrypt = require('bcrypt')

const myPassword = '1234Password'

const hashedPassword = bcrypt.hashSync(myPassword, 12)
console.log(hashedPassword)

// we can only compare strings to a hash to see if they match
console.log(bcrypt.compareSync('Banana', hashedPassword))