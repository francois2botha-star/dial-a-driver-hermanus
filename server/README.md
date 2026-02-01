# Dial a Driver Hermanus - Backend API

Node.js/Express backend API for the Dial a Driver Hermanus booking platform.

**Status:** MVP Skeleton (Endpoints defined, database/authentication not yet implemented)

## Features

- ✅ RESTful API endpoints for bookings, drivers, pricing
- ✅ Form validation
- ✅ Pricing calculation logic
- ✅ Authentication skeleton (JWT ready)
- ✅ Error handling middleware
- ✅ CORS configured for frontend
- ✅ Rate limiting for API protection
- ⏳ Database integration (MongoDB - planned)
- ⏳ Payment processing (Stripe - planned)
- ⏳ Real-time updates (WebSocket - planned)

## Quick Start

### Installation

```bash
# Install dependencies
npm install express cors helmet express-rate-limit dotenv

# Install development dependencies
npm install --save-dev nodemon
```

### Configuration

```bash
# Copy example env file
cp server/.env.example server/.env

# Edit .env with your configuration
# - Database URL
# - JWT secret
# - API keys (Google Maps, Stripe, etc.)
```

### Running the Server

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Server will be available at http://localhost:3000
```

## API Endpoints

### Health Check
```bash
GET /api/health
# Response: { success: true, message: "Server is healthy" }
```

### Bookings

**Create Booking**
```bash
POST /api/bookings
Content-Type: application/json

{
  "pickup": {
    "location": "Hermanus Airport",
    "coordinates": [-34.4231, 19.2345]
  },
  "dropoff": {
    "location": "Marine Hotel",
    "coordinates": [-34.4189, 19.2312]
  },
  "date": "2026-02-15",
  "time": "14:00",
  "passengers": 2,
  "contact": {
    "name": "John Doe",
    "phone": "+27647997924",
    "email": "john@example.com"
  },
  "promoCode": "SAVE10"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "booking": {
    "id": "BK_1738345872456_abc123def",
    "confirmationCode": "DAD_20260215_AB12",
    "status": "pending",
    "pricing": {
      "baseFare": 150,
      "distance": 8.5,
      "distanceFare": 255,
      "timeFare": 60,
      "discount": 46.5,
      "total": 418.5,
      "currency": "ZAR"
    }
  }
}
```

**Get Booking**
```bash
GET /api/bookings/:id
# Response: { success: true, booking: {...} }
```

### Drivers

**List All Drivers**
```bash
GET /api/drivers
# Response: { success: true, drivers: [...], total: 4 }
```

**Get Driver Details**
```bash
GET /api/drivers/:id
# Response: { success: true, driver: {...} }
```

**Update Driver Status** (Admin only)
```bash
PUT /api/drivers/:id/status
Content-Type: application/json
Authorization: Bearer <jwt_token>

{ "status": "available" | "on_trip" | "offline" }
```

### Pricing

**Calculate Trip Price**
```bash
POST /api/pricing/calculate
Content-Type: application/json

{
  "pickup": { "location": "Hotel A" },
  "dropoff": { "location": "Airport" },
  "passengerType": "standard",
  "promoCode": "SAVE10"
}
```

**Response:**
```json
{
  "success": true,
  "pricing": {
    "distance": 8.5,
    "estimatedTime": 10,
    "baseFare": 150,
    "distanceFare": 255,
    "timeFare": 20,
    "subtotal": 425,
    "discount": 42.5,
    "total": 382.5,
    "currency": "ZAR"
  }
}
```

**Get Current Rates**
```bash
GET /api/pricing/rates
# Response: { success: true, rates: {...} }
```

### Authentication

**Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Register**
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+27647997924"
}
```

