import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
app.use(express.json())

// CORS
const origins = (process.env.CORS_ORIGINS || '').split(',').map(s=>s.trim()).filter(Boolean)
app.use(cors({ origin: function(origin, cb){
  if(!origin) return cb(null, true)
  if(origins.includes(origin)) return cb(null, true)
  return cb(null, false)
}, credentials: false }))

// Mongo (optional for local). If no URI, use in-memory stores for dev.
const MONGO_URI = process.env.MONGO_URI
let useMemoryStore = false

console.log('MongoDB Connection String:', 
  MONGO_URI ? 
  MONGO_URI.replace(/:([^:]*?)@/, ':***@') : 'Not provided')

if(!MONGO_URI) {
  useMemoryStore = true
  console.warn('MONGO_URI missing – using in-memory store (dev only)')
} else {
  try {
    console.log('Attempting to connect to MongoDB...')
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('✅ Successfully connected to MongoDB')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message)
    console.error('Full error details:', err)
    console.log('⚠️  Continuing with in-memory store (data will be lost on restart)')
    useMemoryStore = true
  }
}

// In-memory stores
const mem = {
  bookings: [],
  contacts: [],
  packages: []
}

// Models (only used if Mongo is configured)
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  package: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})
const Booking = mongoose.model('Booking', bookingSchema)

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})
const Contact = mongoose.model('Contact', contactSchema)

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  features: [String],
  active: { type: Boolean, default: true },
  sort: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})
const Package = mongoose.model('Package', packageSchema)

// Data access helpers that work for memory or Mongo
async function saveBookingDoc(payload){
  if(useMemoryStore){
    const doc = { _id: String(mem.bookings.length+1), ...payload, createdAt: new Date() }
    mem.bookings.push(doc)
    return doc
  }
  return await Booking.create(payload)
}

async function listBookingsDocs(){
  if(useMemoryStore){
    return [...mem.bookings].sort((a,b)=> b.createdAt - a.createdAt).slice(0,500)
  }
  return await Booking.find().sort({ createdAt: -1 }).limit(500)
}

async function saveContactDoc(payload){
  if(useMemoryStore){
    const doc = { _id: String(mem.contacts.length+1), ...payload, createdAt: new Date() }
    mem.contacts.push(doc)
    return doc
  }
  return await Contact.create(payload)
}

async function listPackagesDocs(){
  if(useMemoryStore){
    if(mem.packages.length===0 && process.env.PACKAGES_JSON){
      try{ mem.packages = JSON.parse(process.env.PACKAGES_JSON) }catch{}
    }
    return mem.packages.filter(p=> p.active !== false).sort((a,b)=> (a.sort||0)-(b.sort||0) || (a.price||0)-(b.price||0))
  }
  // Optional seed from env PACKAGES_JSON once if empty
  const count = await Package.countDocuments()
  if(count === 0 && process.env.PACKAGES_JSON){
    const seed = JSON.parse(process.env.PACKAGES_JSON)
    if(Array.isArray(seed) && seed.length){
      await Package.insertMany(seed)
    }
  }
  return await Package.find({ active: true }).sort({ sort: 1, price: 1 })
}

// Packages: public list (for pricing page)
app.get('/api/packages', async (req,res)=>{
  try{
    const docs = await listPackagesDocs()
    res.json(docs)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
})

// Admin auth middleware
function adminAuth(req, res, next){
  const pass = req.headers['x-admin-password']
  if(pass && pass === process.env.ADMIN_PASSWORD) return next()
  return res.status(401).json({ error: 'Unauthorized' })
}

// Nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
})

// Routes
app.get('/api/health', (req,res)=> res.json({ ok:true }))

app.post('/api/bookings', async (req,res)=>{
  try{
    const { name, email, phone, date, package: pkg, message } = req.body
    const doc = await saveBookingDoc({ name, email, phone, date, package: pkg, message })
    res.json({ success: true, id: doc._id })
  }catch(err){
    res.status(400).json({ error: err.message })
  }
})

app.get('/api/bookings', adminAuth, async (req,res)=>{
  const docs = await listBookingsDocs()
  res.json(docs)
})

app.post('/api/contact', async (req,res)=>{
  try{
    const { name, email, phone, message } = req.body
    const doc = await saveContactDoc({ name, email, phone, message })
    if(process.env.ADMIN_EMAIL && process.env.SMTP_HOST){
      await transporter.sendMail({
        to: process.env.ADMIN_EMAIL,
        from: process.env.SMTP_USER || 'no-reply@events.bookkaroindia.com',
        subject: 'New contact message',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
      })
    }
    res.json({ success: true, id: doc._id })
  }catch(err){
    res.status(400).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
  console.log('Events backend running on', PORT)
})
