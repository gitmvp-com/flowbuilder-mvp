import express from 'express';
import cors from 'cors';
import { workflowRouter } from './routes/workflow.js';

const app = express();
const PORT = process.env.PORT || 5678;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workflows', workflowRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FlowBuilder MVP is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 FlowBuilder MVP server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