**Logout**
```bash
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

## Database Schema (Planned)

### Bookings Collection
```javascript
{
  _id: ObjectId,
  confirmationCode: String,
  status: String, // 'pending', 'confirmed', 'completed', 'cancelled'
  pickup: {
    location: String,
    coordinates: { type: 'Point', coordinates: [lng, lat] }
  },
  dropoff: {
    location: String,
    coordinates: { type: 'Point', coordinates: [lng, lat] }
  },
  date: Date,
  time: String,
  passengers: Number,
  contact: {
    name: String,
    phone: String,
    email: String
  },
  pricing: {
    baseFare: Number,
    distance: Number,
    distanceFare: Number,
    timeFare: Number,
    discount: Number,
    total: Number
  },
  driver: ObjectId, // Reference to Driver
  paymentStatus: String, // 'pending', 'completed', 'refunded'
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // bcrypt hashed
  phone: String,
  avatar: String,
  role: String, // 'user', 'driver', 'admin'
  bookings: [ObjectId], // Reference to Bookings
  ratings: {
    average: Number,
    count: Number,
    reviews: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Drivers Collection
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  licenseNumber: String,
  vehicle: {
    registration: String,
    type: String, // 'sedan', 'van', 'truck'
    capacity: Number,
    model: String,
    year: Number
  },
  status: String, // 'available', 'on_trip', 'offline'
  location: {
    type: 'Point',
    coordinates: [lng, lat]
  },
  ratings: {
    average: Number,
    trips: Number
  },
  specialties: [String],
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String
  },
  documents: {
    licenseExpiry: Date,
    insuranceExpiry: Date,
    backgroundCheck: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Development Roadmap

### Phase 1: Core API (Weeks 1-2)
- [ ] MongoDB connection and models
- [ ] User authentication (JWT)
- [ ] Booking CRUD operations
- [ ] Basic pricing calculation
- [ ] Error handling

### Phase 2: Enhancements (Weeks 3-4)
- [ ] Google Maps Distance Matrix API integration
- [ ] Email notifications (nodemailer)
- [ ] Admin dashboard endpoints
- [ ] Database indexing for performance
- [ ] Unit tests with Jest

### Phase 3: Payments & Real-time (Weeks 5-6)
- [ ] Stripe integration
- [ ] WebSocket for real-time tracking
- [ ] SMS notifications (Twilio)
- [ ] Payment webhook handling
- [ ] Loyalty program logic

### Phase 4: Production Ready (Weeks 7-8)
- [ ] Rate limiting refinement
- [ ] Security audit
- [ ] Load testing
- [ ] Docker containerization
- [ ] CI/CD with GitHub Actions

## Testing

```bash
# (To be implemented with Mocha/Chai or Jest)
npm test

# Test specific endpoint
npm test -- --grep "POST /api/bookings"

# Generate coverage report
npm run test:coverage
```

## Deployment

### Local Development
```bash
npm run dev
```

### Production (Heroku example)
```bash
# Install Heroku CLI
# Create new app
heroku create dial-a-driver-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_jwt_secret>

# Deploy
git push heroku main
```

### Docker (Planned)
```bash
# Build image
docker build -t dial-a-driver-api .

# Run container
docker run -p 3000:3000 dial-a-driver-api
```

## Security Considerations

- ✅ Helmet.js for security headers
- ✅ Rate limiting (100 req/15 min per IP)
- ✅ CORS configured
- ✅ Input validation
- ⏳ JWT token expiration
- ⏳ Password hashing (bcrypt)
- ⏳ SQL injection prevention
- ⏳ XSS protection
- ⏳ HTTPS enforcement

## Environment Variables

See `.env.example` for all available options.

Key variables:
- `NODE_ENV` - 'development' or 'production'
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `GOOGLE_MAPS_API_KEY` - For distance/directions API
- `STRIPE_SECRET_KEY` - For payment processing

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Database connection error:**
- Check MongoDB is running
- Verify MONGODB_URI in .env
- Ensure network access for MongoDB Atlas

**CORS errors:**
- Verify FRONTEND_URL in .env matches your frontend URL
- Check that frontend includes proper headers

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

© 2026 Dial a Driver Hermanus. All rights reserved.
